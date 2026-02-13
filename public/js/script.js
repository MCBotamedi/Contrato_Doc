document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const steps = document.querySelectorAll('.form-step');

    if (!steps.length) {
        return;
    }

    let currentStep = 0; // Etapa atual
    let isPJ = false, isPJ1 = false, isFi = false; // Flag para identificar se é Pessoa Jurídica

    const propSocSelect = document.getElementById('prop_soc');
    if (propSocSelect) {
        propSocSelect.addEventListener('change', () => {
            isPJ = propSocSelect.value === 'PJ';
        });
    }

    const inqSocSelect = document.getElementById('inq_soc');
    if (inqSocSelect) {
        inqSocSelect.addEventListener('change', () => {
            isPJ1 = inqSocSelect.value === 'PJ_Inq';
        });
    }

    const garantiaSelect = document.getElementById('garantia');
    if (garantiaSelect) {
        const updateFiadorFlag = () => {
            isFi = garantiaSelect.value !== 'Fiador';
        };

        updateFiadorFlag();
        garantiaSelect.addEventListener('change', updateFiadorFlag);
    }

    const alertContainer = document.getElementById('alert-container');

    const showAlert = (message, type = 'danger') => {
        // Tenta usar a notificação toast mais bonita do contract_logic.js se estiver disponível
        if (typeof showNotification === 'function') {
            const toastType = type === 'danger' ? 'error' : type;
            const title = type === 'danger' ? 'Atenção' : 'Sucesso';
            showNotification(title, message, toastType);
            return;
        }

        if (!alertContainer) {
            window.alert(message);
            return;
        }

        alertContainer.innerHTML = `
          <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert" style="border-left: 5px solid #dc3545;">
              <i class="fas fa-exclamation-circle mr-2"></i>
              ${message}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
      `;

        // Auto remove após 5 segundos
        setTimeout(() => {
            const alert = alertContainer.querySelector('.alert');
            if (alert) {
                // Se jQuery estiver disponível (Bootstrap 4 depende dele)
                if (typeof $ !== 'undefined') {
                    $(alert).alert('close');
                } else {
                    alert.remove();
                }
            }
        }, 5000);
    };

    const stepValidationSelector = 'input:not([data-optional="true"]):not([type="button"]):not([type="submit"]):not([type="reset"]), select:not([data-optional="true"]), textarea:not([data-optional="true"])';

    const validateCurrentStep = () => {
        const currentStepEl = steps[currentStep];
        if (!currentStepEl) {
            return true;
        }

        const fields = currentStepEl.querySelectorAll(stepValidationSelector);
        const radioGroups = new Map();

        for (const field of fields) {
            if (field.disabled || field.type === 'hidden') {
                continue;
            }

            if (field.offsetParent === null) {
                continue;
            }

            if (field.type === 'radio' || field.type === 'checkbox') {
                const group = radioGroups.get(field.name) || [];
                group.push(field);
                radioGroups.set(field.name, group);
                continue;
            }

            const value = field.value ? field.value.trim() : '';
            if (!value) {
                if (typeof field.reportValidity === 'function') {
                    field.reportValidity();
                }
                field.focus();
                showAlert('Por favor, preencha todos os campos obrigatórios.');
                return false;
            }
        }

        for (const group of radioGroups.values()) {
            if (!group.length) {
                continue;
            }

            if (!group.some(({ checked }) => checked)) {
                group[0].focus();
                showAlert('Por favor, selecione uma das opções obrigatórias.');
                return false;
            }
        }

        return true;
    };

    const updateStep = (newStep) => {
        steps[currentStep].classList.add('d-none');
        steps[newStep].classList.remove('d-none');
        currentStep = newStep;
        scrollToContractStep(newStep);
    };

    const scrollToContractStep = (stepIndex) => {
        const isCommercial = document.getElementById('imovel_utilizado') !== null;
        let targetId = '';

        if (isCommercial) {
            const comMapping = {
                0: 'contrato',
                1: 'contrato',
                2: 'contrato',
                3: 'contrato',
                4: 'contrato_Inq',
                5: 'contrato_Inq',
                6: 'contrato_Inq',
                7: 'contrato_Inq',
                8: 'rua-textImovel',
                9: 'descricao_Texarea',
                10: 'des_imovel_txt', // Detalhes 2
                11: 'mat_Imo',        // Matrícula
                12: 'prazo_txt',      // Prazo
                13: 'valor_txt',      // Aluguel
                14: 'garantia-txt',   // Garantia
                15: 'fiador_txt',     // Info Fiador
                16: 'fiador_txt',     // Doc Fiador
                17: 'fiador_txt',     // CPF Fiador
                18: 'obras_txt',      // Obras
                19: 'iptu_txt',
                20: 'clausula-txt',
                21: 'inc_clausula',
                22: 'inc_Inq_clausula',
                23: 'cidade-txt',
                24: 'nome_tes1-txt'
            };
            targetId = comMapping[stepIndex];
        } else {
            const resMapping = {
                0: 'contrato',
                1: 'contrato',
                2: 'contrato',
                3: 'contrato',
                4: 'contrato_Inq',
                5: 'contrato_Inq',
                6: 'contrato_Inq',
                7: 'contrato_Inq',
                8: 'rua-textImovel',
                9: 'descricao_Texarea',
                10: 'mat_Imo',
                11: 'prazo_txt',
                12: 'valor_txt',
                13: 'garantia-txt',
                14: 'fiador_txt',
                15: 'fiador_txt',
                16: 'fiador_txt',
                17: 'fiador_txt',
                18: 'obras_txt',
                19: 'iptu_txt',
                20: 'clausula-txt',
                21: 'inc_clausula',
                22: 'inc_Inq_clausula',
                23: 'cidade-txt',
                24: 'nome_tes1-txt'
            };
            targetId = resMapping[stepIndex];
        }

        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    const handleNextStep = () => {
        if (!validateCurrentStep()) {
            return;
        }

        // Lógica para pular etapas
        if (currentStep === 0 && isPJ) {
            updateStep(3); // Pular da etapa 1 para 4 (índices baseados em 0)
        } else if (currentStep === 4 && isPJ1) {
            updateStep(7); // Pular da etapa 6 para 8
        } else if (currentStep === 14 && isFi) {
            updateStep(19); // Pular da etapa 15 para 20(comercial)
        } else if (currentStep === 13 && isFi) {
            updateStep(18); // Pular da etapa 14 para 19 (Residencial)
        } else {
            updateStep(currentStep + 1); // Avançar normalmente
        }
    };

    // Botões de avançar
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', handleNextStep);
    });

    // Botões de voltar
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep === 3 && isPJ) {
                updateStep(0); // Retornar para a etapa 1 (índice 0)
            } else if (currentStep === 7 && isPJ1) {
                updateStep(4); // Retornar para a etapa 6
            } else if (currentStep === 19 && isFi) {
                updateStep(14); // Retornar para a etapa 15 (comercial)
            } else if (currentStep === 18 && isFi) {
                updateStep(13); // Retornar para a etapa 14
            } else {
                updateStep(currentStep - 1); // Voltar normalmente
            }
        });
    });

    // Submissão do formulário
    const contractForm = document.getElementById('contractForm');
    if (contractForm) {
        contractForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateCurrentStep()) {
                return;
            }
            showAlert('Formulário enviado com sucesso!', 'success');
        });
    }

});


// Função para mudar a imagem conforme o radio selecionado
function mudarImagem() {
    // Verifica qual radio está selecionado
    if (document.getElementById('res').checked) {
        // Altera a imagem para "Residencial"
        document.getElementById('imagem-contrato').src = "img/residencial.jpg";
    } else if (document.getElementById('com').checked) {
        // Altera a imagem para "Comercial"
        document.getElementById('imagem-contrato').src = "img/comercial.jpg";
    }
}

// Função para redirecionar e carregar o contrato correto
function redirecionar() {
    const modeloSelecionado = document.querySelector('input[name="modelo"]:checked');

    if (modeloSelecionado) {
        const valor = modeloSelecionado.value;

        if (valor === "Loc_Res") {
            // Redireciona para residencial.html
            window.location.href = "residencial.html";
        } else if (valor === "Loc_Com") {
            // Redireciona para comercial.html
            window.location.href = "comercial.html";
        }
    } else {
        alert("Por favor, selecione um modelo antes de continuar.");
    }
}

