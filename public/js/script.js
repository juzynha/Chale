// Função para abrir o modal
export function abrirModal(idModal) {
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
window.abrirModal = abrirModal;
// Função para fechar o modal
export function fecharModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = 'none';
        modal.querySelector('form').reset(); // limpa campos do form
        const error = modal.querySelector('.error'); // ou pelo id
        if (error) {
            error.textContent = '';
            error.style.display = 'none';
        }
    }
}
window.fecharModal = fecharModal;
//toggle icon olho pra mostrar senha
document.querySelectorAll('.toggleSenha').forEach(btn => {
    btn.addEventListener("click", () => {
        const input = btn.previousElementSibling; // pega o input anterior ao botão
        if (input.type === "password") {
            input.type = "text";
            btn.src = "/chale/public/assets/icons/icon-olho-fechado.svg"; // imagem de olho fechado
        } else {
            input.type = "password";
            btn.src = "/chale/public/assets/icons/icon-olho.svg"; // imagem de olho aberto
        }
    });
});

//máscaras para inputs
function mascaras(){
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
}

//tirar o limite de tamanho para mostrar a lista completa de reservas
function mostrarTudo() {
    let mostrar = document.getElementById('mostrar_lista');
    let container = document.getElementById('container_reservas');

    // Calcula 150% da altura da tela
    let alturaLimite = window.innerHeight * 0.1;

    // Verifica se o conteúdo ultrapassa 150% da tela
    if (container.scrollHeight > alturaLimite) {
        // Conteúdo é maior -> ativa limite e mostra o botão
        container.classList.add("limita-tamanho");
        mostrar.style.display = "flex"; // garante que o botão apareça

        // Configura o botão para alternar mostrar tudo/mostrar menos
        mostrar.addEventListener("click", function () {
            if (mostrar.textContent === 'Mostrar tudo') {
                // Expandir
                container.classList.remove("limita-tamanho");
                mostrar.textContent = 'Mostrar menos';
            } else {
                // Recolher
                container.classList.add("limita-tamanho");
                mostrar.textContent = 'Mostrar tudo';
            }
        });
    } else {
        // Conteúdo não é grande -> sem limite, esconde botão ou desativa
        container.classList.remove("limita-tamanho");
        container.classList.add("sem-limite");
        mostrar.style.display = "none"; // esconde o botão
    }
}

document.addEventListener("DOMContentLoaded", function () {
  mascaras();
  mostrarTudo();
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