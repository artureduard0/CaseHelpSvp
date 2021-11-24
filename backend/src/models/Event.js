const Sequelize = require('sequelize');
const conn = require('../../config/database');

const Event = conn.define('events', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O nome do evento não pode estar em branco'
            },
            len: {
                args: [1, 255],
                msg: 'O nome deve ter entre 1 e 255 caracteres'
            }
        }
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A data do evento não pode estar em branco'
            }
        }
    },
    local: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O local do evento não pode ficar em branco'
            }
        }
    }
});

Event.sync({ alter: true });

module.exports = Event;