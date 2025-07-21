import {validarCamposPreenchidos, validarNomeProprio, validarEmail, validarSenha} from './validacoes.js';
import {fecharModal} from '../../public/js/script.js';

//-------CADASTRO DE ADMIN-------
document.getElementById('formCadastroAdmin').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = this; 
    const nome = form.querySelector('[name="nome"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const senha = form.querySelector('[name="senha"]').value;
    const confSenha = form.querySelector('[name="conf_senha"]').value;

    const error = document.getElementById('cadAdmin_error');

    //---Validações local---
    //Verificar se todos os campos estão preenchidos
    const errosPreenchimento = validarCamposPreenchidos(['nome', 'email', 'senha', 'conf_senha'], form);
    if (errosPreenchimento.length > 0) {
        error.textContent = errosPreenchimento[0];
        error.style.display = 'block';
        return;
    }
    //Validar estrutura do nome
    if (!validarNomeProprio(nome)) {
        error.textContent = 'Nome inválido.';
        error.style.display = 'block';
        return;
    }
    //Validar estrutura do email
    if (!validarEmail(email)) {
        error.textContent = 'Email inválido.';
        error.style.display = 'block';
        return;
    }
    //Validar estrutura da senha
    if (!validarSenha(senha)) {
        error.textContent = 'Senha fraca.';
        error.style.display = 'block';
        return;
    }
    //Verificar se as senhas coincidem
    if (senha !== confSenha) {
        error.textContent = 'As senhas não coincidem.';
        error.style.display = 'block';
        return;
    }

    //---Verificar se o email já está cadastrado---
    const emailCheck = await fetch('../../app/Models/UsuarioModel.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acao: 'verificar_email', email })
    });

    const emailCheckJson = await emailCheck.json();

    if (emailCheckJson.existe) {
        error.textContent = 'Este email já está cadastrado.';
        error.style.display = 'block';
        return;
    } 

    //---Passando das validações---
    const dados = {nome, email, senha};
    const resposta = await fetch('../../app/Models/UsuarioModel.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({acao: 'cadastrar_admin', dados})
    });
    const json = await resposta.json();
    
    //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
    if (!json.erro) {
        fecharModal('modal_cadastro_admin');
        alert(json.mensagem);
    } else {
        error.textContent= json.mensagem;
    }

});