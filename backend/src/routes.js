const express = require('express');
const router = express.Router();
const { handleError } = require('./helpers/ErrorHandler');

// middlewares
const diretorAuth = require('./middlewares/diretorAuth');

// usuários
const UsersController = require('./controllers/UsersController');
router.post('/usuarios/cadastrar', UsersController.cadastrar);
router.post('/usuarios/entrar', UsersController.entrar);
router.post('/usuarios/recuperar', UsersController.recuperar);
router.get('/usuarios/listar', diretorAuth, UsersController.listar);
router.post('/usuarios/alterarPermissao/:id', diretorAuth, UsersController.alterarPermissao);
router.post('/usuarios/desativar/:id', diretorAuth, UsersController.desativar);

// configurações
const SettingsController = require('./controllers/SettingsController');
router.post('/configuracoes/editarSmtp', diretorAuth, SettingsController.editarSmtp);

// contas a pagar
const BillsToPayController = require('./controllers/BillsToPayController');
router.get('/contasPagar/listar', diretorAuth, BillsToPayController.listar);
router.post('/contasPagar', diretorAuth, BillsToPayController.criar);
router.put('/contasPagar/:id', diretorAuth, BillsToPayController.editar);
router.delete('/contasPagar/:id', diretorAuth, BillsToPayController.deletar);
router.get('/contasPagar/gerarRelatorio', diretorAuth, BillsToPayController.gerarRelatorio);

// contas a receber
const BillsToReceiveController = require('./controllers/BillsToReceiveController');
router.get('/contasReceber/listar', diretorAuth, BillsToReceiveController.listar);
router.post('/contasReceber', diretorAuth, BillsToReceiveController.criar);
router.put('/contasReceber/:id', diretorAuth, BillsToReceiveController.editar);
router.delete('/contasReceber/:id', diretorAuth, BillsToReceiveController.deletar);
router.get('/contasReceber/gerarRelatorio', diretorAuth, BillsToReceiveController.gerarRelatorio);

// eventos
const EventsController = require('./controllers/EventsController');
router.get('/eventos/listar', diretorAuth, EventsController.listar);
router.post('/eventos', diretorAuth, EventsController.criar);
router.put('/eventos/:id', diretorAuth, EventsController.editar);
router.delete('/eventos/:id', diretorAuth, EventsController.deletar);
router.get('/eventos/notificar/:id', diretorAuth, EventsController.notificar);

// middleware de erros (sempre por último)
router.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = router;
