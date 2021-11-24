const { Sequelize } = require('sequelize');
const conn = require('../../config/database');

const Setting = conn.define('settings', {
    smtp_host: {
        type: Sequelize.STRING,
        allowNull: true
    },
    smtp_port: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    smtp_user: {
        type: Sequelize.STRING,
        allowNull: true
    },
    smtp_password: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

Setting.sync({ alter: true });

// se não houver a linha das configurações criadas, criar.
Setting.findOne().then((setting) => {
    if (!setting) {
        Setting.create();
    }
});

module.exports = Setting;