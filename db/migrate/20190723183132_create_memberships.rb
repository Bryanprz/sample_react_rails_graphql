class CreateMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :memberships do |t|
      t.belongs_to :student, foreign_key: true
      t.belongs_to :studio, foreign_key: true
      t.datetime :start_date

      t.timestamps
    end
  end
end
