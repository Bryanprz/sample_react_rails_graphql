class Mutations::EditKlass < GraphQL::Schema::Mutation
  null true

  argument :klass, Types::KlassInputType, required: true
  argument :teachers, [Types::TeacherInputType], required: false
  argument :students, [Types::StudentInputType], required: false

  def resolve(klass:, teachers:, students:)
    klass_id = klass.to_h.blank? ? nil : klass.to_h[:id]
    @existing_klass = Klass.where(id: klass_id).first

    @teacher_models = teachers.map(&:to_h).map { |t| make_model_from_params(t, 'Teacher') }
    @student_ids = students.map(&:id).map(&:to_i)

    update_teachers
    update_students

    @existing_klass&.update klass.to_h
    @existing_klass
  end

  private

  def update_students
    add_students_to_klass
    remove_students_from_klass
  end

  def update_teachers
    @existing_klass.teachers.each { |teacher| remove_teacher_from_klass(teacher) if teacher_should_be_removed?(teacher) }
    add_teachers_to_klass
  end

  def teacher_should_be_removed?(teacher)
    !@teacher_models.include?(teacher)
  end

  def add_teachers_to_klass
    @existing_klass.teachers << @teacher_models
  end

  def remove_teacher_from_klass(teacher)
    @existing_klass.teachers.delete(teacher)
  end

  def add_students_to_klass
    @student_ids.each do |student_id|
      next if student_registered_to_klass?(student_id: student_id, klass: @existing_klass)
      KlassRoster.create(klass: @existing_klass, student_id: student_id, checked_in: false)
    end
  end

  def remove_students_from_klass
    @existing_klass.klass_roster.each do |roster|
      roster.destroy unless @student_ids.include? roster.student_id
    end
  end

  def student_registered_to_klass?(student_id:, klass:)
    klass.klass_roster.map(&:student_id).include? student_id
  end

  def make_model_from_params(params, type)
    case type
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
