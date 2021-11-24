const Setting = require('../models/Setting');
const CryptoJS = require("crypto-js");
const { ErrorHandler } = require('../helpers/ErrorHandler');

module.exports = {
    async editarSmtp(req, res, next) {
        try {
            const user = req.body.user;
            const password = req.body.password;
            const port = req.body.port != null ? parseInt(req.body.port) : null;
            const host = req.body.host;

            if (user && password && port && host) {
                const settings = await Setting.findOne();
                const updated = await Setting.update({
                    smtp_host: host,
                    smtp_port: port,
                    smtp_user: user,
                    smtp_password: CryptoJS.AES.encrypt(password, process.env.JWT_SECRET).toString()
                }, {
                    where: {
                        id: settings.id
                    }
                });

                if (updated[0] > 0) {
                    return res.status(200).json({
                        msg: ['Configurações SMTP atualizadas!']
                    });
                } else {
                    throw new ErrorHandler(500, ['Não foi possível atualizar as configurações SMTP!']);
                }
            } else {
                throw new ErrorHandler(400, ['Informe todos os campos!']);
            }
        } catch (error) {
            return next(error);
        }
    }
}