const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization !== undefined && authorization !== null) {
        const token = authorization.replace('Bearer ', '');

        jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
            if (!err) {
                const user = await User.findOne({
                    raw: true,
                    where: {
                        id: decoded.id,
                        admin: true
                    }
                });

                if (user) {
                    next();
                } else {
                    res.status(401).json({
                        msg: ['Não autorizado.']
                    });
                }
            } else {
                res.status(401).json({
                    msg: ['Não autorizado.']
                });
            }
        });
    } else {
        res.status(401).json({
            msg: ['Não autorizado.']
        });
    }
};