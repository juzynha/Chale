import {
    validarCamposPreenchidos,
    validarDataPassada,
    validarDataFutura,
    validarDistanciaData,
    converterDataParaISO
} from './Validacoes.js';

import { fecharModal, scrollModalToTop } from '../../public/js/script.js';

document.getElementById('formBloquearDias').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = this;
    const dataInicialInput = form.querySelector('[name="data_inicial"]');
    const dataFinalInput = form.querySelector('[name="data_final"]');
    let dataInicial = dataInicialInput?.value.trim();
    let dataFinal = dataFinalInput?.value.trim();
    const error = document.getElementById('bloqueio_error');
    let mensagemErro = '';

    // --- Validações ---
    const errosPreenchimento = validarCamposPreenchidos(['data_inicial', 'data_final'], form);
    if (errosPreenchimento.length > 0) {
        mensagemErro = errosPreenchimento[0];
    } else if (!validarDataPassada(dataInicial)) {
        mensagemErro = 'Você não pode usar uma data no passado';
    } else if (!validarDataFutura(dataFinal)) {
        mensagemErro = 'Você não pode usar uma data tão distante';
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

    const dados = {
        dataInicial,
        dataFinal,
        tipo: 'geral'
    };
    
    try {
        console.log("Enviando dados para o PHP:", {
    acao: 'bloquear_dias',
    dados
});

const response = await fetch('../../app/Models/BloqueioModel.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ acao: 'bloquear_dias', dados })
});
        const resultado = await response.json();

        if (!resultado.erro) {
            alert(resultado.mensagem);
            fecharModal('modal_bloquear_dias');
            form.reset();
            if (error) error.style.display = 'none';
            // Aqui você pode chamar uma função para atualizar a lista de bloqueios, se existir
        } else {
            if (error) {
                error.textContent = resultado.mensagem;
                error.style.display = 'block';
            } else {
                alert("Erro ao bloquear dias: " + resultado.mensagem);
            }
        }
    } catch (e) {
        alert("Erro de conexão com o servidor.");
        console.error(e);
    }
});
