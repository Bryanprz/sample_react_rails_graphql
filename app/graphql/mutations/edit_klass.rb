class Mutations::EditKlass < GraphQL::Schema::Mutation
  null true

  argument :klass, Types::KlassInputType, required: true
  argument :teachers, [Types::TeacherInputType], required: false
  argument :students, [Types::StudentInputType], required: false

  def resolve(klass:, teachers:, students:)
    klass_id = klass.to_h.blank? ? nil : klass.to_h[:id]
    existing_klass = Klass.where(id: klass_id).first

    teacher_models = teachers.map(&:to_h).map { |t| make_model_from_params(t, 'Teacher') }
    student_models = students.map(&:to_h).map { |s| make_model_from_params(s, 'Student') }

    existing_klass.teachers << teacher_models
    existing_klass.students << student_models

    existing_klass&.update klass.to_h

    existing_klass
  end

  private

  def make_model_from_params(params, type)
    case type
    when "Student"
      if params.to_h.has_key?(:id) and !params.to_h[:id].blank?
        student = Student.find(params.to_h[:id])
      else
        student = Student.create(params.to_h)
      end
      student
    when "Teacher"
      if params.to_h.has_key?(:id) and !params.to_h[:id].blank?
        teacher = Teacher.find(params.to_h[:id])
      else
        teacher = Teacher.create(params.to_h)
      end
      teacher
    end
  end
end
