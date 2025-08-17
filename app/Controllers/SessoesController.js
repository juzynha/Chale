import {validarCamposPreenchidos, validarString} from './Validacoes.js';
import {abrirModal, fecharModal} from '../../public/js/script.js';

const pagina = document.body.dataset.page;

if (pagina === 'o_chale') {
    //Listar sessões
    document.addEventListener('DOMContentLoaded', function () {
        const servicos = document.getElementById('sessaoServicos');
        const fotos = '';
        fetch(`../../app/Models/SessoesModel.php`, {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({ acao: "listar_sessoes" }),
        })
        .then((response) => response.json())
        .then((data) => {

        });
    });

    //--Colocar o nome de referência da sessão no modal--
    document.getElementById('criar_sessao_fotos').addEventListener('click', function () {
        const tag = document.getElementById('nome_referencia');
        abrirModal('modal_criar_sessao');
        tag.textContent = 'Galeria de fotos';
    });
    document.getElementById('criar_sessao_servicos').addEventListener('click', function () {
        const tag = document.getElementById('nome_referencia');
        abrirModal('modal_criar_sessao');
        tag.textContent = 'Serviços';
    });

    //-------CADASTRO DE SESSÃO-------
    document.getElementById('formCriarSessao').addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const form = this; 
        const nomeSessao = form.querySelector('[name="nome_sessao"]').value.trim();
        let referencia = document.getElementById('nome_referencia').textContent;

        const error = document.getElementById('cadSessao_error');
        let mensagemErro = '';

        //---Validações---
        //Verificar campos preenchidos
        const errosPreenchimento = validarCamposPreenchidos(['nome_sessao'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        }
        //Validar nome
        else if (!validarString(nomeSessao)) {
            mensagemErro = 'Nome inválido.';
        }
        // Se houve erro, mostra de forma centralizada
        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            return;
        }

        //---Passando das validações---
        const dados = {nomeSessao, referencia};
        const resposta = await fetch('../../app/Models/SessoesModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({acao: 'cadastrar_sessao', dados})
        });
        const json = await resposta.json();
        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_criar_sessao');
            alert(json.mensagem);
        } else {
            error.textContent= json.mensagem;
        }

    });
}