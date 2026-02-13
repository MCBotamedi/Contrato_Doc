//Documentação Proprietário e Inquilino
function atualizarTexto(
  inputId,
  targetId,
  defaultValue = "________________________"
) {
  const input = document.getElementById(inputId).value.trim();
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    targetElement.innerText = input ? ` ${input},` : ` ${defaultValue},`;
  } else {
    console.error(`Elemento com ID "${targetId}" não encontrado.`);
  }
}



/////-----------------////

//Estado Civil
// Mapa de opções para estado civil
const estadoCivilMap = {
  sol: "Solteiro(a)",
  ca: "Casado(a)",
  vi: "Viúvo(a)",
  di: "Divorciado(a)",
  sep: "Separado(a) Judicialmente",
  uni: "União Estável",
};

// Vincular o evento de mudança ao select
document.getElementById("Estado_Civil").addEventListener("change", () => {
  estadoCivilText("Estado_Civil", "est-civil-text", estadoCivilMap);
});

document.getElementById("Est_Ci_Inquilino").addEventListener("change", () => {
  estadoCivilText("Est_Ci_Inquilino", "est-civil-textInq", estadoCivilMap);
});

document.getElementById("Est_Ci_Fiador").addEventListener("change", () => {
  estadoCivilText("Est_Ci_Fiador", "fiador_text", estadoCivilMap);
});

// Função genérica para atualizar o texto com base no select
function estadoCivilText(
  selectId,
  targetClass,
  optionsMap,
  defaultText = "Selecione uma opção"
) {
  const select = document.getElementById(selectId);
  const elements = document.querySelectorAll(`.${targetClass}`);
  const text = optionsMap[select.value] || defaultText;

  elements.forEach((element) => {
    element.textContent = text;
  });
}

////---------------------/////

//Informações Propreitario e Inquilino

function imputarDoc() {
  const input = document.getElementById("Carteira").value;
  document.getElementById("doc-text").innerText =
    " " + input || "________________________,";
}

function imputarOrgao() {
  const input = document.getElementById("Orgao").value;
  document.getElementById("org-text").innerText =
    " " + input || "________________________,";
}

function imputarDocInq() {
  const input = document.getElementById("Cart_Inquilino").value;
  document.getElementById("doc-textInq").innerText =
    " " + input || "________________________,";
}

function imputarOrgaoInq() {
  const input = document.getElementById("Org_Inquilino").value;
  document.getElementById("org-textInq").innerText =
    " " + input || "________________________,";
}

///////////-----------------------------//////////

function imputarDocPro() {
  const input = document.getElementById("Doc_proprietario").value;
  document.getElementById("doc-prop-text").innerText =
    " " + input || "________________________,";
}

function imputarDocCNPJ() {
  const input = document.getElementById("Doc_CNPJ_pro").value;
  document.getElementById("doc-CNPJ-text").innerText =
    " " + input || "________________________,";
}
/// email do proprietário ///
function imputarEmailpro() {
  const input = document.getElementById("Email_proprietario").value;
  document.getElementById("email-prop-text").innerText =
    " " + input || "________________________,";
}

function imputarNum() {
  const input = document.getElementById("Numero_proprietario").value;
  document.getElementById("num-text").innerText =
    " " + input || "________________________,";
}

function imputarComp() {
  const input = document.getElementById("Complemento_proprietario").value;
  document.getElementById("compl-text").innerText = " " + input + "" || "";
}

////// email do Inquilino///
function imputarCPFInq() {
  const input = document.getElementById("CPF_Inquilino").value;
  document.getElementById("cpf-textInq").innerText =
    " " + input || "________________________,";
}
function imputarCNPJInq() {
  const input = document.getElementById("CNPJ_Inq").value;
  document.getElementById("doc-CNPJ-textInq").innerText =
    " " + input || "________________________,";
}
/// email do proprietário ///
function imputarEmailInq() {
  const input = document.getElementById("Email_Inquilino").value;
  document.getElementById("email_Inq").innerText =
    " " + input || "________________________,";
}

function imputarNumInq() {
  const input = document.getElementById("Numero_Inquilino").value;
  document.getElementById("num-textInq").innerText =
    " " + input || "________________________,";
}

function imputarCompInq() {
  const input = document.getElementById("Compl_Inquilino").value;
  document.getElementById("compl-textInq").innerText = " " + input + " " || "";
}

//////Endereço do imóvel /////

function imputarNumImovel() {
  const input = document.getElementById("Numero_Imovel").value;
  document.getElementById("num_textImo").innerText =
    " " + input || "________________________,";
}

function imputarCompImovel() {
  const input = document.getElementById("Compl_Imovel").value;
  document.getElementById("compl_textImo").innerText =
    " " + input || "________________________, ";
}

function imputarBairroImovel() {
  const input = document.getElementById("Bairro_Imovel").value;
  // Try to update both correct ID and potential cached typo ID
  const el = document.getElementById("bairro-textImovel");
  const elTypo = document.getElementById("bairro-texImovel");

  if (el) el.innerText = " " + input || "________________________,";
  if (elTypo) elTypo.innerText = " " + input || "________________________,";
}

///Detalhes do imóvel///
// Adicionar detalhes
document
  .getElementById("des_Destalhes")
  .addEventListener("input", descricao_Detalhes);

///Decrição de Imóvel /////
function descricao_Detalhes() {
  const texto = document.getElementById("des_Destalhes").value;
  document.getElementById("descricao_Texarea").innerText = texto;
}

//////------------------------////////

/////Matricula do Imóvel///
// Adicionar evento ao selecionar Matricula
document.getElementById("matricula").addEventListener("change", mat_Imovel);

function mat_Imovel() {
  const mat_imovel = document.getElementById("matricula").value;
  //alert(mat_imovel)
  const conteudoDiv = document.getElementById("mat_Imo");

  // limpar
  // conteudoDiv.innerHTML = '';

  if (mat_imovel === "SM") {
    conteudoDiv.innerHTML = `<p>Sob a Matrícula nº <span id="Num_Mat-Text">_________________,</span> do <span id="Cat_Mat-Text">_________________,</span> isento de encargos ou quaisquer pendência financeiras.</p>`;
  } else if (mat_imovel === "NM") {
    conteudoDiv.innerHTML = `<p>Imóvel isento de encargos ou quaisquer pendências financeiras.<\p>`;
  }

  // Visual feedback: scroll to element and highlight
  conteudoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  conteudoDiv.classList.add('bg-warning');
  setTimeout(() => {
    conteudoDiv.classList.remove('bg-warning');
    conteudoDiv.style.transition = "background-color 0.5s ease";
  }, 2000);
}

//// Valor do Aluguel ////////

function val_Aluguel() {
  const aluguel = document.getElementById("valor").value; // Obtém o valor do input
  const aluguel_txt = document.getElementById("valor_txt"); // Local para exibir o valor por extenso

  // Verifica se o valor é válido
  if (!aluguel || isNaN(aluguel) || parseFloat(aluguel) <= 0) {
    aluguel_txt.innerHTML = "Por favor, insira um valor válido.";
    return;
  }

  const valorNumerico = parseFloat(aluguel); // Converte para número
  const valorPorExtenso = numeroParaExtenso(valorNumerico); // Converte para extenso

  // Atualiza o HTML com o valor e o texto por extenso
  aluguel_txt.innerHTML = ` ${valorNumerico
    .toFixed(2)
    .replace(".", ",")} (${valorPorExtenso})`;
}

////////Dia de pagamento de Alguel /////

function diaPagamentoAluguel() {
  const diapag = document.getElementById("dia_aluguel").value;
  document.getElementById("data_txt").innerText = diapag;
}

/// Meio  de pagamento  /////

function meioPagamento() {
  const meioPag = document.getElementById("pagamento").value;
  const meioContent = document.getElementById("meio_pagamento");
  const meioPago = document.getElementById("meio_pag");

  if (meioPag === "DI") {
    meioContent.innerHTML = ` `;
    meioPago.innerHTML = `<p>§ 1º. Este pagamento será efetuado em dinheiro (espécie), diretamente ao LOCADOR ou a terceiros que tenham a devida autorização deste.</p>`;
  } else if (meioPag === "PI") {
    meioContent.innerHTML = `
            <div>
                <div>Informações do PIX</div>
                <div class="mt-2">
                    <label for="pix">Chave PIX:</label>
                    <input class="form-control" type="text" name="pix" id="pix" placeholder="Ex: chave">
                </div>
                <div class="mt-2">
                    <label for="chave">Nome do titular da chave</label>
                    <input class="form-control" type="text" name="chave" id="chave" placeholder="Ex: João da Silva">
                </div>
            </div>`;
    meioPago.innerHTML = `<p>§ 1º. Este pagamento será efetuado por meio de PIX, para a conta do LOCADOR ou de terceiros autorizados por ele, cuja chave PIX é: <span id="pix_txt">_____________________</span> (em nome do titular: <span id="chave_txt">_________________________</span>).</p>`;
    // Adiciona os listeners após criar os elementos
    document.getElementById("pix").addEventListener("input", chave_PIX);
    document.getElementById("chave").addEventListener("input", titular_Chave);
  } else if (meioPag === "Che") {
    meioContent.innerHTML = ` `;
    meioPago.innerHTML = `<p>§ 1º. Este pagamento será efetuado em cheque, diretamente ao LOCADOR ou a terceiros que tenham a devida autorização deste.</p>`;
  } else if (meioPag === "Trans") {
    meioContent.innerHTML = `
            <div>
                <div>Informações bancárias</div>
                <div class="mt-2">
                    <label for="banco">Nome do Banco:</label>
                    <input class="form-control" type="text" name="banco" id="banco" placeholder="Ex: Banco do Brasil">
                </div>
                <div class="mt-2">
                    <label for="agencia">Número da Agência</label>
                    <input class="form-control" type="text" name="agencia" id="agencia" placeholder="Ex: 1234-X">
                </div>
                <div class="mt-2">
                    <label for="conta">Número da Conta</label>
                    <input class="form-control" type="text" name="conta" id="conta" placeholder="Ex: 12.345-X">
                </div>
            </div>`;
    meioPago.innerHTML = `<p>
            § 1º. Este pagamento será efetuado via depósito bancário na conta de titularidade do LOCADOR ou de terceiros autorizados por ele, cujos dados bancários são:<br>
            Banco :   <span id="banco_txt">________________</span> <br>
            Agência:  <span id="agencia_txt">________________</span> <br>
            Conta :   <span id="conta_txt">________________</span> <br>
        </p>`;
    // Adiciona os listeners após criar os elementos
    document.getElementById("banco").addEventListener("input", banco_Trans);
    document.getElementById("agencia").addEventListener("input", agencia_bc);
    document.getElementById("conta").addEventListener("input", conta_bc);
  } else if (meioPag === "Bol") {
    meioContent.innerHTML = ` `;
    meioPago.innerHTML = `<p>§ 1º. Este pagamento será efetuado via boleto bancário, emitido pelo LOCADOR e enviado ao LOCATÁRIO por meio eletrônico ou postal.</p>`;
  } else if (meioPag === "Outro") {
    meioContent.innerHTML = `
            <div>
                <div>Qual outro meio de pagamento que será utilizado?</div>
                <div class="mt-2">
                    <label for="meio">Meio de pagamento</label>
                    <input class="form-control" type="text" name="meio" id="meio" placeholder="Ex: PayPal">
                </div>
            </div>`;
    meioPago.innerHTML = `<p>§ 1º. Esse pagamento será realizado pelo seguinte meio: <span id="meio_txt">____________</span>, conforme acordado entre as partes e em conformidade com a legislação brasileira vigente.</p>`;
    // Adiciona o listener após criar o elemento
    document.getElementById("meio").addEventListener("input", meio_pag);
  }
}

//////Pix/////
function chave_PIX() {
  let pix = document.getElementById("pix").value;
  document.getElementById("pix_txt").innerHTML = pix;
}

function titular_Chave() {
  let chave = document.getElementById("chave").value;
  document.getElementById("chave_txt").innerHTML = chave;
}

////Transferência Bancária ///////

function banco_Trans() {
  let banco = document.getElementById("banco").value;
  document.getElementById("banco_txt").innerHTML = banco;
}

function agencia_bc() {
  let agencia = document.getElementById("agencia").value;
  document.getElementById("agencia_txt").innerHTML = agencia;
}

function conta_bc() {
  let conta = document.getElementById("conta").value;
  document.getElementById("conta_txt").innerHTML = conta;
}

////Outro Meio ///

function meio_pag() {
  let meio = document.getElementById("meio").value;
  document.getElementById("meio_txt").innerHTML = meio;
}

/////////////////////////////////////////////////////////////////////////////////

/////// Índice de reajuste /////
function indiceReajuste() {
  const reajuste = document.getElementById("reajuste").value;
  const reajusteText = document.getElementById("reajuste_txt");

  if (reajuste === "INCC") {
    reajusteText.innerHTML = `<p>§ 2º. O valor do aluguel poderá ser reajustado anualmente, com base nos índices previstos e acumulados no período anual do INCC. Caso haja alguma alteração no contexto governamental, todos os valores agregados ao aluguel, inclusive 
        o próprio aluguel, serão revisados pelas partes.<br><br>
        § 3º. O LOCATÁRIO, não realizando o pagamento do aluguel até a data estipulada, fica obrigado a pagar uma multa de <span id="multa_txt">0</span>%( por cento) sobre o valor do aluguel acordado neste contrato, além de juros de mora de 1% (um por cento) ao mês e correção monetária, conforme variação do INCC.<br><br></p>`;
  } else if (reajuste === "IGPM") {
    reajusteText.innerHTML = `§ 2º. O valor do aluguel poderá ser reajustado anualmente, com base nos índices previstos e acumulados no período anual do IGP-M. Caso haja alguma alteração no contexto governamental, todos os valores agregados ao aluguel, inclusive o 
        próprio aluguel, serão revisados pelas partes.<br><br>
        § 3º. O LOCATÁRIO, não realizando o pagamento do aluguel até a data estipulada, fica obrigado a pagar uma multa de <span id="multa_txt">0</span>% ( por cento) sobre o valor do aluguel acordado neste contrato, além de juros de mora de 1% (um por cento) ao mês e correção monetária, conforme variação do IGP-M.<br><br></p>`;
  } else if (reajuste === "IPCA") {
    reajusteText.innerHTML = `§ 2º. O valor do aluguel poderá ser reajustado anualmente, com base nos índices previstos e acumulados no período anual do IPCA. Caso haja alguma alteração no contexto governamental, todos os valores agregados ao aluguel, inclusive o 
        próprio aluguel, serão revisados pelas partes.<br><br>
        § 3º. O LOCATÁRIO, não realizando o pagamento do aluguel até a data estipulada, fica obrigado a pagar uma multa de <span id="multa_txt">0</span>%( por cento) sobre o valor do aluguel acordado neste contrato, além de juros de mora de 1% (um por cento) ao mês e correção monetária, conforme variação do IPCA.<br><br></p>`;
  } else if (reajuste === "IVAR") {
    reajusteText.innerHTML = `§ 2º. O valor do aluguel poderá ser reajustado anualmente, com base nos índices previstos e acumulados no período anual do IVAR. Caso haja alguma alteração no contexto governamental, todos os valores agregados ao aluguel, inclusive o próprio aluguel, serão revisados pelas partes.<br><br>
        § 3º. O LOCATÁRIO, não realizando o pagamento do aluguel até a data estipulada, fica obrigado a pagar uma multa de <span id="multa_txt">0</span>% ( por cento) sobre o valor do aluguel acordado neste contrato, além de juros de mora de 1% (um por cento) ao mês e correção monetária, conforme variação do IVAR.<br><br></p>`;
  }
}

//// Multa com Atraso //////

function multaAtraso() {
  const multaid = document.getElementById("multa").value;
  document.getElementById("multa_txt").innerHTML = multaid;
}

function garantia() {
  const garantia = document.getElementById("garantia").value;
}

///// Inserir Texto de  Obras Essenciais /////

function obras_Essen() {
  const obras = document.getElementById("obras").value;
  const obrasText = document.getElementById("obras_txt");

  if (obras === "Prop") {
    obrasText.innerHTML = `<p>As benfeitorias necessárias serão passíveis de indenização, contanto que tenham sido feitas com a autorização do LOCADOR.</p>`;
  } else {
    obrasText.innerHTML = `<p>As benfeitorias necessárias não serão passíveis de indenização, mesmo que tenham sido feitas com a permissão do LOCADOR.</p>`;
  }
}

/// Inserir Texot de obra  não  Essenciais////

function obras_nao() {
  const nobra = document.getElementById("nobras").value;
  const nobraText = document.getElementById("nobras_txt");

  if (nobra === "Inquilino") {
    nobraText.innerHTML = `<p>§ 2º. As benfeitorias úteis, contudo, serão de responsabilidade do LOCATÁRIO. Contanto que tenham sido feitas com a autorização do LOCADOR.</p>`;
  } else {
    nobraText.innerHTML = `<p>§ 2º. Contudo, as benfeitorias úteis ficarão a cargo do LOCADOR, desde que realizadas com seu consentimento expresso.</p>`;
  }
}

////Pagamento do IPTU ///
function iptu_pag() {
  const iptu = document.getElementById("IPTU").value;
  const iptu_Text = document.getElementById("iptu_txt");

  if (iptu === "Inquilino") {
    iptu_Text.innerHTML = `<p>§ 5º. O LOCATÁRIO é obrigado a arcar com todos os impostos associados ao imóvel locado, incluindo o IPTU.</p>`;
  } else {
    iptu_Text.innerHTML = `<p>§ 5º. O LOCADOR é obrigado a arcar com todos os impostos associados ao imóvel, incluindo o IPTU.</p>`;
  }
}

///// Pagamento do Seguro Responsável ///
function pag_Seguro() {
  const seguro = document.getElementById("inc").value;
  const seguroText = document.getElementById("inc_txt");

  if (seguro === "Ninguem") {
    seguroText.innerHTML = ``;
  } else if (seguro === "Prop") {
    seguroText.innerHTML = `<p>§7°. O LOCADOR fica obrigado a contratar seguro contra incêndios do imóvel locado.</p>`;
  } else {
    seguroText.innerHTML = `<p>§7°. O LOCATÁRIO fica obrigado a contratar seguro contra incêndios do imóvel locado, com uma seguradora de confiança e que seja aprovada previamente pelo LOCADOR.</p>`;
  }
}

///Incluir cláusulas proprietário////
document
  .getElementById("text-clausula")
  .addEventListener("input", inc_clausula);

function toRoman(num) {
  const lookup = {
    1: "I", 2: "II", 3: "III", 4: "IV", 5: "V",
    6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X",
    11: "XI", 12: "XII", 13: "XIII", 14: "XIV", 15: "XV",
    16: "XVI", 17: "XVII", 18: "XVIII", 19: "XIX", 20: "XX"
  };
  return lookup[num] || num;
}

function inc_clausula() {
  const input = document.getElementById("text-clausula").value;
  const lines = input.split("\n");
  let output = "";
  let count = 0;
  // Start from V (5) as per contract template ending at IV
  const startOffset = 5;

  lines.forEach((line) => {
    if (line.trim() !== "") {
      if (count > 0) output += "<br>";
      output += toRoman(startOffset + count) + " - " + line;
      count++;
    }
  });

  document.getElementById("inc_clausula").innerHTML = output;
}

/// Incluir cláusulas Inquilino////
document
  .getElementById("text-inq_clausula")
  .addEventListener("input", inc_Inq_clausula);

function inc_Inq_clausula() {
  const input = document.getElementById("text-inq_clausula").value;
  const lines = input.split("\n");
  let output = "";
  let count = 0;
  // Start from V (5) as per contract template ending at IV
  const startOffset = 5;

  lines.forEach((line) => {
    if (line.trim() !== "") {
      if (count > 0) output += "<br>";
      output += toRoman(startOffset + count) + " - " + line;
      count++;
    }
  });

  document.getElementById("inc_Inq_clausula").innerHTML = output;
}
////Incluir Cidade ///

function inc_cidade() {
  const cidade = document.getElementById("cidade").value;
  document.getElementById("cidade-txt").innerHTML = cidade;
}

/////Incluir Estado ///

function inc_UF() {
  const UF = document.getElementById("estado_uf").value;
  document.getElementById("UF-txt").innerHTML = UF;
}

///Incluir Dia ///

function inc_dia() {
  const dia = document.getElementById("dia").value;
  document.getElementById("dia-txt").innerHTML = dia;
}

///Incluir Mes ///

function inc_mes() {
  const mes = document.getElementById("meses").value;
  document.getElementById("mes_txt").innerHTML = mes;
}

//// Incluir Ano//

function inc_ano() {
  const ano = document.getElementById("ano_ass").value;
  document.getElementById("ano-txt").innerHTML = ano;
}

/// Incluir 1º Testemunha ///
document.getElementById("testemunha1").addEventListener("change", inc_tes1);
document.getElementById("cpf_Tes1").addEventListener("change", inc_tes1);
function inc_tes1() {
  const nome = document.getElementById("testemunha1").value;
  document.getElementById("nome_tes1-txt").innerHTML = " " + nome;
  const cpf1 = document.getElementById("cpf_Tes1").value;
  document.getElementById("cpf_tes1-txt").innerHTML = cpf1;
}

/// Incluir 2º  Testemunha ///
document.getElementById("testemunha2").addEventListener("change", inc_tes2);
document.getElementById("cpf_Tes2").addEventListener("change", inc_tes2);
function inc_tes2() {
  const nome = document.getElementById("testemunha2").value;
  document.getElementById("nome_tes2-txt").innerHTML = " " + nome;
  const cpf2 = document.getElementById("cpf_Tes2").value;
  document.getElementById("cpf_tes2-txt").innerHTML = cpf2;
}

// Função para converter valores em texto por extenso
function numeroParaExtenso(valor) {
  const unidades = [
    "",
    "um",
    "dois",
    "três",
    "quatro",
    "cinco",
    "seis",
    "sete",
    "oito",
    "nove",
  ];
  const especiais = [
    "dez",
    "onze",
    "doze",
    "treze",
    "quatorze",
    "quinze",
    "dezesseis",
    "dezessete",
    "dezoito",
    "dezenove",
  ];
  const dezenas = [
    "",
    "",
    "vinte",
    "trinta",
    "quarenta",
    "cinquenta",
    "sessenta",
    "setenta",
    "oitenta",
    "noventa",
  ];
  const centenas = [
    "",
    "cento",
    "duzentos",
    "trezentos",
    "quatrocentos",
    "quinhentos",
    "seiscentos",
    "setecentos",
    "oitocentos",
    "novecentos",
  ];

  const mil = "mil";
  const reais = "reais";
  const real = "real";
  const centavo = "centavo";
  const centavos = "centavos";

  let valorInteiro = Math.floor(valor); // Parte inteira (reais)
  let valorDecimal = Math.round((valor - Math.floor(valor)) * 100); // Parte decimal (centavos)
  let extenso = "";

  // Função auxiliar para converter números de 0 a 999
  function converteAte999(num) {
    let texto = "";
    if (num >= 100) {
      if (num === 100) {
        texto += "cem";
      } else {
        texto += centenas[Math.floor(num / 100)] + " ";
      }
      num %= 100;
    }
    if (num >= 20) {
      texto += dezenas[Math.floor(num / 10)] + " ";
      num %= 10;
    } else if (num >= 10) {
      texto += especiais[num - 10] + " ";
      num = 0;
    }
    if (num > 0) {
      texto += unidades[num] + " ";
    }
    return texto.trim();
  }

  // Parte inteira (reais)
  if (valorInteiro > 0) {
    if (valorInteiro >= 1000) {
      const milhares = Math.floor(valorInteiro / 1000);
      const restoMilhares = valorInteiro % 1000;

      // Converte os milhares
      if (milhares === 1) {
        extenso += `${mil} `;
      } else {
        extenso += `${converteAte999(milhares)} ${mil} `;
      }

      // Converte o resto (centenas, dezenas, unidades)
      if (restoMilhares > 0) {
        extenso += converteAte999(restoMilhares) + " ";
      }
    } else {
      extenso += converteAte999(valorInteiro) + " ";
    }

    // Adiciona "real" ou "reais"
    extenso += valorInteiro === 1 ? real : reais;
  }

  // Parte decimal (centavos)
  if (valorDecimal > 0) {
    if (extenso !== "") extenso += " e "; // Conecta reais e centavos
    extenso += converteAte999(valorDecimal) + " ";
    extenso += valorDecimal === 1 ? centavo : centavos;
  }

  return extenso.trim();
}

/******* Comercial******/

/////Imóvel Utilizado ///

function imo_Utilizado() {
  const selectElement = document.getElementById("imovel_utilizado");
  if (!selectElement) return;

  const selectedVal = selectElement.value;
  const imo_UtilizadoContent = document.getElementById("imovel_utilizado-content");

  if (!imo_UtilizadoContent) return;

  if (selectedVal === "Atc") {
    imo_UtilizadoContent.innerHTML = `<p>
        § 1º. O LOCATÁRIO poderá optar pela extensão deste contrato se:
        </br></br>
        a. A duração inicial do contrato ou a soma das durações de contratos contínuos entre as partes atinge 5 (cinco) anos; e
        </br>
        b. O LOCATÁRIO mantenha a operação do seu comércio no mesmo setor por um período ininterrupto e mínimo de 3 (três) anos.
        </br></br>
        § 2º. No caso de dissolução da sociedade comercial devido ao falecimento de um dos sócios, o sócio remanescente assume o direito de renovação, contanto que permaneça atuando no mesmo segmento.
        </br></br>
        § 3º. O LOCADOR fica isento da obrigação de estender o contrato se:
        </br></br>
        a. O Poder Público exigir obras substanciais no imóvel, ou se forem necessárias modificações que aumentem o valor comercial ou da propriedade;
        </br>
        b. O imóvel for requisitado para uso próprio ou para relocalização de um estabelecimento comercial existente há mais de um ano, cuja maioria do capital seja de posse do LOCADOR, seu cônjuge, ascendente ou descendente.
        </br></br>
        § 4°. Nesse contexto, o imóvel não poderá ser alocado para operações comerciais no mesmo segmento do LOCATÁRIO.
        </br></br>
        § 5º. O LOCATÁRIO será compensado por perdas, danos e lucros cessantes resultantes da mudança, perda de localização e desvalorização do estabelecimento comercial, caso a extensão do contrato não seja realizada devido à oferta de um terceiro em termos mais
        favoráveis, ou se o LOCADOR não cumprir o propósito declarado ou iniciar as obras exigidas pelo Poder Público dentro de 3 (três) meses após a desocupação do imóvel.
        </br></br>
        § 6º. Após o término do período estipulado, se o LOCATÁRIO permanecer no imóvel por mais de trinta dias sem oposição do LOCADOR, será considerado que a locação foi estendida por tempo indeterminado, retendo todas as outras cláusulas e condições previamente acordadas no contrato.
        </br></br> </p>`;
  } else if (selectedVal === "ErE") {
    imo_UtilizadoContent.innerHTML = `<p> 
        § 1º. Uma vez concluído o período determinado nesta cláusula, o contrato será considerado encerrado automaticamente, não sendo necessária qualquer forma de notificação ou aviso.
        <br></br>
        § 2º. Se, após a conclusão do período de locação estabelecido, o LOCATÁRIO continuar ocupando o imóvel por mais 30 (trinta) dias e o LOCADOR não se opuser, entender-se-á que a locação foi automaticamente estendida por tempo indefinido, com a continuação dos termos previamente acordados neste contrato.
        </br></br>
        § 3º. Ao término do período contratual, se o LOCATÁRIO permanecer no imóvel além de trinta dias e não houver objeção por parte do LOCADOR, a locação será considerada automaticamente prorrogada por tempo indefinido, com a manutenção de todas as cláusulas e condições originalmente estabelecidas no contrato.
        </br></br>
        </p>`;
  } else if (selectedVal === "OST") {
    imo_UtilizadoContent.innerHTML = `<p> 
        § 1º. Uma vez concluído o período determinado nesta cláusula, o contrato será considerado encerrado automaticamente, não sendo necessária qualquer forma de notificação ou aviso.
        <br></br>
        § 2º. Se, após a conclusão do período de locação estabelecido, o LOCATÁRIO continuar ocupando o imóvel por mais 30 (trinta) dias e o LOCADOR não se opuser, entender-se-á que a locação foi automaticamente estendida por tempo indefinido, com a continuação dos termos previamente acordados neste contrato.
        <br></br>
        § 3º. Ao término do período contratual, se o LOCATÁRIO permanecer no imóvel além de trinta dias e não houver objeção por parte do LOCADOR, a locação será considerada automaticamente prorrogada por tempo indefinido, com a manutenção de todas as cláusulas e condições originalmente estabelecidas no contrato.
        <br></br>
        </p>`;
  }

  // Visual feedback: scroll to element and highlight
  imo_UtilizadoContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
  imo_UtilizadoContent.classList.add('bg-warning');
  setTimeout(() => {
    imo_UtilizadoContent.classList.remove('bg-warning');
    imo_UtilizadoContent.style.transition = "background-color 0.5s ease";
  }, 2000);
}

// Add event listener safely
if (document.getElementById("imovel_utilizado")) {
  document.getElementById("imovel_utilizado").addEventListener("change", imo_Utilizado);
}

////Area Texto Destahes Imóvel///
document
  .getElementById("des_imovel")
  .addEventListener("input", imo_DestaqueImovel);
function imo_DestaqueImovel() {
  const imo_DestaqueImovel = document.getElementById("des_imovel").value;
  document.getElementById("des_imovel_txt").innerText = imo_DestaqueImovel;
}

/////Fiador ////

function Imputar_Fiador() {
  const Nome_Fiador = document.getElementById("Nome_Fiador").value;
  document.getElementById("nome_fiador-text").innerText =
    " " + Nome_Fiador || "________________________,";
}

function Nac_Fiador() {
  const Nac_Fiador = document.getElementById("Nacionalidade_Fiador").value;
  document.getElementById("nac_fiador-text").innerText =
    " " + Nac_Fiador || "________________________,";
}

function Prof_Fiador() {
  const Prof_Fiador = document.getElementById("Profissao_Fiador").value;
  document.getElementById("prof_fiador").innerText =
    " " + Prof_Fiador || "________________________,";
}

function imputarDocFiador() {
  const input = document.getElementById("Carteira_Fi").value;
  document.getElementById("doc-textFi").innerText =
    " " + input || "________________________,";
}

function imputarOrgaoFiador() {
  const input = document.getElementById("Orgao_Fi").value;
  document.getElementById("org-textFi").innerText =
    " " + input || "________________________,";
}

function imputarCPF_Fi() {
  const input = document.getElementById("CPF_Fiador").value;
  document.getElementById("cpf-textFi").innerText =
    " " + input || "________________________,";
}

function imputarEmailFi() {
  const input = document.getElementById("Email_Fiador").value;
  document.getElementById("email-textFi").innerText =
    " " + input || "________________________,";
}

function imputarNumFi() {
  const input = document.getElementById("Numero_Fi").value;
  document.getElementById("num-textfi").innerText =
    " " + input || "________________________,";
}

function imputarCompFi() {
  const input = document.getElementById("Complemento_Fi").value;
  document.getElementById("compl-textfi").innerText = " " + input + " " || "";
}

function imputarBairroFi() {
  const input = document.getElementById("Bairro_Fi").value;
  // Try to update both correct ID and potential cached typo ID
  const el = document.getElementById("bairro-textFi");
  const elTypo = document.getElementById("bairro-texFi");

  if (el) el.innerText = " " + input || "________________________,";
  if (elTypo) elTypo.innerText = " " + input || "________________________,";
}

function Fiador_Utilizado() {
  const fiador_Utilizado = document.getElementById("garantia").value;
  const fiador_UtilizadoContent = document.getElementById("fiador_txt");

  if (fiador_Utilizado === "Outro") {
    fiador_UtilizadoContent.innerHTML = ``;
  } else if (fiador_Utilizado === "Caucao") {
    fiador_UtilizadoContent.innerHTML = ``;
  } else if (fiador_Utilizado === "Fiador") {
    fiador_UtilizadoContent.innerHTML = `<p> 
        <strong>FIADOR:</strong>
        <span id="nome_fiador-text">______________</span>,<span id="nac_fiador-text">_______________</span>,<span id="prof_fiador">________________</span>, <span class="fiador_text">Solteiro(a)</span>, <span class="dynamic-text2">Carteira de identidade (RG)</span> nº <span id="doc-textFi"></span>, 
        expedida por <span id="org-textFi">________________</span>, C.P.F. nº <span id="cpf-textFi">______________</span>, residente na <span id="rua-textFi">_______________</span>, 
        nº <span id="num-textfi">______________</span>,<span id="compl-textfi">_______________</span>,<span id="bairro-textFi">________________ </span>,<span id="cidade-textFi">________________</span>/<span id="uf-textFi">____________</span>, CEP: <span id="cep-txtFi">_________</span>.
        <br></br>
        </p>`;
  } else if (fiador_Utilizado === "Fiador") {
    fiador_UtilizadoContent.innerHTML = ``;
  }
}

async function concluir() {
  // Removido event.preventDefault() pois o botão agora é type="button"

  const conteudoContrato =
    document.getElementById("conteudoContrato").innerHTML;
  localStorage.setItem("contratoPreenchido", conteudoContrato);

  const emailInput = document.getElementById("email_contrato");
  const cpfInput = document.getElementById("cpf");

  if (!emailInput || !cpfInput) {
    console.error("Campos de email ou CPF não encontrados.");
    return;
  }

  const email = emailInput.value.trim();
  const cpf = cpfInput.value.trim();

  if (!email || !email.includes("@") || !email.includes(".")) {
    alert("Por favor, insira um email válido.");
    return;
  }

  // Validação do CPF (remove caracteres não numéricos)
  const cpfClean = cpf.replace(/\D/g, '');
  if (!cpfClean || cpfClean.length !== 11) {
    alert("Por favor, insira um CPF válido com 11 dígitos.");
    return;
  }

  // Tenta obter o nome do pagador
  let nome = "";

  // Verifica o método de pagamento e coleta o nome especifico se for PagSeguro
  const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value;

  if (paymentMethod === 'pagseguro') {
    nome = document.getElementById('pagador_nome')?.value;
    if (!nome) {
      alert("Por favor, preencha o Nome Completo para o pagamento via PagSeguro.");
      document.getElementById('pagador_nome')?.focus();
      return;
    }
  } else {
    // Lógica padrão para outros métodos
    const propSelection = document.getElementById('prop_soc')?.value;
    if (propSelection === 'PF') {
      nome = document.getElementById('Nome_Com')?.value;
    } else if (propSelection === 'MEI') {
      nome = document.getElementById('Nome_Prop')?.value;
    } else if (propSelection === 'PJ') {
      nome = document.getElementById('Nome_Soc_Prop')?.value;
    }

    if (!nome) {
      // Fallback
      nome = document.getElementById('Nome_Com')?.value || document.getElementById('Nome_Prop')?.value || document.getElementById('Nome_Soc_Prop')?.value || "Cliente LegalDocs";
    }
  }

  const telefone = document.getElementById('WhatsApp')?.value || ''; // Opcional
  console.log(" Telefone capturado (concluir):", telefone);

  try {
    const response = await fetch("/concluir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, email, conteudoContrato }),
    });

    const data = await response.json();

    if (data.id) {
      alert(
        `Esse é a chave: ${data.id} de identificação do seu contrato! Com ela você conseguirá baixar novamente o contrato.`
      );

      const texto = document.getElementById("downloads");
      if (texto) {
        texto.innerHTML = `Guarda essa chave: <strong style="color: blue;">${data.id}</strong> de identificação do seu contrato! e o email: <strong style="color: blue;">${email}</strong> para futuros downloads`;
      }

      // Passar dados completos para o pagamento
      await gerarPagamento(email, cpf, nome, telefone, data.id);
    } else {

      console.error("Erro ao concluir contrato");
      alert("Ocorreu um erro ao salvar o contrato. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao gerar pagamento:", error);
    const linkDiv = document.getElementById("link-pagamento");
    if (linkDiv) {
      linkDiv.innerHTML = "<p>Erro ao conectar com o servidor.</p>";
    } else {
      alert("Erro ao conectar com o servidor.");
    }
  }
}

async function gerarPagamento(email, cpf, nome, telefone, referenciaId) {
  console.log("Gerando pagamento para:", email);

  // Obter o método de pagamento selecionado
  const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value || 'mercadopago';
  const endpoint = paymentMethod === 'pagseguro' ? '/criar_preferencia_pagseguro' : '/criar_preferencia';

  // Preparar dados para o backend (PagBank V4 exige mais dados)
  const payload = {
    email,
    id: referenciaId, // ID do contrato como referência
    cpf: cpf ? cpf.replace(/\D/g, '') : '',
    nome: nome || 'Cliente',
    telefone: telefone ? telefone.replace(/\D/g, '') : ''
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const linkDiv = document.getElementById("link-pagamento");

    if (data.link) {
      // Redireciona para o gateway de pagamento ou exibe link
      window.open(data.link, "_blank");
      if (linkDiv) {
        const metodoTexto = paymentMethod === 'pagseguro' ? 'PagSeguro' : 'Mercado Pago';
        linkDiv.innerHTML = `<p>Pagamento via ${metodoTexto} gerado com sucesso!</p><a href="${data.link}" target="_blank" class="btn btn-primary">Clique aqui para pagar</a>`;
      }
    } else {
      if (linkDiv) {
        linkDiv.innerHTML = "<p>Erro ao gerar link de pagamento.</p>";
      }
    }
  } catch (error) {
    console.error("Erro ao gerar pagamento:", error);
    const linkDiv = document.getElementById("link-pagamento");
    if (linkDiv) {
      linkDiv.innerHTML = "<p>Erro ao gerar link de pagamento.</p>";
    }
  }
}

/*document
  .getElementById("botao-pagar")
  .addEventListener("click", gerarPagamento);*/



function resetDisplayedValues(targetIds, defaultValue = "________________________") {
  targetIds.forEach(targetId => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.innerText = `${defaultValue},`;
    } else {
      console.error(`Elemento com ID "${targetId}" não encontrado.`);
    }
  });
}

function populateDynamicContent(containerId, content) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = content;
  } else {
    console.error(`Container com ID "${containerId}" não encontrado.`);
  }
}

function generateForm(fields) {
  return fields.map(field => {
    return `
            <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                <br />
                <input class="form-control" type="${field.type || 'text'}" id="${field.id}" placeholder="${field.placeholder || ''}" onchange="${field.onChange || ''}" />
            </div>
        `;
  }).join('');
}


function proprietario_pessoa() {
  const selection = document.getElementById('prop_soc')?.value;
  const pessoaContentId = 'pessoa_soc';
  const pessoaContent2 = document.getElementById('contrato');

  // Limpar os textos exibidos no contrato
  resetDisplayedValues(["nome-text", "nac-text", "prof-text", "nome_fat-text"]);
  let fields = [];

  if (selection === 'PF') {
    fields = [
      { id: "Nome_Com", label: "Nome Completo", placeholder: "Ex: Antonio Silva", onChange: "atualizarTexto(this.id, 'nome-text')" },
      { id: "Nacionalidade", label: "Nacionalidade", placeholder: "Ex: Brasileiro", onChange: "atualizarTexto(this.id, 'nac-text')" },
      { id: "Profissao", label: "Profissão", placeholder: "Ex: Gerente", onChange: "atualizarTexto(this.id, 'prof-text')" }
    ];
  } else if (selection === 'MEI') {
    fields = [
      { id: "Nome_Prop", label: "Nome Empresarial", placeholder: "Ex: Antonio Silva 125.855.555-00", onChange: "atualizarTexto(this.id, 'nome-text')" },
      { id: "No_Fant_Prop", label: "Nome Fantasia (opcional)", placeholder: "Ex: Brilho Estrela", onChange: "atualizarTexto(this.id, 'nome_fat-text')" },
      { id: "Nac_Prop", label: "Nacionalidade", placeholder: "Ex: Brasileiro", onChange: "atualizarTexto(this.id, 'nac-text')" },
      { id: "Profissao_Prop", label: "Profissão", placeholder: "Ex: Gerente", onChange: "atualizarTexto(this.id, 'prof-text')" }
    ];
  } else if (selection === 'PJ') {
    fields = [
      { id: "Nome_Soc_Prop", label: "Razão Social", placeholder: "Ex: Padaria Estrela", onChange: "atualizarTexto(this.id, 'nome-text')" },
      { id: "Nom_Fantasia_Prop", label: "Nome Fantasia (opcional)", placeholder: "Ex: Brilho Estrela", onChange: "atualizarTexto(this.id, 'nome_fat-text')" },
      { id: "CNPJ_Prop", label: "CNPJ", placeholder: "Ex: 00.000.000/0001-00", onChange: "atualizarTexto(this.id, 'nac-text')" },
      { id: "Email_Prop", label: "Email", placeholder: "Ex: exemplo@gmail.com", onChange: "atualizarTexto(this.id, 'prof-text')" }
    ];
  }

  populateDynamicContent(pessoaContentId, generateForm(fields));



  // Função genérica para atualizar textos
  function adicionarEventoInput(campoId, classeContrato) {
    const campo = document.getElementById(campoId);
    if (campo) {
      campo.addEventListener('input', () => {
        const valor = campo.value;
        document.querySelectorAll(`.${classeContrato}`).forEach(element => {
          element.textContent = valor;
        });
      });
    }
  }

  // Adicionar eventos aos campos dinâmicos com base na seleção
  if (selection === 'PF') {
    adicionarEventoInput("Nome_Com", "nome-text");
    adicionarEventoInput("Nacionalidade", "nac-text");
    adicionarEventoInput("Profissao", "prof-text");
    pessoaContent2.innerHTML = `<p><span class="nome-text">_______________</span> ,<span Class="nac-text">_______________</span>,
            <span class="prof-text">_______________</span>, <span class="est-civil-text">Solteiro(a)</span>, 
            <span class="dynamic-text">Carteira de identidade (RG)</span> nº <span id="doc-text"> ____________</span>, 
            expedida por <span id="org-text">____________</span>, C.P.F. nº <span id="doc-prop-text">____________</span>, 
            residente na <span id="rua-text">____________</span> nº <span id="num-text">____________</span>, 
            <span id="compl-text"></span>,<span id="bairro-text">____________</span>, 
            <span id="cidade-text" >____________</span>/<span id="uf-text">____________</span>, CEP: <span id="cep-txt">____________.</span>
            </p>`;
  } else if (selection === 'MEI') {
    adicionarEventoInput("Nome_Prop", "nome-text");
    adicionarEventoInput("No_Fant_Prop", "nome_fat-text");
    adicionarEventoInput("Nac_Prop", "nac-text");
    adicionarEventoInput("Profissao_Prop", "prof-text");
    pessoaContent2.innerHTML = `<P> <span class="nome-text">_______________</span>, cujo nome Fantasia é: <span class="nome_fat-text">__________</span>,
         <span class="nac-text">_______________</span>, <span class="prof-text">_______________</span>,  
        <span class="est-civil-text">Solteiro(a)</span>, <span class="dynamic-text">Carteira de identidade (RG)</span> 
        nº <span id="doc-text"> ____________</span>, expedida por <span id="org-text"> ____________</span>,CNPJ nº <span id="doc-CNPJ-text">_____________</span>, 
        C.P.F. nº <span id="doc-prop-text">____________</span>, email:<span id="email-prop-text"></span> , residente na 
        <span id="rua-text">____________</span> nº <span id="num-text">____________</span>,  <span id="compl-text"></span>,
        <span id="bairro-text">____________</span>,<span id="cidade-text" >____________</span>/<span id="uf-text">____________</span>,
         CEP: <span id="cep-txt">____________.</span></p>`;
  } else if (selection === 'PJ') {
    adicionarEventoInput("Nome_Soc_Prop", "nome-text");
    adicionarEventoInput("Nom_Fantasia_Prop", "nome_fat-text");
    adicionarEventoInput("CNPJ_Prop", "nac-text");
    adicionarEventoInput("Email_Prop", "prof-text");
    pessoaContent2.innerHTML = `<p><span class="nome-text">_______________</span>, cujo nome Fantasia é: <span class="nome_fat-text">__________</span>, 
        CNPJ nº <span class="nac-text">_____________</span>, email: <span class="prof-text"></span>, residente na <span id="rua-text">____________</span> nº <span id="num-text">____________</span>, 
        <span id="compl-text"></span>,<span id="bairro-text">____________</span>, 
        <span id="cidade-text" >____________</span>/<span id="uf-text">____________</span>, CEP: <span id="cep-txt">____________.</span></p>
        `;
  }

  // Call propr_CPF to populate Step 3 fields immediately
  if (typeof propr_CPF === 'function') {
    propr_CPF();
  }
}
/***************/

/// Escolha do Inquilino ////
function inq_pessoa() {
  const selection = document.getElementById('inq_soc')?.value;
  const pessoaContentId = 'inquilino_pessoa';
  const pessoaContent2 = document.getElementById('contrato_Inq');

  // Limpar os textos exibidos no contrato
  resetDisplayedValues(["nome-textInq", "nac-textInq", "prof-textInq", "nome_fat-textInq"]);


  let fields = [];

  if (selection === 'PF_Inq') {
    fields = [
      { id: "Nome_Inq", label: "Nome Completo", placeholder: "Ex: Antonio Silva", onChange: "atualizarTexto(this.id, 'nome-textInq')" },
      { id: "Nac_Inq", label: "Nacionalidade", placeholder: "Ex: Brasileiro", onChange: "atualizarTexto(this.id, 'nac-textInq')" },
      { id: "Pro_Inq", label: "Profissão", placeholder: "Ex: Gerente", onChange: "atualizarTexto(this.id, 'prof-textInq')" }
    ];
  } else if (selection === 'MEI_Inq') {
    fields = [
      { id: "Nome_Emp", label: "Nome Empresarial", placeholder: "Ex: Antonio Silva 125.855.555-00", onChange: "atualizarTexto(this.id, 'nome-textInq')" },
      { id: "No_Fant_Inq", label: "Nome Fantasia (opcional)", placeholder: "Ex: Brilho Estrela", onChange: "atualizarTexto(this.id, 'nome_fat-textInq')" },
      { id: "Nac_Inq", label: "Nacionalidade", placeholder: "Ex: Brasileiro", onChange: "atualizarTexto(this.id, 'nac-textInq')" },
      { id: "Prof_Inq", label: "Profissão", placeholder: "Ex: Gerente", onChange: "atualizarTexto(this.id, 'prof-textInq')" }
    ];
  } else if (selection === 'PJ_Inq') {
    fields = [
      { id: "Nome_Soc_Inq", label: "Razão Social", placeholder: "Ex: Padaria Estrela", onChange: "atualizarTexto(this.id, 'nome-textInq')" },
      { id: "Nom_Fantasia_Inq", label: "Nome Fantasia (opcional)", placeholder: "Ex: Brilho Estrela", onChange: "atualizarTexto(this.id, 'nome_fat-textInq')" },
      { id: "CNPJ_Inq", label: "CNPJ", placeholder: "Ex: 00.000.000/0001-00", onChange: "atualizarTexto(this.id, 'nac-textInq')" },
      { id: "Email_Inq", label: "Email", placeholder: "Ex: exemplo@gmail.com", onChange: "atualizarTexto(this.id, 'prof-textInq')" }
    ];
  }

  populateDynamicContent(pessoaContentId, generateForm(fields));




  // Função genérica para atualizar textos
  function adicionarEventoInput(campoId, classeContrato) {
    const campo = document.getElementById(campoId);
    if (campo) {
      campo.addEventListener('input', () => {
        const valor = campo.value;
        document.querySelectorAll(`.${classeContrato}`).forEach(element => {
          element.textContent = valor;
        });
      });
    }
  }

  // Adicionar eventos aos campos dinâmicos com base na seleção
  if (selection === 'PF_Inq') {
    adicionarEventoInput("Nome_Inq", "nome-textInq");
    adicionarEventoInput("Nac_Inq", "nac-textInq");
    adicionarEventoInput("Pro_Inq", "prof-textInq");
    pessoaContent2.innerHTML = `<p><span class="nome-textInq">_______________</span> ,<span Class="nac-textInq">_______________</span>,
        <span class="prof-textInq">_______________</span>, <span class="est-civil-textInq">Solteiro(a)</span>, 
        <span class="dynamic-text1">arteira de identidade (RG)</span> nº <span id="doc-textInq"> ____________</span>, 
        expedida por <span id="org-textInq">____________</span>, C.P.F. nº <span id="cpf-textInq">____________</span>, 
        residente na <span id="rua-textInq">____________</span> nº <span id="num-textInq">____________</span>, 
        <span id="compl-textInq"></span>,<span id="bairro-textInq">____________</span>, 
        <span id="cidade-textInq" >____________</span>/<span id="uf-textInq">____________</span>, CEP: <span id="cep-txtInq">____________.</span>
        </p>`;
  } else if (selection === 'MEI_Inq') {
    adicionarEventoInput("Nome_Emp", "nome-textInq");
    adicionarEventoInput("No_Fant_Inq", "nome_fat-textInq");
    adicionarEventoInput("Nac_Inq", "nac-textInq");
    adicionarEventoInput("Prof_Inq", "prof-textInq");
    pessoaContent2.innerHTML = `<p><span class="nome-textInq">_______________</span>, cujo nome Fantasia é: <span class="nome_fat-textInq">__________</span>,
        <span class="nac-textInq">_______________</span>, <span class="prof-textInq">_______________</span>,  
        <span class="est-civil-textInq">Solteiro(a)</span>, <span class="dynamic-text1">Carteira de identidade (RG)</span> 
        nº <span id="doc-textInq"> ____________</span>, expedida por <span id="org-textInq"> ____________</span>,CNPJ nº <span id="doc-CNPJ-textInq">_____________</span>, 
        C.P.F. nº <span id="cpf-textInq">____________</span>, email:<span id="email_Inq"></span> , residente na 
        residente na <span id="rua-textInq">____________</span> nº <span id="num-textInq">____________</span>, 
        <span id="compl-textInq"></span>,<span id="bairro-textInq">____________</span>, 
        <span id="cidade-textInq" >____________</span>/<span id="uf-textInq">____________</span>, CEP: <span id="cep-txtInq">____________.</span></p> `;
  } else if (selection === 'PJ_Inq') {
    adicionarEventoInput("Nome_Soc_Inq", "nome-textInq");
    adicionarEventoInput("Nom_Fantasia_Inq", "nome_fat-textInq");
    adicionarEventoInput("CNPJ_Inq", "nac-textInq");
    adicionarEventoInput("Email_Inq", "prof-textInq");
    pessoaContent2.innerHTML = `<p><span class="nome-textInq">_______________</span>, cujo nome Fantasia é: <span class="nome_fat-textInq">__________</span>, 
        CNPJ nº <span class="nac-textInq">_____________</span>, email: <span class="prof-textInq"></span>, 
        residente na <span id="rua-textInq">____________</span> nº <span id="num-textInq">____________</span>, 
        <span id="compl-textInq"></span>,<span id="bairro-textInq">____________</span>, 
        <span id="cidade-textInq" >____________</span>/<span id="uf-textInq">____________</span>, CEP: <span id="cep-txtInq">____________.</span> </p>`;

  }

  // Call Inq_CPF to populate respective fields immediately
  if (typeof Inq_CPF === 'function') {
    Inq_CPF();
  }
}




/*********************/
///Escolha Doc e Email ////


function propr_CPF() {
  const selection = document.getElementById('prop_soc').value;
  const pessoaContent = document.getElementById('pes_txt');

  pessoaContent.innerHTML = '';

  if (selection === 'PF') {
    pessoaContent.innerHTML = `
        <div class="form-group">
            <label for="Doc_proprietario">CPF</label>
            <br>
            <input  class="form-control" type="text" name="Doc_proprietario" id="Doc_proprietario" placeholder="555.555.555-00" oninput="imputarDocPro()" inputmode="numeric">
        </div>
        <div class="form-group">
            <label for="Email_proprietario">Email (opcional)</label>
            <br>
            <input class="form-control" type="email" name="Email_proprietario" id="Email_proprietario" placeholder="Ex: exemplo@gmail.com" oninput="imputarEmailpro()">
        </div>
        `;
  } else if (selection === 'MEI') {
    pessoaContent.innerHTML = `
        <div class="form-group">
            <label for="Doc_CNPJ">CNPJ</label>
            <br>
            <input class="form-control" type="text" name="Doc_CNP_PRO" id="Doc_CNPJ_pro" placeholder="10.555.555/0001-05" oninput="imputarDocCNPJ()" inputmode="numeric">
        </div>
        <div class="form-group">
            <label for="Doc_proprietario">CPF</label>
            <br>
            <input class="form-control" type="text" name="Doc_proprietario" id="Doc_proprietario" placeholder="555.555.555-00" oninput="imputarDocPro()" inputmode="numeric">
        </div>
        <div class="form-group">
            <label for="Email_proprietario">Email (opcional)</label>
            <br>
            <input class="form-control" type="email" name="Email_proprietario" id="Email_proprietario" placeholder="Ex: exemplo@gmail.com" oninput="imputarEmailpro()">
        </div>
        `;
  } else if (selection === 'PJ') {
    // Existing PJ logic from previous code
  }


}


///////////////

/**************************/
///Escolha Doc e Email Inquilino ////


function Inq_CPF() {
  const selection = document.getElementById('inq_soc').value;
  const pessoaContent = document.getElementById('inq_txt');

  pessoaContent.innerHTML = '';

  if (selection === 'PF_Inq') {
    pessoaContent.innerHTML = `
            <div class="form-group">
                <label for="CPF_Inquilino">CPF</label>
                <br>
                <input class="form-control" type="text" name="CPF_Inquilino" id="CPF_Inquilino" placeholder="555.555.555-00" oninput="imputarCPFInq()" inputmode="numeric">
            </div>
            <div class="form-group">
                <label for="Email_Inquilino">Email (opcional)</label>
                <br>
                <input class="form-control" type="email" name="Email_Inquilino" id="Email_Inquilino" placeholder="Ex: exemplo@gmail.com" oninput="imputarEmailInq()">
            </div>
        `;
  } else if (selection === 'MEI_Inq') {
    pessoaContent.innerHTML = `
        <div class="form-group">
            <label for="CNPJ_Inq">CNPJ</label>
            <br>
            <input class="form-control" type="text" name="CNPJ_Inq" id="CNPJ_Inq" placeholder="10.555.555/0001-05" oninput="imputarCNPJInq()" inputmode="numeric">
        </div>
         <div class="form-group">
            <label for="CPF_Inquilino">CPF</label>
            <br>
            <input class="form-control" type="text" name="CPF_Inquilino" id="CPF_Inquilino" placeholder="555.555.555-00" oninput="imputarCPFInq()" inputmode="numeric">
        </div>
        <div class="form-group">
            <label for="Email_Inquilino">Email (opcional)</label>
            <br>
            <input class="form-control" type="email" name="Email_Inquilino" id="Email_Inquilino" placeholder="Ex: exemplo@gmail.com" oninput="imputarEmailInq()">
        </div>
        `;
  } else if (selection === 'PJ_Inq') {
    // Existing PJ logic from previous code
  }


}
/***********/

///////////////////////////////////
function updateText(selectId) {
  // Captura o elemento <select>
  const select = document.getElementById(selectId);

  // Verifica se o elemento existe
  if (!select) return;

  // Função auxiliar para obter o texto baseado no valor selecionado
  const getTextByValue = (value) => {
    switch (value) {
      case 'rg':
        return 'Carteira de Identidade (RG)';
      case 'cnh':
        return 'Carteira Nacional de Habilitação (CNH)';
      case 'iden':
        return 'Identidade Funcional';
      case 'ctps':
        return 'Carteira de Trabalho e Previdência Social (CTPS)';
      default:
        return 'Passaporte';
    }
  };

  // Identifica os elementos a serem atualizados e define o texto
  let elements, text;

  if (selectId === "Documento") {
    elements = document.querySelectorAll('.dynamic-text');
    text = getTextByValue(select.value);
  } else if (selectId === "Doc_Inquilino") {
    elements = document.querySelectorAll('.dynamic-text1');
    text = getTextByValue(select.value);
  } else if (selectId === "Doc_Fiador") {
    elements = document.querySelectorAll('.dynamic-text2');
    text = getTextByValue(select.value);
  } else {
    return; // Caso não corresponda a nenhum caso, sai da função
  }

  // Atualiza o conteúdo dos elementos encontrados
  elements.forEach(element => {
    element.textContent = text;
  });
}


//###################################################################
// Consulta CEP
// Função para Loader Premium
function createLoader() {
  if (!document.getElementById('global-spinner-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'global-spinner-overlay';
    overlay.className = 'spinner-overlay';

    // Estrutura da mensagem de loading 
    overlay.innerHTML = `
      <div class="loader-card">
        <div class="spinner"></div>
        <div class="loading-text">Processando...</div>
        <div class="loading-subtext">Aguarde enquanto consultamos os dados.</div>
      </div>
    `;

    document.body.appendChild(overlay);
  }
}

function showLoader(message = "Processando...", subtext = "Aguarde um momento.") {
  createLoader();
  const overlay = document.getElementById('global-spinner-overlay');
  const textEl = overlay.querySelector('.loading-text');
  const subtextEl = overlay.querySelector('.loading-subtext');

  if (textEl) textEl.textContent = message;
  if (subtextEl) subtextEl.textContent = subtext;

  if (overlay) {
    overlay.style.display = 'flex';
    // Pequeno atraso para permitir que a transição CSS funcione
    setTimeout(() => {
      overlay.classList.add('show');
    }, 10);
  }
}

function hideLoader() {
  const overlay = document.getElementById('global-spinner-overlay');
  if (overlay) {
    overlay.classList.remove('show');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300); // Wait for transition
  }
}

// Sistema de Notificações (Toast)
function showNotification(title, message, type = 'info') {
  // Garantir que container existe
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Ícones baseados no tipo
  const icons = {
    success: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    error: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
    warning: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    info: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
  };

  const toast = document.createElement('div');
  toast.className = `custom-toast ${type}`;
  toast.innerHTML = `
        <div class="toast-icon">${icons[type] || icons.info}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-close" onclick="this.parentElement.remove()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
    `;

  container.appendChild(toast);

  // Auto remove após 5 segundos
  setTimeout(() => {
    toast.style.animation = 'fadeOutLeft 0.4s forwards';
    toast.addEventListener('animationend', () => {
      if (toast.parentElement) toast.remove();
    });
  }, 5000);
}

// Consulta CEP
async function buscarEndereco(cepId, ruaId, complId, bairroId, cidadeId, ufId, tipo) {
  const cep = document.getElementById(cepId).value.trim();
  const cepFormatado = cep.replace(/\D/g, '');

  if (!cep) {
    showNotification('Campo Vazio', 'Por favor, digite um CEP para consultar.', 'warning');
    return;
  }

  if (!/^\d{8}$/.test(cepFormatado)) {
    showNotification('Formato Inválido', 'O CEP deve conter 8 dígitos numéricos.', 'warning');
    return;
  }

  showLoader('Buscando Endereço', 'Consultando base de dados dos correios...');

  // Setup abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`, {
      signal: controller.signal
    });

    // Clear timeout on response
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Erro ao acessar API: ${response.status}`);
    }
    const data = await response.json();

    if (data.erro) {
      showNotification('CEP não encontrado', 'O CEP informado não retornou resultados.', 'error');
      return;
    }

    const logradouro = data.logradouro?.trim() || '';
    const bairro = data.bairro?.trim() || '';
    const cidade = data.localidade?.trim() || '';
    const uf = data.uf?.trim() || '';
    const cepResult = data.cep?.trim() || '';

    // Preencher campos
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    setVal(ruaId, logradouro);
    setVal(bairroId, bairro);
    setVal(cidadeId, cidade);
    setVal(ufId, uf);


    // Atualizar textos diretamente
    const safeSetText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.innerText = text || '________________________';
    };

    if (tipo === 'proprietario') {
      safeSetText('rua-text', logradouro);
      safeSetText('bairro-text', bairro);
      safeSetText('cidade-text', cidade);
      safeSetText('uf-text', uf);
      safeSetText('cep-txt', cepResult);

    } else if (tipo === 'inquilino') {
      safeSetText('rua-textInq', logradouro);
      safeSetText('bairro-textInq', bairro);
      safeSetText('cidade-textInq', cidade);
      safeSetText('uf-textInq', uf);
      safeSetText('cep-txtInq', cepResult);

    } else if (tipo === 'Imovel') {
      safeSetText('rua-textImovel', logradouro);
      safeSetText('bairro-textImovel', bairro);
      safeSetText('cidade-textImovel', cidade);
      safeSetText('uf-textImovel', uf);
      /*safeSetText('cep-txtImovel', cepResult);*/
    } else if (tipo === 'Fiador') {
      safeSetText('rua-textFi', logradouro);
      safeSetText('bairro-textFi', bairro);
      safeSetText('cidade-textFi', cidade);
      safeSetText('uf-textFi', uf);
      safeSetText('cep-txtFi', cepResult);
    }

    showNotification('Sucesso', 'Endereço encontrado e preenchido!', 'success');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Timeout na busca de CEP');
      showNotification('Tempo Esgotado', 'A consulta demorou muito. Verifique sua conexão.', 'error');
    } else {
      console.error('Erro ao buscar endereço:', error);
      showNotification('Erro de Conexão', 'Não foi possível buscar o endereço. Tente novamente.', 'error');
    }
  } finally {
    hideLoader();
  }
}



//// Matricula Formulario sim ou não////


function Matricula_Imovel() {
  const selection = document.getElementById('matricula').value;
  const matriculaContent = document.getElementById('matricula-content');

  // Limpar o conteúdo da div antes de adicionar novos elementos
  matriculaContent.innerHTML = '';

  // Verificar a seleção e adicionar os campos correspondentes
  if (selection === 'SM') {
    matriculaContent.innerHTML = `
            <div>
                <label for="num_Mat">Número da Matrícula</label>
                <input class="form-control" type="number" name="num_Mat" id="num_Mat" placeholder="Ex: número">
            </div>
            <div class="mt-3">
                <label for="Cartorio">Cartório de Registro</label>
                <input class="form-control" type="text" name="Cartorio" id="Cartorio" placeholder="Ex: 1º Cartório de Imóvies">
            </div>
        `;

    // Adicionar eventos aos campos gerados dinamicamente
    document.getElementById("num_Mat").addEventListener("input", () => {
      atualizarTexto("num_Mat", "Num_Mat-Text");
    });

    document.getElementById("Cartorio").addEventListener("input", () => {
      atualizarTexto("Cartorio", "Cat_Mat-Text");
    });
  } else if (selection === 'NM') {
    matriculaContent.innerHTML = '';
  }
}

/////**********************************************************////
/// Contrato Prazo  Formulário///
function contratoprazo() {
  const selection = document.getElementById('prazo').value;
  const prazoContent = document.getElementById('prazo-content');

  // Limpar o conteúdo da div antes de adicionar novos elementos
  prazoContent.innerHTML = '';

  // Verificar a seleção e adicionar os campos correspondentes
  if (selection === 'PD') {
    prazoContent.innerHTML = `
            <div>
                <label>Por quantos meses o imóvel será alugado?</label>
                <input class="form-control" type="number" name="mes" id="mes" placeholder="Ex: 12">
            </div>
            <div class="mt-3">
                <label>Data de início da locação</label>
                <input class="form-control" type="date" name="data_PD" id="data_PD" placeholder="dd/mm/yy">
            </div>
            <div class="mt-3">
                <label>Este contrato permitirá o locatário sublocar o imóvel?</label>
                <select class="form-control" id="PD_select">
                    <option value="siSub">Sim</option>
                    <option value="naSub">Não</option>
                </select>
            </div>
        `;
    // Atualiza o texto do contrato para Prazo Determinado
    document.getElementById('prazo_txt').innerHTML = `<p>A duração da locação do imóvel é de <span id="mes-txt">____________ </span>meses, iniciando em <span id="data-text"></span>.</p>`;

    document.getElementById("mes").addEventListener("input", () => {
      const meses = document.getElementById("mes").value;
      document.getElementById('mes-txt').innerText = meses + " ";

    });

    document.getElementById("data_PD").addEventListener("input", () => {
      const dataValor = document.getElementById("data_PD").value;
      const dataFormatada = formatarData(dataValor);
      atualizarData(dataFormatada, "data-text");
    });
    document.getElementById("PD_select").addEventListener("change", sublocar_Imovel);


  } else if (selection === 'PI') {
    // Atualiza o texto do contrato para Prazo Indeterminado
    document.getElementById('prazo_txt').innerHTML = `<p>Este contrato de locação terá prazo indeterminado, iniciando em <span id="data-text1"></span>.</p>`;

    prazoContent.innerHTML = `
            <form>
                <div>
                    <label>Data de início da locação</label>
                    <br>
                    <input class="form-control" type="date" name="data_PI" id="data_PI" placeholder="dd/mm/yy">
                </div>
                <div>
                    <label>Este contrato permitirá o locatário sublocar o imóvel?</label>
                    <br>
                    <select class="form-control" id="PI_select"  onchange="sublocar_Imovel()">
                         <option value="" selected disabled>Selecione</option>
                        <option value="ssub">Sim</option>
                        <option value="nsub">Não</option>
                    </select>
                </div>
            </form>
            
        `;

    document.getElementById("data_PI").addEventListener("input", () => {
      const dataValor = document.getElementById("data_PI").value;
      const dataFormatada = formatarData(dataValor);
      atualizarData(dataFormatada, "data-text1");
    });

    document.getElementById("PI_select").addEventListener("change", sublocar_Imovel);
  } else {
    document.getElementById('prazo_txt').innerHTML = '<p>A duração da locação deste imóvel é de ____________meses, iniciando-se em ____________.</p>';
  }

  // Função para formatar a data no formato DD/MM/YYYY (Corrigido para evitar problemas de fuso horário)
  function formatarData(dataISO) {
    if (!dataISO) return '____________';  // Retorna '____________' se não houver data
    const partes = dataISO.split("-");
    if (partes.length !== 3) return dataISO;
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
  }

  // Função para atualizar o texto no elemento com id correspondente
  function atualizarData(valor, idElemento) {
    const spanElement = document.getElementById(idElemento);
    if (spanElement) {
      spanElement.innerText = valor;
    }
  }
}


/// Prazo do contrato ///



function sublocar_Imovel() {
  const selectId = document.querySelector("#PD_select, #PI_select"); // Seleciona qualquer select 
  const sublocar_txt = document.getElementById("sublocar");

  if (!selectId || !sublocar_txt) {
    console.error('Elemento com ID "sublocar" não encontrado.');
    return;
  }

  const sublocar_imo = selectId.value; // Obtém o valor selecionado no select
  console.log("Valor selecionado:", sublocar_imo);

  if (sublocar_imo === "siSub" || sublocar_imo === "ssub") {
    sublocar_txt.innerHTML = `<p>A finalidade desta LOCAÇÃO é estritamente para o uso residencial do imóvel. Contudo, é concedido ao LOCATÁRIO o direito de sublocar o imóvel, sempre com a expressa aprovação do LOCADOR<\p> <br><br>
        <p>§ 1. Em caso de sublocação, o LOCADOR terá total acesso e direito de inspeção dos termos estabelecidos entre o LOCATÁRIO e o terceiro.</p> <br>
        <p>§ 2. O LOCATÁRIO, antes de proceder à sublocação, deve, em todas as circunstâncias, informar sua intenção ao LOCADOR, fornecendo aviso prévio de no mínimo 30 (trinta) dias antes do início da vigência do novo contrato.</p><br><br>
        <p>§ 3. O valor da sublocação, em nenhuma situação, poderá exceder o valor do aluguel estabelecido neste contrato. <br><br></p>`;
  } else if (sublocar_imo === "naSub" || sublocar_imo === "nsub") {
    sublocar_txt.innerHTML = `<p>O objetivo desta LOCAÇÃO é estritamente para a utilização do imóvel para fins de moradia, sendo vedado ao LOCATÁRIO sublocá-lo ou utilizá-lo de maneira diferente do estabelecido, a menos quehaja consentimento explícito do LOCADOR. <br><br></p>`;
  };

}


//////*******************************************************/

//////Garantia ///////

function garantia_cont() {
  const selection = document.getElementById('garantia').value;
  const garantiaContent = document.getElementById('garantia-content');
  const garantiaContent2 = document.getElementById('garantia-txt');

  garantiaContent.innerHTML = '';
  garantiaContent2.innerHTML = '';

  // Verificar a seleção e adicionar os campos correspondentes
  if (selection === 'Caucao') {
    garantiaContent.innerHTML = `
                <div>
                    <label>Qual a garantia</label>
                    <input class="form-control" type="number" name="valor_garantia" id="valor_garantia" placeholder="Ex: R$">
                </div>
        `;
    document.getElementById('valor_garantia').addEventListener('input', vl_garantia);

    function vl_garantia() {
      const valor_g = parseFloat(document.getElementById('valor_garantia').value);
      const valorExtenso = numeroParaExtenso(valor_g);
      document.getElementById("garantia_txt").innerHTML =
        isNaN(valor_g)
          ? "R$ 0,00 (zero reais)"
          : `${valor_g.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} (${valorExtenso})`;
    }
    garantiaContent2.innerHTML = `
            <p>O LOCATÁRIO, para garantia do fiel cumprimento das obrigações ora pactuadas, depositará na conta do LOCADOR, a título de caução, a quantia de <span id="garantia_txt">R$ 0,00 (zero reais)</span>.<br><br>
            § 1º. Este pagamento será efetuado da mesma forma que a locação, diretamente ao LOCADOR ou a terceiros que tenham a devida autorização deste. <br><br>
            § 2º. O depósito da caução deverá ser realizado no ato da assinatura deste contrato, sendo que a falta do depósito da caução dará ao LOCADOR o direito de não efetivar a entrega do imóvel ao LOCATÁRIO. <br><br>
            § 3º. Após o término da locação e com todas as obrigações adequadamente atendidas, o LOCATÁRIO estará habilitado a retirar o montante correspondente, incluindo possíveis benefícios resultantes, como juros e rendimentos. <br><br>
            § 4º. A critério das partes envolvidas, o montante utilizado como caução pode ser destinado ao pagamento de aluguéis pendentes pelo LOCATÁRIO.</p>`;

  } else if (selection === 'Fiador') {
    garantiaContent.innerHTML = `
                <div>
                    <label  for="fianca">Este contrato permitirá o locatário sublocar o imóvel?</label>
                    <select class="form-control" id="fianca">
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </div>
                <div class="mt-3">
                    <label for="valor_F">Existirá um valor limite para fiança?</label>
                    <input class="form-control" type="text" name="valor_F" id="valor_F" placeholder="Se não , não digitar o valor.">
                </div>
        `;

    document.getElementById('fianca').addEventListener('change', atualizaFiador);
    document.getElementById('valor_F').addEventListener('input', atualizaFiador);

    function atualizaFiador() {
      const valorFi = parseFloat(document.getElementById('valor_F').value);
      const valorExtenso = numeroParaExtenso(valorFi);
      const fianca = document.getElementById('fianca').value;

      if (fianca === "sim") {
        garantiaContent2.innerHTML = `
                    <p>O FIADOR, já qualificado anteriormente, concorda com as condições estabelecidas neste contrato e se estabelece também como principal responsável, comprometendo-se com o cumprimento integral do presente sem exceção de quaisquer cláusulas.<br><br> 
                    § 1º. O FIADOR assegura o cumprimento dos compromissos tomados pelo afiançado até o montante de <span>${isNaN(valorFi) ? "R$ 0,00 (zero reais)" : `${valorFi.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} (${valorExtenso})`}</span>, e em nenhuma circunstância será compelido a assumir responsabilidades que ultrapassem esse valor.<br><br> 
                    § 2º. O FIADOR renúncia explicitamente aos benefícios estipulados nos artigos 827, 828, 829, 830, 831, 832, 833, 834, 835 e 836 do Código Civil Brasileiro.<br><br> 
                    § 3º. Se a locação for prolongada por prazo indeterminado, o FIADOR terá que comunicar ao LOCADOR se pretende se desvincular do compromisso da fiança. Depois de notificar o LOCADOR, o FIADOR ainda ficará responsável pelas consequências da fiança por um período de 120 (cento e vinte) dias.<br><br>
                    § 4°. O LOCADOR tem o direito de solicitar ao LOCATÁRIO que forneça uma nova garantia dentro de 30 (trinta) dias nas seguintes circunstâncias:<br><br>
                    I- Quando for decretada judicialmente a ausência, interdição, recuperação judicial, falência ou insolvencia do FIADOR; <br><br>
                    II - Em caso de falecimento do FIADOR; <br><br>
                    III - Se ocorrer a venda ou encargo de todos os bens imóveis do FIADOR ou se ele mudar de endereço sem notificar previamente o LOCADOR;</p>`;
      } else if (fianca === "nao") {
        garantiaContent2.innerHTML = `
                    <p>O FIADOR, já qualificado anteriormente, concorda com as condições estabelecidas neste contrato e se estabelece também como principal responsável, comprometendo-se com o cumprimento integral do presente sem exceção de quaisquer cláusulas.<br><br> 
                    § 1º. O FIADOR assegura o cumprimento de todos os compromissos tomados pelo afiançado.<br><br> 
                    § 2º. O FIADOR renúncia explicitamente aos benefícios estipulados nos artigos 827, 828, 829, 830, 831, 832, 833, 834, 835 e 836 do Código Civil Brasileiro.<br><br> 
                    § 3º. Se a locação for prolongada por prazo indeterminado, o FIADOR terá que comunicar ao LOCADOR se pretende se desvincular do compromisso da fiança. Depois de notificar o LOCADOR, o FIADOR ainda ficará responsável pelas consequências da fiança por um período de 120 (cento e vinte) dias.<br><br>
                    § 4°. O LOCADOR tem o direito de solicitar ao LOCATÁRIO que forneça uma nova garantia dentro de 30 (trinta) dias nas seguintes circunstâncias:<br><br>
                    I- Quando for decretada judicialmente a ausência, interdição, recuperação judicial, falência ou insolvencia do FIADOR; <br><br>
                    II - Em caso de falecimento do FIADOR; <br><br>
                    III - Se ocorrer a venda ou encargo de todos os bens imóveis do FIADOR ou se ele mudar de endereço sem notificar previamente o LOCADOR;</p>`;
      }
    }

    // Inicializa o texto do contrato
    atualizaFiador();

  } else if (selection === 'Seguro') {
    garantiaContent.innerHTML = `
                <div>
                    <label>Nome da seguradora</label>
                    <input class="form-control" type="text" name="Seguro_Nome" id="Seguro_Nome" placeholder="Ex: Porto Seguro">
                </div>
                <div class="mt-3">
                    <label>Existirá um valor limite para fiança?</label>
                    <input class="form-control" type="number" name="Seg_Val" id="Seg_Val" placeholder="R$">
                </div>
        `;
    document.getElementById('Seguro_Nome').addEventListener('input', vl_Seguro);
    document.getElementById('Seg_Val').addEventListener('input', vl_Seguro);

    function vl_Seguro() {
      const nome = document.getElementById("Seguro_Nome").value;
      document.getElementById("nome_seg").innerHTML = nome;
      const valor_seg = parseFloat(document.getElementById("Seg_Val").value);
      const valorExtenso = numeroParaExtenso(valor_seg);
      document.getElementById("SeguroVl_txt").innerHTML =
        isNaN(valor_seg)
          ? "R$ 0,00 (zero reais)"
          : `${valor_seg.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} (${valorExtenso})`;
    }
    garantiaContent2.innerHTML = `
            <p>Para garantir o fiel cumprimento das obrigações deste contrato, o LOCATÁRIO contratará um seguro de fiança locatícia com a empresa 
            <span id="nome_seg"></span> no valor de <span id="SeguroVl_txt">R$ 0,00 (zero reais)</span>. A cópia da apólice de seguro está anexa a este contrato. <br><br>
            Parágrafo único. O seguro fiança abrange a totalidade das obrigações do LOCATÁRIO e o LOCADOR fica autorizado a acioná-lo em caso de inadimplência ou danos ao imóvel.</p>`;

    // Inicializa o texto do contrato
    vl_Seguro();

  } else if (selection === 'Outro') {
    garantiaContent.innerHTML = '';
    garantiaContent2.innerHTML = `
            <p>Na ausência de uma garantia real previamente estabelecida, ambas as partes se comprometem a entrar em negociações de boa-fé, buscando alternativas que atendam às necessidades e interesses de cada uma, de forma a assegurar a execução justa e equitativa do presente acordo.</p>`;
  }
}


function multa_clausula() {
  const selection = document.getElementById('clausula').value;
  const clausulaContent = document.getElementById('clausula-content');
  const clausulaContent2 = document.getElementById('clausula-txt');

  // Limpar o conteúdo da div antes de adicionar novos elementos
  clausulaContent.innerHTML = '';
  clausulaContent2.innerHTML = '';

  // Verificar a seleção e adicionar os campos correspondentes
  if (selection === 'NC') {
    clausulaContent.innerHTML = ` `;
    clausulaContent2.innerHTML = `<p>A parte que não cumprir qualquer das obrigações contidas neste contrato será responsável pelo pagamento de indenização à parte prejudicada, abrangendo não apenas perdas e danos diretos, mas também lucros cessantes, danos indiretos, e quaisquer outras formas de prejuízo financeiro ou moral que possam ser atribuídos ao descumprimento. Adicionalmente, a parte em falta poderá estar sujeita a sanções adicionais conforme a legislação e os termos contratuais.
    <br><br>
    § 1º. Em caso de violação substancial deste contrato, a parte prejudicada tem o direito de rescindir o contrato imediatamente e sem a necessidade de qualquer comunicação prévia.
    <br><br>
    § 2º. A tolerância por qualquer das partes quanto ao descumprimento de uma ou mais cláusulas deste contrato não constitui renúncia, novação, ou de qualquer forma altera os termos aqui acordados.</p>`;
  } else if (selection === 'SC') {
    clausulaContent.innerHTML = `
            <form>
                <label for="valor_multa">Valor da multa de descumprimento </label>
                </br>
                <input type="number" name="valor_multa" id="valor_multa" placeholder="R$" >
            </form>
        `;
    document.getElementById('valor_multa').addEventListener('change', clausula_multa);

    function clausula_multa() {
      const valor_multa = document.getElementById("valor_multa").value;
      const valorExtenso = numeroParaExtenso(valor_multa);
      document.getElementById("clausula_txt").innerHTML = `${valor_multa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} (${valorExtenso})`;
    }
    clausulaContent2.innerHTML = `<p>As partes acordam o pagamento da multa no valor de R$ <span id="clausula_txt"></span>, a ser aplicada à parte que infringir qualquer uma das cláusulas contidas neste contrato, exceto nas hipóteses previstas na Cláusula 11ª.</p>`;
  }
}

function prazo_multa() {
  const selection = document.getElementById('multa_prazo').value;
  const multaContent = document.getElementById('multa_prazo-content');
  const multaContent2 = document.getElementById('multa-txt');

  // Limpar o conteúdo da div antes de adicionar novos elementos
  multaContent.innerHTML = '';
  multaContent2.innerHTML = '';

  // Verificar a seleção e adicionar os campos correspondentes
  if (selection === 'NP') {
    multaContent.innerHTML = ``;
    multaContent2.innerHTML = `<p>Caso o LOCATÁRIO rescinda o contrato antes do término do prazo acordado, este pode ser responsabilizado por eventuais perdas e danos.</p>`;
  } else if (selection === 'SP') {
    multaContent.innerHTML = `
            <form>
                <label for="romp">Valor da multa em caso de rompimento</label>
                </br>
                <input type="number" name="romp" id="romp" placeholder="R$">
            </form>
        `;
    document.getElementById('romp').addEventListener('change', vl_romp);
    function vl_romp() {
      const val_romp = document.getElementById("romp").value;
      const valorExtenso = numeroParaExtenso(val_romp);
      document.getElementById("romp_txt").innerHTML = `${val_romp.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} (${valorExtenso})`;
    }
    multaContent2.innerHTML = `<p>Se o LOCATÁRIO decidir rescindir o contrato antecipadamente, ele deverá pagar ao LOCADOR uma multa no valor de R$ <span id="romp_txt"></span>. Além disso, o LOCATÁRIO pode ser responsabilizado por eventuais perdas e danos.</p>`;
  }
}


document.addEventListener('DOMContentLoaded', function () { if (document.getElementById('prop_soc') && document.getElementById('prop_soc').value) { proprietario_pessoa(); propr_CPF(); } if (document.getElementById('inq_soc') && document.getElementById('inq_soc').value) { inq_pessoa(); Inq_CPF(); } });

function togglePagSeguroField() {
  const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value;
  const infoDiv = document.getElementById("pagseguro-info");
  if (infoDiv) {
    if (paymentMethod === "pagseguro") {
      infoDiv.classList.remove("d-none");
    } else {
      infoDiv.classList.add("d-none");
    }
  }
}
