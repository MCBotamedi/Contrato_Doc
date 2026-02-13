
// ========================================
// FORMATAÇÃO AUTOMÁTICA DE CPF, CNPJ, CEP e RG
// ========================================

// Função para formatar RG: dd.ddd.ddd-dd
function formatarRG(valor) {
    valor = valor.replace(/\D/g, ''); // Remove tudo o que não é dígito
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1-$2');
    return valor;
}

// Função para formatar CEP: dd.ddd-ddd
function formatarCEP(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1-$2');
    return valor;
}

// Função para formatar CPF
function formatarCPF(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return valor;
}

// Função para formatar CNPJ
function formatarCNPJ(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    return valor;
}

// Função para formatar Telefone (Celular ou Fixo)
function formatarTelefone(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    return valor;
}

// Configuração dos campos e seus formatos
const fieldFormats = {
    'rg': ['Carteira', 'Cart_Inquilino', 'Carteira_Fi'],
    'cep': ['CEP_proprietario', 'CEP_Inquilino', 'CEP_Imovel', 'CEP_Fi'],
    'cpf': ['CPF_Fiador', 'cpf', 'cpf_Tes1', 'cpf_Tes2', 'Doc_proprietario', 'CPF_Inquilino'],
    'cnpj': ['Doc_CNPJ_pro', 'CNPJ_Inq', 'CNPJ_Prop'],
    'tel': ['WhatsApp']
};

// Event Delegation para lidar com campos dinâmicos
document.addEventListener('input', function (e) {
    const targetId = e.target.id;
    if (!targetId) return;

    if (fieldFormats.rg.includes(targetId)) {
        e.target.value = formatarRG(e.target.value);
    } else if (fieldFormats.cep.includes(targetId)) {
        e.target.value = formatarCEP(e.target.value);
    } else if (fieldFormats.cpf.includes(targetId)) {
        e.target.value = formatarCPF(e.target.value);
    } else if (fieldFormats.cnpj.includes(targetId)) {
        e.target.value = formatarCNPJ(e.target.value);
    } else if (fieldFormats.tel.includes(targetId)) {
        e.target.value = formatarTelefone(e.target.value);
    }
}, true); // Use capture phase to ensure formatting runs before other handlers
