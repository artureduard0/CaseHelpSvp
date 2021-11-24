const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const { ErrorHandler } = require('../helpers/ErrorHandler');
const MailSender = require('../helpers/MailSender');

module.exports = {
    async cadastrar(req, res, next) {
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpf: req.body.cpf ? (typeof req.body.cpf === 'string' ? (req.body.cpf).replace(/\D/g, '') : req.body.cpf) : null,
                cellphone: parseInt(req.body.cellphone)
            });

            return res.status(200).json({
                msg: ['Usuário criado!']
            });
        } catch (error) {
            return next(new ErrorHandler(error.statusCode ?? 400, error));
        }
    },
    async entrar(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            if (email != null && email.length > 0 && password != null && password.length > 0) {
                const user = await User.findOne({
                    where: {
                        email: email
                    }
                });

                if (user) {
                    if (!user.disabled) {
                        const isEqual = await bcrypt.compare(password, user.password);

                        if (isEqual) {
                            const token = jwt.sign({
                                id: user.id
                            }, process.env.JWT_SECRET, {
                                expiresIn: '1h'
                            });

                            return res.status(200).json({
                                token,
                                nome: user.name,
                                msg: ['Autenticado com sucesso.']
                            });
                        } else {
                            throw new ErrorHandler(401, ['Credenciais incorretas.']);
                        }
                    } else {
                        throw new ErrorHandler(401, ['Usuário desativado.']);
                    }
                } else {
                    throw new ErrorHandler(401, ['Credenciais incorretas.']);
                }
            } else {
                throw new ErrorHandler(400, ['Informe o e-mail e a senha.']);
            }
        } catch (error) {
            return next(error);
        }
    },
    async recuperar(req, res, next) {
        try {
            const email = req.body.email;
            const cpf = req.body.cpf ? (typeof req.body.cpf === 'string' ? (req.body.cpf).replace(/\D/g, '') : req.body.cpf) : null;

            if (email && email.length > 0 && cpf && cpf.toString().length > 0) {
                const randomPassword = generator.generate({
                    length: 12,
                    numbers: true,
                    symbols: false
                });

                const updated = await User.update({
                    password: randomPassword,
                }, {
                    where: {
                        email: email,
                        cpf: cpf
                    }
                });

                if (updated[0] > 0) {
                    const html = `
                        <style>
                            body {
                                margin: 0 !important;
                            }
                        </style>
        
                        <div style="width: 100%; height: 90px; background-color: #980056e5;">
                            <div style="padding: 30px; font-size: 30px; color: #FFF; font-family: Arial, Helvetica, sans-serif;">
                                Lar São Vicente de Paula: Recuperação de Senha
                            </div>
                        </div>
                        <div style="width: 100%; height: 90px; background-color: #d4d4d4;">
                            <div style="padding: 30px; font-size: 14px; font-family: Arial, Helvetica, sans-serif;">
                                Recebemos uma solicitação de recuperação de senha para sua conta. Sua nova senha é:
                                <b>${randomPassword}</b>.<br>
                                Você já pode usar a mesma em nosso site! Qualquer dúvida, entre em contato.
                            </div>
                        </div>
                    `;

                    const user = await User.findOne({
                        attributes: ['email'],
                        where: {
                            email: email,
                            cpf: cpf
                        }
                    });

                    const sended = await MailSender.send(user.email, 'Lar São Vicente de Paula: Recuperação de Senha', html);

                    if (sended) {
                        return res.status(200).json({
                            msg: ['E-mail enviado.']
                        });
                    } else {
                        throw new ErrorHandler(500, ['Erro ao enviar o e-mail.']);
                    }
                } else {
                    throw new ErrorHandler(500, ['Ocorreu um erro interno.']);
                }
            } else {
                throw new ErrorHandler(400, ['Não encontramos esta conta.']);
            }
        } catch (error) {
            return next(error);
        }
    },
    async listar(req, res, next) {
        try {
            const usuarios = await User.findAll({
                attributes: ['id', 'name', 'email', 'cpf', 'cellphone', 'admin', 'disabled'],
                order: [
                    ['name', 'ASC']
                ],
                where: {
                    disabled: false
                }
            });

            if (usuarios) {
                return res.status(200).json({
                    data: usuarios,
                    msg: ['Sucesso ao listar.']
                });
            } else {
                throw new ErrorHandler(500, ['Um erro fatal aconteceu.']);
            }
        } catch (error) {
            return next(error);
        }
    },
    async alterarPermissao(req, res, next) {
        try {
            const updated = await User.update({
                admin: req.body.admin
            }, {
                where: {
                    id: req.params.id
                }
            });

            if (updated[0] > 0) {
                return res.status(200).json({
                    msg: ['Sucesso ao atualizar as permissões do usuário.']
                });
            } else {
                throw new ErrorHandler(500, ['Não foi possível atualizar as permissões do usuário.']);
            }
        } catch (error) {
            return next(error);
        }
    },
    async desativar(req, res, next) {
        try {
            const updated = await User.update({
                disabled: true
            }, {
                where: {
                    id: req.params.id
                }
            });

            if (updated[0] > 0) {
                return res.status(200).json({
                    msg: ['Sucesso ao desativar o usuário.']
                });
            } else {
                throw new ErrorHandler(400, ['Não foi possível desativar o usuário.']);
            }
        } catch (error) {
            return next(error);
        }
    }
}