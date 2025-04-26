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