module Types
  class MutationType < Types::BaseObject
    field :addTeacherToKlass, mutation: Mutations::AddTeacherToKlass do
      description "Adds a teacher to a yoga klass in the system"
    end

    field :create_student, Types::StudentType, mutation: Mutations::CreateStudent do
      description "Create a student in the system"
    end

    field :create_klass, Types::KlassType, mutation: Mutations::CreateKlass do
      description "Creates a new yoga class for given studio."
    end

    field :edit_klass, Types::KlassType, null: false, mutation: Mutations::EditKlass do
      description "Edit an existing yoga class. Requires ID and new attributes."
    end

    field :delete_klass, Boolean, null: false, description: "Delete a class." do
      argument :id, String, required: true
    end

    def delete_klass(id:)
      Klass.where(id: id).destroy_all
      true
    end

    field :login, String, null: true, description: "Login a user" do
      argument :email, String, required: true
      argument :password, String, required: true
    end
    def login(email:, password:)
      if user = User.where(email: email).first&.authenticate(password)
        user.sessions.create.key
      end
    end

    field :logout, Boolean, null: false
    def logout
      Session.where(id: context[:session_id]).destroy_all
      true
    end

    field :check_in_student, Boolean, null: false do
      argument :student_id, ID, required: false
      argument :klass_id, ID, required: true
    end
    def check_in_student(student_id:, klass_id:)
      if student_id
        Klass.find(klass_id).klass_roster.each do |roster|
          if roster.student_id == student_id.to_i
            roster.update_attribute :checked_in, true
            return true
          end
        end
      else
        require 'pry'; binding.pry
        # setup for creating new student from this mutation
      end
    end

  end
end
