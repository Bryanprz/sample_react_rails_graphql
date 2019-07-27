class TeachingContract < ApplicationRecord
  belongs_to :teacher
  belongs_to :studio
  validates :start_date, presence: true
end
