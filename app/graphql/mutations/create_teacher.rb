class Mutations::CreateTeacher < GraphQL::Schema::Mutation
  null true

  argument :name, String, required: true
  argument :studio_id, ID, required: true

  def resolve(name:, studio_id:)
    studio = Studio.find(studio_id)
    teacher = Teacher.create(name: name)
    TeachingContract.create(teacher: teacher, studio: studio, start_date: DateTime.now)
    teacher
  end
end

