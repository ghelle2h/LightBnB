const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require("pg")

const pool = new Pool({
  user: 'hamzaghelle',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const sqlQuery = `
  SELECT * 
  FROM users
  WHERE email = $1
  ;
  `
  console.log('Inside Get User with Email')
return pool.query(sqlQuery,[email.toLowerCase()])
            .then(res => console.log(res.rows[0]))
            .catch(err => console.log(err));

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`SELECT * FROM users WHERE id = $1;`, [id])
              .then(res => res.rows)
              .catch(err => console.log(err));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const sqlQuery = `
    INSERT INTO 
      users(name, email, password)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `
  return pool.query(sqlQuery, [user.name, user.email, user.password])
  .then(res => res.rows[0])
  .catch(err => console.log(err.stack));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const sqlQuery = `
  SELECT properties.*, reservations.*, avg(rating) FROM properties
  INNER JOIN property_reviews AS reviews
  ON reviews.property_id = properties.id
  INNER JOIN reservations 
  ON res.property_id = reviews.property_id
  INNER JOIN users
  ON reviews.guest_id = users.id
  WHERE reservations.guest_id = $1
  AND end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY start_date
  LIMIT = $2
  ;`
  return pool.query(sqlQuery, [guest_id, limit])
              .then(res => res.rows[0]);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = (options, limit = 10) => {
  const queryParmas = [];

  //2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  FULL OUTER JOIN property_reviews ON properties.id = property_reviews.property_id
  `;

  //3
  if (options.city) {
    queryParmas.push(`%${options.city}%`);
    queryString += `WHERE city ILIKE $${queryParmas.length}`;
  }

  if (options.owner_id) {
    queryParmas.push(options.owner_id);
    queryString += `AND owner_id = $${queryParmas.length}`;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParmas.push(parseInt(options.minimum_price_per_night));
    queryString += `AND cost_per_night >= $${queryParmas.length}`;
    queryParmas.push(parseInt(options.maximum_price_per_night));
    queryString += `AND cost_per_night <= $${queryParmas.length}`;
  }

  //4
  queryString += `GROUP BY properties.id `;
  if (options.minimum_rating) {
    queryParmas.push(parseInt(options.minimum_rating));
    queryString += `HAVING avg(rating) >= $${queryParmas.length}`;
  }
  queryParmas.push(limit);
  queryString +=  `ORDER BY cost_per_night
  LIMIT $${queryParmas.length};
`;
  return db.pool.query(queryString, queryParmas)
    .then(res => res.rows)
    .catch(err => err.stack);

};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool.query(
    `INSERT INTO properties (
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms
    )
    VALUES (
      '${property.owner_id}', '${property.title}', '${property.description}', '${property.thumbnail_photo_url}', '${property.cover_photo_url}', '${property.cost_per_night}', '${property.street}', '${property.city}', '${property.province}', '${property.post_code}', '${property.country}', '${property.parking_spaces}', '${property.number_of_bathrooms}', '${property.number_of_bedrooms}')
    RETURNING *;
    `)
    .then(res => {
      return res.rows
    })
}
exports.addProperty = addProperty;
