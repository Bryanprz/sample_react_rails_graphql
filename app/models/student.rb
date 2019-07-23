class Student < ApplicationRecord
  has_many :klass_roster
  has_many :klasses, through: :klass_roster
  has_many :memberships
  has_many :studios, through: :memberships
end
