import {validarCamposPreenchidos, validarString} from './validacoes.js';
import {abrirModal, fecharModal} from '../../public/js/script.js';

//--Colocar o nome de referência da sessão no modal--
document.getElementById('criar_sessao_fotos').addEventListener('click', function () {
    const tag = document.getElementById('nome_referencia');
    abrirModal('modal_criar_sessao');
    tag.textContent = 'Galeria de fotos';
});
document.getElementById('criar_sessao_utilitarios').addEventListener('click', function () {
    const tag = document.getElementById('nome_referencia');
    abrirModal('modal_criar_sessao');
    tag.textContent = 'Utilitários';
});

//-------CADASTRO DE SESSÃO-------
document.getElementById('formCriarSessao').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = this; 
    const nomeSessao = form.querySelector('[name="nome_sessao"]').value.trim();
    let referencia = document.getElementById('nome_referencia').textContent;
    const error = document.getElementById('cadSessao_error');

    //---Validações---
    //Verificar se todos os campos estão preenchidos
    const errosPreenchimento = validarCamposPreenchidos(['nome_sessao'], form);
    if (errosPreenchimento.length > 0) {
        error.textContent = errosPreenchimento[0];
        error.style.display = 'block';
        return;
    }
    //Validar estrutura do nome
    if (!validarString(nomeSessao)) {
        error.textContent = 'Nome inválido.';
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