class DropStudiosTeachers < ActiveRecord::Migration[5.2]
  def change
    drop_join_table :studios, :teachers
  end
end
