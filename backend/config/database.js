const { Sequelize } = require('sequelize');

const host = process.env.DB_HOST != null ? process.env.DB_HOST : 'localhost';
const database = process.env.DB_NAME != null ? process.env.DB_NAME : 'casehelpsvp';
const user = process.env.DB_USER != null ? process.env.DB_USER : 'root';
const password = process.env.DB_PASSWORD != null ? process.env.DB_PASSWORD : 'root';
const port = process.env.DB_PORT != null ? process.env.DB_PORT : 3306;

const conn = new Sequelize(
    database,
    user,
    password,
    {
        host: host,
        port: port,
        dialect: 'mysql',
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        },
        logging: false, // desabilita o log dos comandos no console
        query: {
            raw: true
        }
    }
);

module.exports = conn;