# Guia de Testes Locais com Ngrok (PagSeguro e MercadoPago)

Para testar o fluxo completo de pagamento, confirmação via webhook, geração de contrato e envio de e-mail em sua máquina local, você precisa expor seu servidor local (localhost) para a internet. Faremos isso usando o **Ngrok**.

## 1. Instalação e Execução do Ngrok

1.  **Baixar**: Se ainda não tiver, baixe o Ngrok em [ngrok.com/download](https://ngrok.com/download).
2.  **Instalar**: Descompacte e (opcionalmente) adicione ao seu PATH.
3.  **Iniciar**: No terminal, na pasta do projeto, rode:
    ```bash
    ngrok http 3000
    ```
    *(Assumindo que seu servidor Node.js roda na porta 3000. Se for outra, ajuste o comando)*.
4.  **Copiar URL**: O Ngrok vai gerar uma URL pública, algo como `https://a1b2-c3d4.ngrok-free.app`. **Copie essa URL**.

---

## 2. Configurando o PagSeguro (Sandbox)

1.  **Acesse**: [PagBank Sandbox Dashboard](https://sandbox.pagseguro.uol.com.br/).
2.  **Vendedor / Configurações**: Vá em "Perfis de Integração" ou "Vendedor".
3.  **Configurar Webhook/Notificação**:
    - Procure por "Notificação de Transação" ou "Webhook".
    - **URL de Notificação**: Cole a URL do Ngrok seguida da rota que criamos:
      `https://SEU-ID-NGROK.ngrok-free.app/webhook-pagseguro`
    - Salve a configuração.
4.  **Variáveis de Ambiente (.env)**:
    - Certifique-se de que estão configuradas para Sandbox:
      ```env
      PAGSEGURO_SANDBOX=true
      PAGSEGURO_TOKEN=SEU_TOKEN_DE_SANDBOX
      ```

### 2.1 Realizando o Teste (PagSeguro)
1.  Abra seu site localmente (`http://localhost:3000`).
2.  Preencha um contrato e escolha **PagSeguro**.
3.  No checkout do PagBank (Sandbox), use o **Cartão de Teste**:
    - **Número**: `411111111111111`
    - **Validade**: Qualquer data futura (ex: 12/2030)
    - **CVV**: `123`
    - **Nome**: `COMprador de Teste`
4.  Confira o terminal do seu servidor (`npm start`). Você deve ver logs como:
    - `--- Webhook PagSeguro Recebido ---`
    - `Payload: ...`
    - `Atualizando contrato ... para status: approved`
    - `Enviando Email para: ...`

---

## 3. Configurando o MercadoPago (Sandbox)

1.  **Acesse**: [MercadoPago Developers](https://www.mercadopago.com.br/developers/panel).
2.  **Suas Integrações**: Selecione sua aplicação.
3.  **Notificações / Webhooks**:
    - Editar URL de Produção/Teste.
    - **URL do Webhook**: Cole a URL do Ngrok seguida da rota existente:
      `https://SEU-ID-NGROK.ngrok-free.app/webhook`
    - Marque os eventos: `Pagamentos` (Payments).
4.  **Variáveis de Ambiente (.env)**:
    - Use o **Access Token de TESTE**:
      ```env
      accessToken=TEST-SEU-TOKEN-AQUI
      ```

### 3.1 Realizando o Teste (MercadoPago)
1.  Abra seu site localmente.
2.  Preencha um contrato.
3.  Escolha **MercadoPago**.
4.  Use os cartões de teste do MercadoPago (disponíveis na documentação ou no checkout de teste).
5.  Confira o terminal do servidor para logs de aprovação ("approved").

---

## 4. Verificação Final

- **E-mail**: Verifique a caixa de entrada do e-mail usado no contrato (ou Mailtrap, se configurado) para ver se o contrato chegou.
- **Banco de Dados**: Verifique se o status do contrato mudou para `approved`.

- **Banco de Dados**: Verifique se o status do contrato mudou para `approved`.

## 5. Configuração Geral (.env)

Para que o redirecionamento (após o pagamento) funcione corretamente na sua máquina local, certifique-se de que a variável `APP_URL` está definida no seu arquivo `.env`:

```env
APP_URL=http://localhost:3000
```
*(Ou use a sua URL do Ngrok se quiser testar o fluxo em outro dispositivo: `APP_URL=https://seu-ngrok.ngrok-free.app`)*

> [!NOTE]
> Toda vez que você reiniciar o Ngrok, a URL muda. Você precisará atualizar a URL nos painéis do PagSeguro e MercadoPago.
