import {validarCamposPreenchidos, fecharModal} from './Utils.js';

//LOGIN
document.getElementById("formLogin").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = this;
    const email = form.querySelector('[name="email"]').value.trim();
    const senha = form.querySelector('[name="senha"]').value;

    const error = document.getElementById("login_error");
    let mensagemErro = "";

    //---Validações local---
    // Verificar campos preenchidos
    const errosPreenchimento = validarCamposPreenchidos(
      ["email", "senha"],
      form
    );
    if (errosPreenchimento.length > 0) {
      mensagemErro = errosPreenchimento[0];
    }
    // Se houve erro, mostra de forma centralizada
    if (mensagemErro !== "") {
      error.textContent = mensagemErro;
      error.style.display = "block";
      return;
    }

    //---Passando das validações---
    const dados = { email, senha };
    const resposta = await fetch("../../app/Models/LoginModel.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ acao: "login", dados }),
    });
    const json = await resposta.json();

    //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
    if (!json.erro) {
      fecharModal("modal_login");
      alert(json.mensagem);
      window.location.href = '/chale/';
    } else {
      error.textContent = json.mensagem;
      error.style.display = "block";
    }
});

const pagina = document.body.dataset.page;
if (pagina === 'conta_admin') {
    //LOGOUT
    document.getElementById("formLogout").querySelector('[name="sim"]').addEventListener("click", async function (e) {
        e.preventDefault();

        const resposta = await fetch('../../app/Models/LoginModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'logout' })
        });

        const json = await resposta.json();

        if (!json.erro) {
            fecharModal('modal_logout');
            alert(json.mensagem);
            // Redirecionar para a página de login ou homepage
            window.location.href = '/chale/';
        } else {
            alert('Erro ao fazer logout: ' + json.mensagem);
        }
    });
}