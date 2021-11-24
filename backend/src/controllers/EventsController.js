const Event = require('../models/Event');
const { ErrorHandler } = require('../helpers/ErrorHandler');
const { dateFromString } = require('../helpers/Formatter');
const User = require('../models/User');
const MailSender = require('../helpers/MailSender');

module.exports = {
    async listar(req, res, next) {
        try {
            const events = await Event.findAll({
                attributes: ['id', 'name', 'date', 'local'],
                order: [
                    ['name', 'ASC']
                ]
            });

            if (events) {
                return res.status(200).json({
                    data: events,
                    msg: ['Sucesso ao listar.']
                });
            } else {
                throw new ErrorHandler(500, ['Um erro fatal aconteceu.']);
            }
        } catch (error) {
            return next(error);
        }
    },
    async criar(req, res, next) {
        try {
            await Event.create({
                name: req.body.name,
                date: req.body.date && req.body.date.length > 0 ? dateFromString(req.body.date) : null,
                local: req.body.local
            });

            return res.status(200).json({
                msg: ['Evento criado!']
            });
        } catch (error) {
            return next(error);
        }
    },
    async editar(req, res, next) {
        try {
            const updated = await Event.update({
                name: req.body.name,
                date: req.body.date && req.body.date.length > 0 ? dateFromString(req.body.date) : null,
                local: req.body.local
            }, {
                where: {
                    id: req.params.id
                }
            });

            if (updated[0] > 0) {
                return res.status(200).json({
                    msg: ['Evento atualizado!']
                });
            } else {
                throw new ErrorHandler(500, ['Não foi possível atualizar o evento.']);
            }
        } catch (error) {
            return next(error);
        }
    },
    async deletar(req, res, next) {
        try {
            const destroyed = await Event.destroy({
                where: {
                    id: req.params.id
                }
            });

            if (destroyed > 0) {
                return res.json(200).json({
                    msg: ['Evento deletado.']
                });
            } else {
                throw new ErrorHandler(500, ['Não foi possível deletar o evento.']);
            }
        } catch (error) {
            console.log(error)
            return next(error);
        }
    },
    async notificar(req, res, next) {
        try {
            const event = await Event.findByPk(req.params.id);

            if (event) {
                const users = await User.findAll({
                    attributes: ['email'],
                    where: {
                        disabled: false
                    }
                });

                const emails = users.map((user) => {
                    return user.email;
                });

                const html = `
                <style>
                    body {
                        margin: 0 !important;
                    }
                </style>

                <div style="width: 100%; height: 90px; background-color: #980056e5;">
                    <div style="padding: 30px; font-size: 30px; color: #FFF; font-family: Arial, Helvetica, sans-serif;">
                        Lar São Vicente de Paula: Evento ${event.name}
                    </div>
                </div>
                <div style="width: 100%; height: 90px; background-color: #d4d4d4;">
                    <div style="padding: 30px; font-size: 14px; font-family: Arial, Helvetica, sans-serif;">
                        O evento ${event.name} ocorrerá na data ${new Date(event.date).toLocaleString('pt-br')} no seguinte local: ${event.local}.<br>
                        Esperamos você lá! Qualquer dúvida, por favor, entre em contato.
                    </div>
                </div>
                `;

                if (MailSender.send(emails, `Lar São Vicente de Paula: Evento ${event.name}`, html)) {
                    return res.status(200).json({
                        msg: 'E-mails enviados.'
                    });
                } else {
                    throw new ErrorHandler(500, ['Não foi possível enviar os e-mails.']);
                }
            } else {
                throw new ErrorHandler(500, ['Não foi possível localizar o evento.']);
            }
        } catch (error) {
            return next(error);
        }
    }
};