const DateFns = require('date-fns');

module.exports = {
    /**
     * Formatar data de string.
     * @param {string} date 
     * @param {string} format 
     * @returns Date
     */
    dateFromString(date, format = 'dd/MM/yyyy HH:mm') {
        return DateFns.formatISO(DateFns.parse(date.length === 10 ? date + ' 00:00' : date, format, new Date()));
    }
};