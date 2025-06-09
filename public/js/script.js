// Função para abrir o modal
function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = 'flex'; 
        modal.querySelectorAll('.btn-fechar-modal').forEach(botao => {
            botao.addEventListener('click', () => fecharModal(idModal));
        });
        /* Fechar clicando fora do conteúdo
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                fecharModal(idModal);
            }
        });
        */
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
    fecharModal('modal_login');
    abrirModal('modal_cadastro_usuario');
});

document.getElementById('abrir_login').addEventListener('click', () => {
    fecharModal('modal_cadastro_usuario');
    abrirModal('modal_login');
});

//toggle icon olho pra mostrar senha
const inputSenha = document.getElementById("senha_login");
const toggleBtn = document.getElementById("toggleSenha");

toggleBtn.addEventListener("click", () => {
    if (inputSenha.type === "password") {
        inputSenha.type = "text";
        toggleBtn.src = "/chale/public/assets/icons/icon-olho-fechado.svg"; // imagem de olho fechado
    } else {
        inputSenha.type = "password";
        toggleBtn.src = "/chale/public/assets/icons/icon-olho-aberto.svg"; // imagem de olho aberto
    }
});

//máscara para input type="date"
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('input[type="date"]').forEach(function(input) {
    input.type = 'text';
    input.placeholder = '  /  /    ';
    input.classList.add("calendario_input");
    
    input.addEventListener('input', function (e) {
      let v = e.target.value.replace(/\D/g, "");
      if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2);
      if (v.length >= 5) v = v.slice(0, 5) + "/" + v.slice(5, 9);
      e.target.value = v.slice(0, 10);
    });
  });
});

  // Flatpickr com formato brasileiro
  flatpickr(".calendario_input", {
    dateFormat: "d/m/Y",
    locale: {
      firstDayOfWeek: 0,
      weekdays: {
        shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        longhand: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
      },
      months: {
        shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      },
    }
  });


  