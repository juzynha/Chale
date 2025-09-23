import {validarCamposPreenchidos, fecharModal, abrirPopUp, converterDataParaBR, verificarLogin} from './Utils.js';

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

document.addEventListener('DOMContentLoaded', async function(){
  BotaoMenu();
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
//retornando as informações do usuário logado (admin) na página do perfil
if (pagina === 'conta_admin'){
  const login = await verificarLogin();
  if (login.logado && login.tipo == "admin"){
    //recebe os dados do usuario logado admin
    const user = await verificarUsuario();
    
    const containerConta = document.getElementById('containerContaAdmin');
    const fotoPerfil = containerConta.querySelector('[name="foto_perfil"]');
    const infosConta = containerConta.querySelector('[name="infos_conta"]');

    //mostrando a foto de perfil
    const fotoImg = document.createElement("img");
    if (!user.usuario.foto){
      fotoImg.src = "/chale/public/assets/icons/icon-user.svg";
    } else {
      fotoImg.src = "/chale/public/uploads/" + user.usuario.foto;
    }
    fotoPerfil.appendChild(fotoImg);
  
    //mostrando as infos (nome,email)
    infosConta.innerHTML = `
      <li class="nome-usuario">${user.usuario.nome}</li>
      <li>E-mail: ${user.usuario.email}</li>`
  }
}
//retornando as informações do usuário logado (admin) na página do perfil
if (pagina === 'conta_usuario'){
  const login = await verificarLogin();
  if (login.logado && login.tipo == "cliente"){
    //recebe os dados do usuario logado admin
    const user = await verificarUsuario();

    const containerConta = document.getElementById('containerContaUsuario');
    const fotoPerfil = containerConta.querySelector('[name="foto_perfil"]');
    const infosConta = containerConta.querySelector('[name="infos_conta"]');

    //mostrando a foto de perfil
    const fotoImg = document.createElement("img");
    if (!user.usuario.foto){
      fotoImg.src = "/chale/public/assets/icons/icon-user.svg";
    } else {
      fotoImg.src = "/chale/public/uploads/" + user.usuario.foto;
    }
    fotoPerfil.appendChild(fotoImg);
  
    //mostrando as infos (nome,email)
    let dataNasc = converterDataParaBR(user.usuario.datanasc);
    infosConta.innerHTML = `
      <li class="nome-usuario">${user.usuario.nome}</li>
      <li>Email: ${user.usuario.email}</li>
      <li>Telefone: ${user.usuario.telefone}</li>
      <li>Data de nascimento: ${dataNasc}</li>`; 
  }
}

async function verificarUsuario(){
  const resposta = await fetch("/chale/app/Models/LoginModel.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ acao: "verificar_usuario" }),
  });
  const json = await resposta.json();
  return json;
}

//----------Tratamentos de retornar (ou não) elementos de acordo com o login-----------
//menu
async function BotaoMenu(){
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
}
//página O Chalé
if (pagina === 'o_chale'){
  const containerServicos = document.getElementById('container_servicos');
  const containerFotos = document.getElementById('container_fotos');
  const login = await verificarLogin();
  if (login.logado && login.tipo == "admin"){
    //ferramenta de criar sessão de serviços
    const criarSessaoServicos = document.createElement("div"); 
    criarSessaoServicos.classList.add("ferramenta");
    criarSessaoServicos.onclick = () => abrirModalCriarSessao('Serviços');
    criarSessaoServicos.innerHTML = `
      <p>Criar sessão</p>
      <img src="/chale/public/assets/icons/icon-adicionar.svg" class="icon">
    `;
    containerServicos.appendChild(criarSessaoServicos);
    //ferramenta de criar sessão de fotos
    const criarSessaoFotos = document.createElement("div"); 
    criarSessaoFotos.classList.add("ferramenta-branco");
    criarSessaoFotos.onclick = () => abrirModalCriarSessao('Fotos');
    criarSessaoFotos.innerHTML = `
    <p>Criar sessão</p>
    <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" class="icon">
    `;
    containerFotos.appendChild(criarSessaoFotos);
  }
}
//página Faça sua Reserva
if (pagina === 'faca_sua_reserva'){
  const containerCarrossel = document.querySelector('[name="carrossel_container"]');
  const blocoReserva = document.querySelector('[name="bloco_reserva"]');
  const login = await verificarLogin();
  if (login.logado && login.tipo == "admin"){
    //ferramenta de criar sessão de serviços
    const criarEditarCarrossel = document.createElement("div"); 
    criarEditarCarrossel.classList.add("option-editar-carrossel");
    criarEditarCarrossel.onclick = () => abrirModalCriarSessao('Serviços');
    criarEditarCarrossel.innerHTML = `
      <div class="ferramenta" onclick="abrirModal('modal_editar_carrossel')">
          <p>Editar carrossel</p>
          <img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icon">
      </div>
    `;
    containerCarrossel.appendChild(criarEditarCarrossel);
    //ferramenta de criar sessão de fotos
    const criarEditarPrecos = document.createElement("div"); 
    criarEditarPrecos.classList.add("ferramenta");
    criarEditarPrecos.onclick = () => abrirModalCriarSessao('Fotos');
    criarEditarPrecos.innerHTML = `
    <p>Editar preços</p>
    <img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icon">
    `;
    blocoReserva.prepend(criarEditarPrecos);
  }
}