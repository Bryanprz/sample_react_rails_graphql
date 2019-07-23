class CreateTeachingContracts < ActiveRecord::Migration[5.2]
  def change
    create_table :teaching_contracts do |t|
      t.belongs_to :teacher, foreign_key: true
      t.belongs_to :studio, foreign_key: true
      t.datetime :start_date

      t.timestamps
    end
  end
end
