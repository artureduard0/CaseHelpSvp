class ErrorHandler extends Error {
    constructor(statusCode = 500, message = ['Um erro fatal aconteceu.']) {
        super();
        this.statusCode = statusCode;
        this.message = message.errors ? message.errors.map((error) => {
            return error.message;
        }) : message;
    }
}

const handleError = (err, res) => {
    const { message, statusCode } = err;
    res.status(statusCode ?? 500).json({
        msg: message ?? 'Ocorreu um erro interno.'
    });
};

module.exports = {
    ErrorHandler,
    handleError
}