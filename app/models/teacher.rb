class Teacher < ApplicationRecord
  has_many :teaching_contracts
  has_many :studios, through: :teaching_contracts
  has_and_belongs_to_many :klasses
end
