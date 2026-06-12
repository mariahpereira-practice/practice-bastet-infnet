require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbName = (process.env.DB_NAME || 'infdb').trim();
const dbUser = (process.env.DB_USER || 'root').trim();
const dbPassword = process.env.DB_PASSWORD;

if (dbPassword === undefined || dbPassword === '') {
    throw new Error('DB_PASSWORD is empty in backend/.env. Set a valid password before starting the API.');
}

const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        dialect: process.env.DB_DIALECT || 'mariadb',
        define: {
            freezeTableName: true,
        },
    }
);

try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
} catch (error) {
    console.error('Unexpected database initialization error:', error);
}

module.exports = sequelize;