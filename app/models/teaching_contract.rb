class TeachingContract < ApplicationRecord
  belongs_to :teacher
  belongs_to :studio
end
