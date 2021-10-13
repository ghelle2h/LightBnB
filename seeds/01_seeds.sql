INSERT INTO  users (name, email, password)
VALUES ('Danny', 'Dannyboy@phantom.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Cam payton', 'deserveseToGetPaid@nba.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ben Simmons', 'comebackYear@nba.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, street, province, postal_code, active)
VALUES (1, 'Cozy Cove', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg ', 200, 2, 3, 4, 'Canada', 'Brampton', 'Dixie', 'Ontario', 'LX2 5V1'),
(2, "Batman's Lair", 'description', 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg', 400, 5, 6, 6, 'Canada', 'Toronto', 'Forest Hill Drive', 'Ontario', 'M2T 5C6'),
(3, 'Wowzzers', 'description', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg', 500, 4, 5, 4, 'Wakanda City', 'The Orb', 'Black Panther Street', 'Wakanda', 'YYY YYY');


INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 2, 7, 'message')
(2, 1, 1, 6, 'message')
(3, 3, 3, 9, 'message');