# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#BEGIN YOGINI DATA
#
# Create a Studio to start
studio = Studio.create(
  name: "Wildflowers Yoga",
  description: "Yoga studio in Gainesville, FL"
)

# Add teachers to studio through a teaching contract
teacher_brandi = Teacher.create(name: "Brandi")
TeachingContract.create(teacher: teacher_brandi, studio: studio, start_date: DateTime.now)

teacher_amy = Teacher.create(name: "Amy")
TeachingContract.create(teacher: teacher_amy, studio: studio, start_date: DateTime.now)

teacher_bryan = Teacher.create(name: "Bryan")
TeachingContract.create(teacher: teacher_bryan, studio: studio, start_date: DateTime.now)


# Create Yoga Classes (spelled with K to avoid name clashes in Ruby)
yoga_klass = Klass.create(
  name: "Hatha Yoga",
  description: "Slow flow class that will help you get to learn basic asanas in yoga.",
  studio: studio,
  start_time: DateTime.now,
  end_time: DateTime.now + 1.hour
)
yoga_klass.teachers << teacher_brandi

yoga_klass2 = Klass.create(
  name: "Vinyasa Yoga",
  description: "Flow with your breath in this intense Vinyasa class.",
  studio: studio,
  start_time: DateTime.now,
  end_time: DateTime.now + 1.hour
)
yoga_klass2.teachers << [teacher_brandi, teacher_bryan]

yoga_klass3 = Klass.create(
  name: "Kundalini Yoga",
  description: "Train your breath to be fully awake and increase your body's vitalizing energy.",
  studio: studio,
  start_time: DateTime.now,
  end_time: DateTime.now + 1.hour
)
yoga_klass3.teachers << [teacher_amy, teacher_bryan]

yoga_klass4 = Klass.create(
  name: "Yin Yoga",
  description: "Restore and recover your muscles by diving deep into this restorative yin yoga class.",
  studio: studio,
  start_time: DateTime.now,
  end_time: DateTime.now + 1.hour
)
yoga_klass4.teachers << teacher_amy

yoga_klass5 = Klass.create(
  name: "Ganja Yoga",
  description: "Toke and move",
  studio: studio,
  start_time: DateTime.now,
  end_time: DateTime.now + 1.hour
)
yoga_klass5.teachers << [teacher_amy, teacher_bryan]

# Create Students and add them to Studio through memberships
student_amy = Student.create(name: "Amy", email: "bryanprz00@gmail.com", phone_number: "9546877137")
Membership.create(student: student_amy, studio: studio, start_date: DateTime.now)

student_joy = Student.create(name: "Joy", email: "bryanprz00@gmail.com", phone_number: "9546877137")
Membership.create(student: student_joy, studio: studio, start_date: DateTime.now)

student_bobby = Student.create(name: "Bobby", email: "bryanprz00@gmail.com", phone_number: "9546877137")
Membership.create(student: student_bobby, studio: studio, start_date: DateTime.now)

student_billy = Student.create(name: "Bill", email: "bryanprz00@gmail.com", phone_number: "9546877137")
Membership.create(student: student_billy, studio: studio, start_date: DateTime.now)

student_jeremiah = Student.create(name: "Jeremiah", email: "bryanprz00@gmail.com", phone_number: "9546877137")
Membership.create(student: student_jeremiah, studio: studio, start_date: DateTime.now)

student_jorge = Student.create(name: "Jorge", email: "bryanprz00@gmail.com", phone_number: "9546877137")
Membership.create(student: student_jorge, studio: studio, start_date: DateTime.now)

student_rebbeca = Student.create(name: "Rebbeca", email: "bryanprz00@gmail.com", phone_number: "9546877137")
Membership.create(student: student_rebbeca, studio: studio, start_date: DateTime.now)

student_andres = Student.create(name: "Andres", email: "bryanprz00@gmail.com", phone_number: "9546877137")
Membership.create(student: student_andres, studio: studio, start_date: DateTime.now)


# Add students to klasses
KlassRoster.create(
  student: student_amy,
  klass: yoga_klass,
  checked_in: false
)

KlassRoster.create(
  student: student_amy,
  klass: yoga_klass2,
  checked_in: false
)

KlassRoster.create(
  student: student_joy,
  klass: yoga_klass2,
  checked_in: false
)

KlassRoster.create(
  student: student_joy,
  klass: yoga_klass3,
  checked_in: false
)

KlassRoster.create(
  student: student_bobby,
  klass: yoga_klass2,
  checked_in: false
)

KlassRoster.create(
  student: student_bobby,
  klass: yoga_klass4,
  checked_in: false
)

KlassRoster.create(
  student: student_billy,
  klass: yoga_klass3,
  checked_in: false
)

KlassRoster.create(
  student: student_billy,
  klass: yoga_klass4,
  checked_in: false
)

KlassRoster.create(
  student: student_billy,
  klass: yoga_klass5,
  checked_in: false
)

KlassRoster.create(
  student: student_jeremiah,
  klass: yoga_klass5,
  checked_in: false
)

KlassRoster.create(
  student: student_jeremiah,
  klass: yoga_klass4,
  checked_in: false
)

KlassRoster.create(
  student: student_jeremiah,
  klass: yoga_klass,
  checked_in: false
)

KlassRoster.create(
  student: student_jorge,
  klass: yoga_klass,
  checked_in: false
)

KlassRoster.create(
  student: student_jorge,
  klass: yoga_klass3,
  checked_in: false
)
