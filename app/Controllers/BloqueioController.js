import {validarCamposPreenchidos, validarDataPassada, validarDistanciaData, converterDataParaISO, fecharModal, scrollModalToTop} from './Utils.js';

// Função para verificar se já existe bloqueio no período
async function verificarBloqueioNaData(dataInicial, dataFinal) {
    try {
        const response = await fetch('../../app/Models/BloqueioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                acao: 'verificar_data', 
                dados: { dataInicial, dataFinal } 
            })
        });
        const resultado = await response.json();
        return resultado.temBloqueio; // true ou false
    } catch (e) {
        console.error("Erro ao verificar bloqueios:", e);
        return false;
    }
}

const pagina = document.body.dataset.page;

if (pagina === 'reservas') {
    //-------BLOQUEIO DE DIA (MODAL)-------
    document.getElementById('formBloquearDias').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        let dataInicial = form.querySelector('[name="data_inicial"]').value;
        let dataFinal = form.querySelector('[name="data_final"]').value;
        const error = document.getElementById('bloqueio_error');
        let mensagemErro = '';

        // --- Validações ---
        const errosPreenchimento = validarCamposPreenchidos(['data_inicial', 'data_final'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        } else if (!validarDataPassada(dataInicial)) {
            mensagemErro = 'Você não pode usar uma data no passado';
        } else if (!validarDistanciaData(dataInicial, dataFinal)) {
            mensagemErro = 'O período precisa ter pelo menos um dia de duração';
        }

        if (mensagemErro !== '') {
            if (error) {
                error.textContent = mensagemErro;
                error.style.display = 'block';
            } else {
                alert(mensagemErro);
            }
            scrollModalToTop?.('#modal_bloquear_dias .bloco-modal-geral');
            return;
        }

        // Converter para formato ISO (yyyy-mm-dd)
        dataInicial = converterDataParaISO(dataInicial);
        dataFinal = converterDataParaISO(dataFinal);

        // --- Verifica se já existe bloqueio ---
        const existeBloqueio = await verificarBloqueioNaData(dataInicial, dataFinal);
        if (existeBloqueio) {
            const msg = "Não é possível bloquear dias que já estão bloqueados.";
            if (error) {
                error.textContent = msg;
                error.style.display = 'block';
            } else {
                alert(msg);
            }
            scrollModalToTop?.('#modal_bloquear_dias .bloco-modal-geral');
            return;
        }

        // --- Envia dados para o PHP ---
        const dados = {dataInicial, dataFinal, tipo: 'manual'};

        const response = await fetch('../../app/Models/BloqueioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'bloquear_dias', dados })
        });
        const js = await response.json();

        if (!js.erro) {
            alert(js.mensagem);
            fecharModal('modal_bloquear_dias');
        } else {
            if (error) {
                error.textContent = resultado.mensagem;
                error.style.display = 'block';
            } else {
                alert("Erro ao bloquear dias: " + js.mensagem);
            }
        }
    });
}

// ----- CLIQUE NO CALENDÁRIO PARA BLOQUEAR AUTOMATICAMENTE -----
// Variável global para armazenar a data selecionada no calendário
let dataSelecionadaDoCalendario = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ao clicar em um dia do calendário
    const dias = document.querySelectorAll('.dia-calendario');

    dias.forEach(dia => {
        dia.addEventListener('click', function () {
            const data = this.dataset.date;
            if (!data) return;

            dataSelecionadaDoCalendario = data; // Armazena a data selecionada

            abrirModal('modal_promocao/bloqueio'); // Abre o modal correto
        });
    });

    // 2. Ao clicar no botão "Bloquear Dia" dentro do modal
    const btnBloquear = document.getElementById('bloque_dia');

    if (btnBloquear) {
        btnBloquear.addEventListener('click', () => {
            if (!dataSelecionadaDoCalendario) {
                alert("Nenhuma data foi selecionada.");
                return;
            }

            const form = document.getElementById('formBloquearDias');
            if (!form) {
                alert("Formulário de bloqueio não encontrado.");
                return;
            }

            // Preenche o formulário invisível com a data selecionada
            const inputDataInicial = form.querySelector('[name="data_inicial"]');
            const inputDataFinal = form.querySelector('[name="data_final"]');

            inputDataInicial.value = dataSelecionadaDoCalendario;
            inputDataFinal.value = dataSelecionadaDoCalendario;

            // Dispara o submit com todas as validações existentes
            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        });
    }
});

