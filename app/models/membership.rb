class Membership < ApplicationRecord
  belongs_to :student
  belongs_to :studio
end
