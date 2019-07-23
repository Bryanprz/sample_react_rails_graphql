# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_23_185153) do

  create_table "klass_rosters", force: :cascade do |t|
    t.integer "student_id"
    t.integer "klass_id"
    t.boolean "checked_in"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["klass_id"], name: "index_klass_rosters_on_klass_id"
    t.index ["student_id"], name: "index_klass_rosters_on_student_id"
  end

  create_table "klasses", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer "studio_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["studio_id"], name: "index_klasses_on_studio_id"
  end

  create_table "klasses_teachers", id: false, force: :cascade do |t|
    t.integer "klass_id", null: false
    t.integer "teacher_id", null: false
    t.index ["klass_id", "teacher_id"], name: "index_klasses_teachers_on_klass_id_and_teacher_id"
    t.index ["teacher_id", "klass_id"], name: "index_klasses_teachers_on_teacher_id_and_klass_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "student_id"
    t.integer "studio_id"
    t.datetime "start_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["student_id"], name: "index_memberships_on_student_id"
    t.index ["studio_id"], name: "index_memberships_on_studio_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.integer "user_id"
    t.string "key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "students", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "studios", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teachers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teaching_contracts", force: :cascade do |t|
    t.integer "teacher_id"
    t.integer "studio_id"
    t.datetime "start_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["studio_id"], name: "index_teaching_contracts_on_studio_id"
    t.index ["teacher_id"], name: "index_teaching_contracts_on_teacher_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.boolean "is_admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
