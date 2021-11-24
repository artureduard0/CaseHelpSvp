const Setting = require('../models/Setting');
const mailer = require('nodemailer');
const CryptoJS = require('crypto-js');

module.exports = {
    async send(to, subject, html) {
        try {
            const settings = await Setting.findOne();

            if (settings.smtp_password) {
                const password = CryptoJS.AES.decrypt(settings.smtp_password, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8);

                const transporter = mailer.createTransport({
                    host: settings.smtp_host,
                    port: settings.smtp_port,
                    secure: false,
                    tls: {
                        ciphers: 'SSLv3'
                    },
                    auth: {
                        user: settings.smtp_user,
                        pass: password
                    }
                });

                const info = await transporter.sendMail({
                    from: `"Lar São Vicente de Paula" <${settings.smtp_user}>`,
                    to: to,
                    subject: subject,
                    html: html
                });

                return info.accepted.length > 0 ? true : false;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }
}
