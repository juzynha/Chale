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
    // Limpar todos os inputs, textareas e selects dentro do modal
    const campos = modal.querySelectorAll('input, textarea, select');

    campos.forEach(campo => {
      if (campo.type === 'checkbox' || campo.type === 'radio') {
        campo.checked = false;
      } else {
        campo.value = '';
      }
    });
}

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
  // Máscara de data dd/mm/yyyy
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

  // Máscara de nome (primeira letra de cada palavra maiúscula)
  document.querySelectorAll('[name="nome"]').forEach(function(input) {
    input.addEventListener('input', function () {
      const cursor = input.selectionStart; // salva posição do cursor

      let formatado = input.value
        .toLowerCase()
        .replace(/\s+/g, ' ') // evita múltiplos espaços seguidos
        .split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ');

      input.value = formatado;

      input.setSelectionRange(cursor, cursor); // restaura o cursor
    });
  });
});


  /* Flatpickr com formato brasileiro
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
*/