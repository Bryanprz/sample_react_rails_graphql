class Studio < ApplicationRecord
  has_many :klasses
  has_many :teaching_contracts
  has_many :teachers, -> { distinct }, through: :teaching_contracts
  has_many :memberships
  has_many :students, -> { distinct }, through: :memberships
end
