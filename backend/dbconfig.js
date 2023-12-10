// config.js

const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: 'password',
  database: 'nbad_final',
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const User = require('./models/User')(sequelize, DataTypes);
const Budget = require('./models/Budget')(sequelize, DataTypes);
const Expense = require('./models/Expense')(sequelize, DataTypes);
console.log(Budget)

sequelize.sync()
.then(() => {
  console.log('Tables created successfully.');
})
.catch((error) => {
  console.error('Error creating tables:', error);
});

// Function to generate a JWT token
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' }); // Set token expiration time (e.g., 1 hour)
  
  const tokenObj = {
    token,
    expiresAt: new Date(new Date().getTime() + 2 * 60 * 1000),
    email: user.email,
  }

  return tokenObj;
};


module.exports = { sequelize, User, Budget, Expense, generateToken};