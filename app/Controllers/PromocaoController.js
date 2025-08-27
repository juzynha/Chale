import {validarCamposPreenchidos, validarString, validarDataPassada, validarDataFutura, validarDistanciaData, converterDataParaISO, fecharModal, scrollModalToTop} from './Utils.js';

const pagina = document.body.dataset.page;

if (pagina === 'reservas') {
    //-------CADASTRO DE PROMOÇÃO-------
    document.getElementById('formCadastroPromocao').addEventListener('submit', async function(e){
        e.preventDefault();

        const form = this; 
        const nomePromocao = form.querySelector('[name="nome_promocao"]').value.trim();
        let dataInicial = form.querySelector('[name="data_inicial"]').value.trim();
        let dataFinal = form.querySelector('[name="data_final"]').value.trim();
        const valorDiaria = form.querySelector('[name="valor_diaria"]').value.trim();
        const valorDiariaFds = form.querySelector('[name="valor_diariafds"]').value.trim();

        const error = document.getElementById('cadPromocao_error');
        let mensagemErro = '';

        //---Validações local---
        // Verificar campos preenchidos
        const errosPreenchimento = validarCamposPreenchidos(['nome_promocao','data_inicial','data_final','valor_diaria','valor_diariafds'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        }
        //Validar nome
        else if (!validarString(nomePromocao)) {
            mensagemErro = 'Nome inválido.';
        }    
        //Validar se a data não está no passado
        else if (!validarDataPassada(dataInicial)){
            mensagemErro = 'Você não pode usar uma data no passado';
        }
        //Validar se a data não está mais distante que 10 anos
        else if (!validarDataFutura(dataFinal)){
            mensagemErro = 'Você não pode usar uma data tão distante';
        }
        //Validar se a data final está pelo menos 1 dia a frente da data inicial
        else if (!validarDistanciaData(dataInicial, dataFinal)){
            mensagemErro = 'O período precisa ter uma duração de pelo menos um dia';
        }
        // Se houve erro, mostra de forma centralizada
        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_promocao .bloco-modal-geral');
            return;
        }
        //Converter as datas dd/mm/yyyy para yyyy/mm/dd
        dataInicial = converterDataParaISO(dataInicial);
        dataFinal = converterDataParaISO(dataFinal);

        //---Verificar se já não existe uma promoção no mesmo período de tempo informado---
        let dados = {dataInicial, dataFinal}
        const dateCheck = await fetch('../../app/Models/PromocaoModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'verificar_data', dados })
        });

        const dateCheckJson = await dateCheck.json();

        if (dateCheckJson.existe) {
            error.textContent = 'Já existe uma promoção nesse período';
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_promocao .bloco-modal-geral');
            return;
        } 

        //---Passando das validações---
        dados = {nomePromocao,dataInicial,dataFinal,valorDiaria,valorDiariaFds};
        const resposta = await fetch('../../app/Models/PromocaoModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({acao: 'cadastrar_promocao', dados})
        });
        const json = await resposta.json();
        
        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_cadalt_promocao');
            alert(json.mensagem);
        } else {
            error.textContent= json.mensagem;
        }

    });
}

