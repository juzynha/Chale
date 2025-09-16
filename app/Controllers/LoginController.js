import {validarCamposPreenchidos, fecharModal, abrirPopUp} from './Utils.js';

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
    const resposta = await fetch("/chale/app/Models/LoginModel.php", {
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
if (pagina === 'conta_admin'||pagina === 'conta_usuario') {
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

if (pagina === 'conta_admin'){
  const json = await verificarLogin();
  if (json.logado && json.tipo == "admin"){
    const resposta = await fetch("/chale/app/Models/LoginModel.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ acao: "verificar_usuario" }),
    });
    const json = await resposta.json();

    const containerConta = document.getElementById('containerContaAdmin');
    const fotoPerfil = containerConta.querySelector('[name="foto_perfil"]');
    const infosConta = containerConta.querySelector('[name="infos_conta"]');

    const fotoImg = document.createElement("img");
    fotoImg.src = "/chale/public/uploads/" + json.usuario.foto;
    fotoPerfil.appendChild(fotoImg);
  }
}

async function verificarLogin(){
  const resposta = await fetch("/chale/app/Models/LoginModel.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ acao: "verificar_login" }),
  });
  const json = await resposta.json();
  return json;
}

document.addEventListener('DOMContentLoaded', async function(){
    const json = await verificarLogin();
    const nav = document.getElementById("nav_menu");
    const listaMenu = document.getElementById("lista_menu");

    // Remove qualquer botão antigo (se tiver no HTML fixo)
    const oldButton = nav.querySelector("button");
    if (oldButton) oldButton.remove();

    if (json.logado) {
      // Criar botão do usuário
      const userBtn = document.createElement("button");
      userBtn.classList.add("user");

      const link = document.createElement("a");
      const img = document.createElement("img");
      img.src = "/chale/public/assets/icons/icon-user.svg";
      img.classList.add("icon");

      // Define destino do link conforme tipo de usuário
      if (json.tipo === "admin") {
        link.href = "/chale/views/pages/conta_admin.php";

        // Adiciona link admin no menu
        const liAdmin = document.createElement("li");
        liAdmin.innerHTML = `<a> Admin <img src="/chale/public/assets/icons/icon-engrenagem.svg" width="18px"></a>`;
        listaMenu.appendChild(liAdmin);

      } else if (json.tipo === "cliente") {
        link.href = "/chale/views/pages/conta_usuario.php";
      }

      link.appendChild(img);
      userBtn.appendChild(link);
      nav.appendChild(userBtn);

    } else {
      // Se não logado → botão entrar
      const entrarBtn = document.createElement("button");
      entrarBtn.classList.add("entrar");
      entrarBtn.setAttribute("onclick", "abrirModal('modal_login')");
      entrarBtn.textContent = "Entrar";
      nav.appendChild(entrarBtn);
    }

}); 