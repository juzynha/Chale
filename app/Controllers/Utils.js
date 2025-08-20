/**
 * Valida se os campos obrigatórios não estão vazios.
 * 
 * @param {string[]} names - Lista de nomes dos campos obrigatórios (ex: ['nome', 'email', 'senha'])
 * @param {HTMLElement} container - Form ou modal onde estão os campos
 * @returns {string[]} - Lista de mensagens de erro, vazia se todos os campos estão preenchidos
 */
export function validarCamposPreenchidos(names, container = document) {
    for (let name of names) {
        const campo = container.querySelector(`[name="${name}"]`);
        if (campo) {
            if (campo.type === 'file') {
                if (campo.files.length === 0) {
                    return [`Selecione uma imagem`];
                }
            } else {
                if (campo.value.trim() === '') {
                    return [`Todos os campos devem ser preenchidos`];
                }
            }
        }
    }
    return [];
}

//-------Validar estruturas-------
export function validarNomeProprio(nome) {
  const regex = /^[A-Za-zÀ-ÿ][a-zà-ÿ]+(?: [A-Za-zÀ-ÿ][a-zà-ÿ]+)+$/;
  return regex.test(nome.trim());
}

export function validarString(string) {
  const regex = /^([A-Za-zÀ-ÿ][a-zà-ÿ]*)( [A-Za-zÀ-ÿ][a-zà-ÿ]*)*$/;
  return regex.test(string.trim());
}

export function validarTexto(texto) {
  const regex = /^([A-Za-zÀ-ÿ0-9]+)( [A-Za-zÀ-ÿ0-9]+)*$/;
  return regex.test(texto.trim());
}

export function validarImagem(inputFile, tamanhoMaxMB = 2) {
    const error = {
        status: false,
        message: ''
    };

    if (!inputFile || !inputFile.files || inputFile.files.length === 0) {
        error.status = true;
        error.message = 'Selecione uma imagem';
        return error;
    }

    const imagem = inputFile.files[0];
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!tiposPermitidos.includes(imagem.type)) {
        error.status = true;
        error.message = 'Tipo de imagem inválido. Use JPEG, PNG, GIF ou WEBP.';
        return error;
    }

    const tamanhoEmMB = imagem.size / (1024 * 1024);
    if (tamanhoEmMB > tamanhoMaxMB) {
        error.status = true;
        error.message = `Imagem muito grande. Tamanho máximo permitido: ${tamanhoMaxMB}MB.`;
        return error;
    }

    return error; 
}

export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

export function validarSenha(senha) {
  // Mínimo 8 caracteres, pelo menos uma letra, um número e um símbolo
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(senha);
}

export function validarTelefone(numero) {
    const regex = /^(\(?\d{2}\)?\s?)?\d{5}-?\d{4}$/;
    return regex.test(numero);
}   

//-------Validar datas-------
export function validarData(data) {
  // yyyy-mm-dd ou yyyy/mm/dd
  const regex = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
  return regex.test(data);
}

export function validarDataPassada(dataString) {
    // Converte dd/mm/yyyy para Date
    const [dia, mes, ano] = dataString.split('/').map(Number);
    const dataInformada = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Comparação segura (ano, mês, dia)
    return (
        dataInformada.getFullYear() > hoje.getFullYear() ||
        (dataInformada.getFullYear() === hoje.getFullYear() && dataInformada.getMonth() > hoje.getMonth()) ||
        (dataInformada.getFullYear() === hoje.getFullYear() && dataInformada.getMonth() === hoje.getMonth() && dataInformada.getDate() >= hoje.getDate())
    );
}

export function validarDataFutura(dataString) {
    // Converte dd/mm/yyyy para Date
    const [dia, mes, ano] = dataString.split('/').map(Number);
    const dataInformada = new Date(ano, mes - 1, dia);

    // Cria limite de 10 anos à frente
    const hoje = new Date();
    const limite = new Date();
    limite.setFullYear(hoje.getFullYear() + 10);
    limite.setHours(23, 59, 59, 999); // garante comparação completa

    return dataInformada <= limite;
}

export function validarDistanciaData(dataInicialStr, dataFinalStr) {
    // Converte dd/mm/yyyy para Date
    const [diaI, mesI, anoI] = dataInicialStr.split('/').map(Number);
    const [diaF, mesF, anoF] = dataFinalStr.split('/').map(Number);

    const dataInicial = new Date(anoI, mesI - 1, diaI);
    const dataFinal = new Date(anoF, mesF - 1, diaF);

    // Zera as horas para evitar inconsistências de horário
    dataInicial.setHours(0, 0, 0, 0);
    dataFinal.setHours(0, 0, 0, 0);

    // Calcula a diferença em milissegundos e converte para dias
    const diffEmDias = (dataFinal - dataInicial) / (1000 * 60 * 60 * 24);

    return diffEmDias >= 1;
}

export function converterDataParaISO(data) {
    const partes = data.split('/');
    if (partes.length === 3) {
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return data; 
}

export function converterDataParaBR(dataISO) {
    const partes = dataISO.split('-');
    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataISO;
}

// Função para abrir o modal
export function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = 'flex';
        modal.querySelectorAll('.btn-fechar-modal').forEach(botao => {
            botao.addEventListener('click', () => fecharModal(idModal));
        });
        inputMaskDate(); 
    }
}
window.abrirModal = abrirModal;

// Função para fechar o modal
export function fecharModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = 'none';
        let form = modal.querySelector('form');
        if (form){
            form.reset();
        } 
        const error = modal.querySelector('.error'); 
        const imgBox = modal.querySelector('.img-box');
        if (error) {
            error.textContent = '';
            error.style.display = 'none';
        }
        if (imgBox) {
            // Remove imagem renderizada
            const img = imgBox.querySelector('img');
            if (img) img.remove();

            // Reativa o input
            const input = imgBox.querySelector('input[type="file"]');
            if (input) input.style.pointerEvents = 'auto';

            // Reinsere o ícone, se necessário
            const existingIcon = imgBox.querySelector('.icon');
            if (!existingIcon) {
                const icon = document.createElement('img');
                icon.classList.add('icon');
                icon.src = '/chale/public/assets/icons/icon-adicionar(branco).svg';
                imgBox.appendChild(icon);
            }   
        }
    }
}
window.fecharModal = fecharModal;

export function scrollModalToTop(idModal) {
    const modal = document.querySelector(idModal);
    if (modal) {
        modal.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}
window.scrollModalToTop = scrollModalToTop;