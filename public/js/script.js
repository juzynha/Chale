// Função para abrir o modal
function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = 'flex'; 
        modal.querySelectorAll('.btn-fechar-modal').forEach(botao => {
            botao.addEventListener('click', () => fecharModal(idModal));
        });
        // Fechar clicando fora do conteúdo
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                fecharModal(idModal);
            }
        });
    }
}

// Função para fechar o modal
function fecharModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = 'none';
    }
}


//aplicando as funções de abrir e fechar modal nos devidos botões
document.getElementById('abrir_cadastro').addEventListener('click', () => {
    fecharModal('login');
    abrirModal('cadastro');
});

document.getElementById('abrir_login').addEventListener('click', () => {
    fecharModal('cadastro');
    abrirModal('login');
});

document.getElementById('continuar_cadastro').addEventListener('click', () => {
    fecharModal('cadastro');
    abrirModal('confirmar_email');
});

document.getElementById('continuar_email').addEventListener('click', () => {
    fecharModal('confirmar_email');
    abrirModal('colocar_foto');
});

//toggle icon olho pra mostrar senha
const inputSenha = document.getElementById("senha_login");
const toggleBtn = document.getElementById("toggleSenha");

toggleBtn.addEventListener("click", () => {
    if (inputSenha.type === "password") {
        inputSenha.type = "text";
        toggleBtn.src = "/chale/public/assets/icons/icon-olho-aberto.svg"; // imagem de olho aberto
    } else {
        inputSenha.type = "password";
        toggleBtn.src = "/chale/public/assets/icons/icon-olho-fechado.svg"; // imagem de olho fechado
    }
});