module Types
  class StudioType < GraphQL::Schema::Object
    field :id, ID, null: true
    field :name, String, null: true
    field :description, String, null: true
    field :klasses, [KlassType], null: true
    field :teachers, [TeacherType], null: true
    field :teaching_contracts, [TeachingContractType], null: true
    field :students, [StudentType], null: true
  end
end

