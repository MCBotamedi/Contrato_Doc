const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/contrato/:id/:email', controller.consultar)
router.post('/consultar/contrato', controller.consultarContrato)
router.post('/concluir', controller.concluir)
router.post('/criar_preferencia', controller.criarPreferencia)
router.post('/criar_preferencia_pagseguro', controller.criarPreferenciaPagSeguro)

router.put('/atualizar', controller.atualizar)
router.post('/webhook', controller.webhook)
// Rota para receber notificações do PagSeguro
router.post('/webhook-pagseguro', controller.webhookPagSeguro)
router.post('/webhookreclamacao', controller.reclamacao)
router.get('/teste/:id', (req, res) => {
    res.send('Rota de teste funcionando!');
});

module.exports = router