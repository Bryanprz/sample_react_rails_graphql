class Klass < ApplicationRecord
  belongs_to :studio
  has_and_belongs_to_many :teachers, -> { distinct }
  has_many :klass_roster
  has_many :students, -> { distinct }, through: :klass_roster
end
