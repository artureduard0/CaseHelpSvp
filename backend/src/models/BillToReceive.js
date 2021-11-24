const Sequelize = require('sequelize');
const conn = require('../../config/database');

const BillToPay = conn.define('bills_to_receive', {
    identification: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A identificação não pode estar em branco.'
            },
            len: {
                args: [1, 255],
                msg: 'A identificação deve ter entre 1 e 255 caracteres.'
            }
        }
    },
    due_date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A data de vencimento não pode estar em branco.'
            },
            isDate: {
                msg: 'A data de pagamento informada é inválida.'
            }
        }
    },
    paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    payday: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isDate: {
                msg: 'A data do recebimento informada é inválida.'
            }
        }
    },
    amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        validate: {
            isNumeric: {
                msg: 'O valor pago precisa ser numérico.'
            }
        }
    }
});

BillToPay.sync({ alter: true });

module.exports = BillToPay;