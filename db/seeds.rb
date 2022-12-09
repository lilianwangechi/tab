# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker';



(1..100).each do |id|
User.create!(
    full_name: Faker::Name.name,
    email: Faker::Internet.email,
    password: "Password123@!",
    password_confirmation: "Password123@!",
)

end
puts "Done Seeding Users!"


(1..50).each do |id|
Tab.create!(
    name: Faker::Marketing.unique.buzzwords,
)

end

puts "Done Seeding Tabs!"

(1..50).each do |id|
    Usertab.create!(
        user_id: Faker::Number.within(range: 1..100),
        tab_id: Faker::Number.within(range: 1..50),
    )

end

puts "Done Seeding Usertabs!"

(1..500).each do |id|
    Item.create!(
        name: Faker::Commerce.product_name,
        price: Faker::Commerce.price(range: 0..10000.00, as_string: true),
        user_id: Faker::Number.within(range: 1..100),
        tab_id: Faker::Number.within(range: 1..50),
        
    )

end

puts "Done Seeding Items!"