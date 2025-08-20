import {validarCamposPreenchidos, validarNomeProprio, validarEmail, validarSenha, fecharModal, scrollModalToTop} from './Utils.js';

const pagina = document.body.dataset.page;

if (pagina === 'conta_admin') {
    //-------CADASTRO DE ADMIN-------
    document.getElementById('formCadastroAdmin').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this; 
        const nome = form.querySelector('[name="nome"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const senha = form.querySelector('[name="senha"]').value;
        const confSenha = form.querySelector('[name="conf_senha"]').value;

        const error = document.getElementById('cadAdmin_error');
        let mensagemErro = '';

        //---Validações local---
        // Verificar campos preenchidos
        const errosPreenchimento = validarCamposPreenchidos(['nome', 'email', 'senha', 'conf_senha'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        }
        // Validar nome
        else if (!validarNomeProprio(nome)) {
            mensagemErro = 'Nome inválido.';
        }
        // Validar email
        else if (!validarEmail(email)) {
            mensagemErro = 'Email inválido.';
        }
        // Validar senha
        else if (!validarSenha(senha)) {
            mensagemErro = 'Senha fraca.';
        }
        // Verificar senhas
        else if (senha !== confSenha) {
            mensagemErro = 'As senhas não coincidem.';
        }
        // Se houve erro, mostra de forma centralizada
        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            scrollModalToTop('#modal_cadastro_admin .contorno-modal');
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
            scrollModalToTop('#modal_cadastro_admin .contorno-modal');
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
}


