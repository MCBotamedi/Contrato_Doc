const repository = require('./repository')

const pdfService = require('./services/pdfService')
const emailService = require('./services/emailService')

class Service {

  static async consultar({ id, email }) {
    return await repository.consultar(id, email)
  }
  static async concluir({ email, conteudoContrato }) {
    return await repository.concluir(email, conteudoContrato)
  }

  static async atualizar({ id, status, idPagamento }) {
    console.log(`[Service] Atualizando contrato ${id} para status: ${status}`);
    const contrato = await repository.atualizar(id, status, idPagamento)

    // Se o pagamento for aprovado, gerar PDF e enviar email
    if (contrato && (status === 'approved' || status === 'paid' || status === 'succeeded')) {
      console.log(`[Service] Pagamento aprovado para contrato ${id}. Iniciando fluxo de entrega...`);

      // Executar em background (sem await) para não travar a resposta do webhook
      (async () => {
        try {
          let htmlContent = contrato.conteudoContrato || contrato.conteudocontrato;

          console.log('[Service] Conteúdo do contrato recuperado. Tipo:', typeof htmlContent);

          // Tenta fazer parse se estiver stringified (dependendo de como foi salvo)
          try {
            if (typeof htmlContent === 'string' && (htmlContent.startsWith('"') || htmlContent.startsWith('{'))) {
              htmlContent = JSON.parse(htmlContent);
              console.log('[Service] Parse JSON do conteúdo realizado com sucesso.');
            }
          } catch (e) {
            console.warn('[Service] Falha ao fazer parse JSON do conteúdo (usando original):', e.message);
          }

          console.log("[Service] Gerando PDF...");
          const pdfBuffer = await pdfService.generatePDF(htmlContent);
          console.log("[Service] PDF gerado. Tamanho:", pdfBuffer.length);

          if (!contrato.email) {
            console.error("[Service] ERRO: Email não encontrado no contrato:", contrato);
            return;
          }

          console.log("[Service] Enviando Email para:", contrato.email);
          await emailService.sendContractEmail(
            contrato.email,
            "Seu Contrato de Locação - LegalDocs",
            "Olá,\n\nSeu pagamento foi confirmado! Segue em anexo o seu contrato de locação.\n\nAtenciosamente,\nEquipe LegalDocs",
            pdfBuffer
          );
          console.log("[Service] Email enviado com sucesso!");
        } catch (error) {
          console.error("[Service] Erro CRÍTICO no fluxo de envio de email (PDF):", error);
        }
      })();
    } else {
      console.log(`[Service] Status '${status}' não requer envio de email ou contrato não encontrado.`);
    }

    return contrato
  }
}

module.exports = Service