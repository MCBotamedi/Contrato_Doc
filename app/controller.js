const mercadopago = require('mercadopago')
mercadopago.configure({ access_token: process.env.accessToken })
const service = require('./service')
const axios = require('axios')


class Controller {
  static consultar = async (req, res) => {
    try {
      const { id, email } = req.params
      const resultado = await service.consultar({ id, email })
      res.json(resultado)
    } catch (error) {
      console.error('Erro ao consultar contrato', error);
      res.status(500).json({ error: error.message });
    }
  }

  static consultarContrato = async (req, res) => {
    try {
      const { id, email } = req.body
      const resultado = await service.consultar({ id, email })
      res.json(resultado)
    } catch (error) {
      console.error('Erro ao consultar contrato', error);
      res.status(500).json({ error: error.message });
    }
  }

  static concluir = async (req, res) => {
    try {
      const { email, conteudoContrato } = req.body
      if (!email) return res.status(400).json({ error: "O campo 'email' é obrigatório" })
      const resultado = await service.concluir({ email, conteudoContrato })
      res.json(resultado)
    } catch (error) {
      console.error('Erro ao criar preferência:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static criarPreferencia = async (req, res) => {
    try {
      const { id, email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "O campo 'email' é obrigatório" });
      }

      const preference = {
        items: [
          {
            title: 'Contrato Imobiliario',
            unit_price: parseFloat(process.env.PRICE),
            quantity: 1,
            currency_id: 'BRL'
          }
        ],
        payer: {
          email: email
        },
        back_urls: {
          success: `${process.env.APP_URL}/download.html`,
          failure: `${process.env.APP_URL}/cartaoPro.html`,
          pending: `${process.env.APP_URL}/cartaoPro.html`
        },
        auto_return: 'approved',
        external_reference: id
      };
      console.log(`PARAMETROS ENVIADOS ${JSON.stringify(preference)}`)
      const response = await mercadopago.preferences.create(preference);
      const link = response.body.init_point;  // Link para o pagamento

      res.json({ link });  // Retorne o link na resposta
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao notificar pagamento' })
    }
  }

  static criarPreferenciaPagSeguro = async (req, res) => {
    try {
      const { email, id, cpf, nome, telefone } = req.body;
      if (!email) {
        return res.status(400).json({ error: "O campo 'email' é obrigatório" });
      }

      const isSandbox = process.env.PAGSEGURO_SANDBOX === 'true';
      const baseUrl = isSandbox ? 'https://sandbox.api.pagseguro.com' : 'https://api.pagseguro.com ';
      const tokenPagSeguro = process.env.PAGSEGURO_TOKEN;

      console.log('--- Debug PagSeguro V4 Checkout Config ---');
      console.log('Sandbox:', isSandbox);
      console.log('URL:', `${baseUrl}/checkouts`);

      if (!tokenPagSeguro) {
        throw new Error('Token do PagSeguro não está definido no arquivo .env');
      }

      // 1. Tratamento do CPF (Função inline para simplificar e garantir fallback)
      let customerCpf = cpf ? cpf.replace(/\D/g, '') : '';

      // CPF de teste VÁLIDO (Gerado: 111.444.777-35)
      const fallbackCpf = "11144477735";

      if (isSandbox) {
        console.log(`[SANDBOX] Validando CPF: '${customerCpf}'`);
        const isRepeated = /^(\d)\1+$/.test(customerCpf);
        const isValidLength = customerCpf.length === 11;

        let validDV = false;
        if (isValidLength && !isRepeated) {
          let soma = 0;
          let resto;
          for (let i = 1; i <= 9; i++) soma = soma + parseInt(customerCpf.substring(i - 1, i)) * (11 - i);
          resto = (soma * 10) % 11;
          if ((resto === 10) || (resto === 11)) resto = 0;
          if (resto === parseInt(customerCpf.substring(9, 10))) {
            soma = 0;
            for (let i = 1; i <= 10; i++) soma = soma + parseInt(customerCpf.substring(i - 1, i)) * (12 - i);
            resto = (soma * 10) % 11;
            if ((resto === 10) || (resto === 11)) resto = 0;
            if (resto === parseInt(customerCpf.substring(10, 11))) {
              validDV = true;
            }
          }
        }

        if (!validDV) {
          console.warn(`[SANDBOX] CPF '${customerCpf}' inválido ou de teste. Substituindo por CPF VÁLIDO para API: ${fallbackCpf}`);
          customerCpf = fallbackCpf;
        } else {
          console.log(`[SANDBOX] CPF '${customerCpf}' validado com sucesso.`);
        }
      }

      // 2. Tratamento do Nome
      let customerName = nome || "Cliente LegalDocs";
      // Remove caracteres especiais e números do nome, mantendo apenas letras e espaços
      customerName = customerName.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').trim();

      if (customerName.length < 3 || customerName.split(' ').length < 2) {
        if (isSandbox) {
          console.warn(`[SANDBOX] Nome '${customerName}' muito curto ou inválido. Ajustando para teste.`);
          customerName = "Cliente Teste Pagbank";
        } else {
          // Em produção, tenta usar o nome fornecido, mas adiciona sobrenome genérico se necessário para evitar erro 422
          customerName = customerName + " Sobrenome";
        }
      }

      // 3. Tratamento de Telefone
      let phoneObj = null;
      let cleanPhone = telefone ? telefone.replace(/\D/g, '') : '';

      // Se o telefone vier com 55 (Brasil) no início e tiver 12 ou 13 dígitos
      if (cleanPhone.startsWith('55') && (cleanPhone.length === 12 || cleanPhone.length === 13)) {
        cleanPhone = cleanPhone.substring(2);
      }

      if (cleanPhone && cleanPhone.length >= 10) {
        const area = cleanPhone.substring(0, 2);
        const number = cleanPhone.substring(2);
        phoneObj = {
          country: "55",
          area: area,
          number: number,
          type: "MOBILE"
        };
      } else {
        // Fallback robusto para Sandbox
        phoneObj = { country: "55", area: "11", number: "999999999", type: "MOBILE" };
      }

      console.log('Dados Enviados (Tratados):', { email, id, cpf: customerCpf, nome: customerName, telefone: phoneObj });

      // Payload para Criação de Checkout Redirect (API V4)
      const checkoutData = {
        reference_id: id || "REF-123",
        customer: {
          name: customerName,
          email: email,
          tax_id: customerCpf,
          phones: [phoneObj]
        },
        items: [
          {
            reference_id: "ITEM01",
            name: "Contrato Imobiliario",
            quantity: 1,
            unit_amount: Math.round(parseFloat(process.env.PRICE || '3.00') * 100)
          }
        ],
        // redirect_url é onde o usuário volta após pagar
        redirect_url: `${process.env.APP_URL}/download.html`,
      };

      const response = await axios.post(`${baseUrl}/checkouts`, checkoutData, {
        headers: {
          'Authorization': `Bearer ${tokenPagSeguro}`,
          'Content-Type': 'application/json',
          'User-Agent': 'LegalDocs/1.0'
        }
      });

      console.log('PagSeguro V4 Response Status:', response.status);

      // Extrair link de pagamento do Checkout Redirect
      const links = response.data.links || [];
      const paymentLink = links.find(l => l.rel === 'PAY') || links.find(l => l.rel === 'SELF');

      if (paymentLink) {
        res.json({ link: paymentLink.href });
      } else {
        res.json({
          message: "Checkout criado, mas link de redirecionamento não encontrado na resposta padrão.",
          checkout_id: response.data.id,
          api_response: response.data
        });
      }

    } catch (error) {
      console.error('Erro no PagSeguro V4 Checkout:', error.message);
      let errorData = null;
      if (error.response) {
        console.error('PagSeguro V4 Data:', error.response.data);
        errorData = error.response.data;
      }
      res.status(500).json({
        message: 'Erro ao criar checkout PagBank V4',
        details: error.message,
        pagseguro_error: errorData
      });
    }
  }


  static atualizar = async (req, res) => {
    try {
      console.log('--- PUT /atualizar chamado ---');
      console.log('Body recebido:', req.body);
      const { id, status, idPagamento } = req.body
      if (!id) {
        console.error('Erro: ID não fornecido no corpo da requisição');
        return res.status(400).json({ error: "O campo 'id' é obrigatório" })
      }
      const resultado = await service.atualizar({ id, status, idPagamento })
      res.json(resultado)
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error)
      res.status(500).json({ error: error.message })
    }
  }

  static webhook = async (req, res) => {
    try {
      const { data } = req.body;
      if (data && data.id) {
        const payment = await mercadopago.payment.findById(data.id);
        const dados = {
          id: payment.body.external_reference,
          status: payment.body.status,
          idPagamento: payment.body.id
        }
        await service.atualizar(dados)
      }
      res.status(200).send()
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error)
      res.status(500).json({ error: error.message })
    }
  }

  // --- Implementação do Webhook PagSeguro V4 ---
  // Recebe notificações de status de pagamento do PagBank
  static webhookPagSeguro = async (req, res) => {
    try {
      console.log('--- Webhook PagSeguro Recebido ---');
      // O payload do PagSeguro V4 geralmente vem no corpo da requisição
      const notification = req.body;
      console.log('Payload:', JSON.stringify(notification, null, 2));

      // Verificação básica se é uma notificação de cobrança (charge)
      if (notification.charges && notification.charges.length > 0) {
        const charge = notification.charges[0];

        // Mapeamento de status do PagSeguro para o sistema interno
        // Status possíveis no PagSeguro: PAID, DECLINED, CANCELED, IN_ANALYSIS, AUTHORIZED
        const pagSeguroStatus = charge.status;
        let internalStatus = 'pending';

        if (pagSeguroStatus === 'PAID') {
          internalStatus = 'approved'; // Compatível com a lógica do MercadoPago ("approved")
        } else if (pagSeguroStatus === 'DECLINED' || pagSeguroStatus === 'CANCELED') {
          internalStatus = 'cancelled';
        } else {
          internalStatus = 'pending';
        }

        const dados = {
          id: notification.reference_id, // ID do contrato enviado na criação do checkout
          status: internalStatus,
          idPagamento: charge.id // ID da transação no PagSeguro
        };

        console.log(`Atualizando contrato ${dados.id} para status: ${dados.status}`);

        // Chama o serviço para atualizar o banco e disparar e-mails se aprovado
        // A lógica de envio de e-mail e geração de PDF já está centralizada no service.atualizar
        await service.atualizar(dados);
      } else {
        console.log('Notificação recebida, mas sem dados de cobrança (charges). Ignorando.');
      }

      // PagSeguro espera um 200 OK para confirmar o recebimento
      res.status(200).send();
    } catch (error) {
      console.error('Erro no Webhook PagSeguro:', error);
      // Mesmo com erro interno, respondemos 200 para o PagSeguro não ficar retentando infinitamente se for erro de lógica nossa
      // Se for erro de rede/banco crítico, talvez valha a pena retornar 500 para retentativa
      res.status(200).send();
    }
  }

  static reclamacao = async (req, res) => {
    try {
      console.log(req.body)
      res.status(200).send()
    } catch (error) {
      console.error('Erro ao executar reclamacao:', error)
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = Controller