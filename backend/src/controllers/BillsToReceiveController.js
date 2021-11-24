const BillToReceive = require("../models/BillToReceive");
const { ErrorHandler } = require('../helpers/ErrorHandler');
const { dateFromString } = require('../helpers/Formatter');
const ExcelJs = require('exceljs');
const { Op } = require('sequelize');

module.exports = {
    async listar(req, res, next) {
        try {
            const contas = await BillToReceive.findAll({
                attributes: ['id', 'identification', 'due_date', 'paid', 'payday', 'amount'],
                order: [
                    ['identification', 'ASC']
                ]
            });

            if (contas) {
                return res.status(200).json({
                    data: contas,
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
            const data = {
                identification: req.body.identification,
                due_date: req.body.due_date && req.body.due_date.length > 0 ? dateFromString(req.body.due_date) : null,
                paid: req.body.paid,
                payday: req.body.payday && req.body.payday.length > 0 ? dateFromString(req.body.payday) : null,
                amount: req.body.amount
            };

            await BillToReceive.create(data);

            return res.status(200).json({
                msg: ['Conta criada!']
            });
        } catch (error) {
            return next(error);
        }
    },
    async editar(req, res, next) {
        try {
            const data = {
                identification: req.body.identification,
                due_date: req.body.due_date && req.body.due_date.length > 0 ? dateFromString(req.body.due_date) : null,
                paid: req.body.paid,
                payday: req.body.payday && req.body.payday.length > 0 ? dateFromString(req.body.payday) : null,
                amount: req.body.amount
            };

            const updated = await BillToReceive.update(data, {
                where: {
                    id: req.params.id
                }
            });

            if (updated[0] > 0) {
                return res.status(200).json({
                    msg: ['Conta atualizada.']
                });
            } else {
                throw new ErrorHandler(500, ['Não foi possível atualizar a conta.']);
            }
        } catch (error) {
            return next(error);
        }
    },
    async deletar(req, res, next) {
        try {
            const id = req.params.id;

            const destroyed = await BillToReceive.destroy({
                where: {
                    id: id
                }
            });

            if (destroyed > 0) {
                return res.status(200).json({
                    msg: ['Conta deletada.']
                });
            } else {
                throw new ErrorHandler(500, ['Não foi possível deletar a conta.']);
            }
        } catch (error) {
            return next(error);
        }
    },
    async gerarRelatorio(req, res, next) {
        try {
            let startDate = new Date();
            startDate = startDate.setMonth(startDate.getMonth() - 1)

            const bills = await BillToReceive.findAll({
                where: {
                    updatedAt: {
                        [Op.between]: [startDate, new Date()]
                    }
                },
                order: [
                    ['updatedAt', 'DESC']
                ]
            });

            if (bills.length > 0) {
                const workbook = new ExcelJs.Workbook();
                const sheet = workbook.addWorksheet('Últimos 30 dias');
                sheet.columns = [
                    { header: 'Identificação', key: 'identification', width: 40 },
                    { header: 'Data Vencimento', key: 'due_date', width: 20 },
                    { header: 'Recebido', key: 'paid', width: 10 },
                    { header: 'Data Pagamento', key: 'payday', width: 20 },
                    { header: 'Valor Recebido', key: 'amount', width: 15 }
                ];

                bills.forEach((bill) => {
                    sheet.addRow([
                        bill.identification,
                        bill.due_date ? new Date(bill.due_date).toLocaleDateString('pt-br') : '',
                        (bill.paid == true ? 'Sim' : 'Não'),
                        bill.payday ? new Date(bill.payday).toLocaleDateString('pt-br') : '',
                        bill.amount
                    ]);
                });

                const filepath = './temp/' + (new Date()).getTime() + '_contasareceber.xslx';
                await workbook.xlsx.writeFile(filepath);
                return res.download(filepath);
            } else {
                return res.status(500).json({
                    msg: 'Não há contas registradas nos últimos 30 dias'
                });
            }
        } catch (error) {
            return next(error);
        }
    }
};