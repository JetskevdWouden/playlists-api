const Sequelize = require('sequelize');
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:homework@localhost:5432/postgres';

const sequelize = new Sequelize(databaseUrl);

sequelize
    .sync()
    .then(() => console.log('Databse schema updated'))
    .catch(console.error)

module.exports = sequelize;