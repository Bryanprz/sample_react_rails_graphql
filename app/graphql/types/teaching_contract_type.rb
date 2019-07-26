module Types
  class TeachingContractType < GraphQL::Schema::Object
    field :id, ID, null: false
    field :studio, StudioType, null: false
    field :teacher, TeacherType, null: true
    field :start_date, DateTimeType, null: false
  end
end

