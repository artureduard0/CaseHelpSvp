const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const conn = require('../../config/database');

const User = conn.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O nome não pode estar em branco.'
            },
            len: {
                args: [1, 255],
                msg: 'O nome deve ter entre 1 e 255 caracteres.'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Este e-mail já está sendo utilizado.'
        },
        validate: {
            notNull: {
                msg: 'O e-mail não pode estar em branco.'
            },
            isEmail: {
                msg: 'O e-mail deve ser válido.'
            },
            len: {
                args: [1, 255],
                msg: 'O e-mail não deve ultrapassar 255 caracteres.'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A senha não pode estar em branco.'
            },
            len: {
                args: [1, 100],
                msg: 'A senha deve ter entre 1 e 100 caracteres.'
            }
        }
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Este CPF já está sendo utilizado.'
        },
        validate: {
            notNull: {
                msg: 'O CPF não pode estar em branco.'
            },
            len: {
                args: [11, 11],
                msg: 'O CPF deve conter 11 números.'
            }
        }
    },
    cellphone: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O número de celular não pode estar em branco.'
            },
            len: {
                args: [11, 11],
                msg: 'O número de celular deve conter 11 números: DDD XXXXXXXXX.'
            }
        }
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    disabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
});

User.sync({ alter: true });

User.beforeSave(async (user, options) => {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
});

module.exports = User;