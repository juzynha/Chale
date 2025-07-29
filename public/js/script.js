// Função para abrir o modal
export function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = 'flex';
        modal.querySelectorAll('.btn-fechar-modal').forEach(botao => {
            botao.addEventListener('click', () => fecharModal(idModal));
        });
        inputMaskDate(); 
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

// Renderiza imagens carregadas de inputs (file)
export function renderizarEditorImagem(div, input) {
  const arquivo = input.files[0];
  if (!arquivo) return;

  // Limpa a div
  div.innerHTML = '';

  // Cria a imagem
  const img = document.createElement('img');
  img.classList.add('img');

  const reader = new FileReader();
  reader.onload = function(e) {
    img.src = e.target.result;
    div.appendChild(img);

    // Centraliza a imagem inicialmente
    img.onload = function () {
      // Centraliza a imagem dentro da div
      const divRect = div.getBoundingClientRect();
      img.style.left = `${(div.clientWidth - img.width) / 2}px`;
      img.style.top = `${(div.clientHeight - img.height) / 2}px`;
    }

    // Habilita o "mover"
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    img.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = parseInt(img.style.left || 0);
      initialTop = parseInt(img.style.top || 0);
      img.style.cursor = 'grabbing';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        img.style.left = `${initialLeft + dx}px`;
        img.style.top = `${initialTop + dy}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      img.style.cursor = 'grab';
    });

    // Suporte a toque (mobile)
    img.addEventListener('touchstart', (e) => {
      isDragging = true;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      initialLeft = parseInt(img.style.left || 0);
      initialTop = parseInt(img.style.top || 0);
    });

    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const touch = e.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        img.style.left = `${initialLeft + dx}px`;
        img.style.top = `${initialTop + dy}px`;
      }
    });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });
  };

  reader.readAsDataURL(arquivo);
}

export function scrollModalToTop(idModal) {
    const modal = document.querySelector(idModal);
    if (modal) {
        modal.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

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
function inputMaks() {
  inputMaskName();
  inputMaskDate();
  inputMaskDouble();
}

function inputMaskDate() {
// Máscara de data dd/mm/yyyy
  document.querySelectorAll('input[type="date"], .input-date').forEach(function(input) {
    input.type = 'text';
    input.placeholder = '  /  /    ';
    input.classList.add('placeholder');
    
    if (!input.classList.contains('input-date')) {
      input.classList.add('input-date');
    }

    if (!input.value) {
      const hoje = new Date();
      const ano = hoje.getFullYear();
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const dia = String(hoje.getDate()).padStart(2, '0');
      input.value = `${dia}/${mes}/${ano}`; 
    }

      input.addEventListener('input', function (e) {
      let v = e.target.value.replace(/\D/g, ""); // remove não dígitos

      // Limita ao máximo 8 dígitos (ddmmYYYY)
      if (v.length > 8) v = v.slice(0, 8);

      let day = v.slice(0, 2);
      let month = v.slice(2, 4);
      let year = v.slice(4, 8);

      // Validação de dia
      if (day.length === 2) {
        let d = parseInt(day, 10);
        if (d > 31) d = 31;
        day = d.toString().padStart(2, '0');
      }

      // Validação de mês
      if (month.length === 2) {
        let m = parseInt(month, 10);
        if (m > 12) m = 12;
        month = m.toString().padStart(2, '0');
      }

      let formatted = day;
      if (month.length) formatted += '/' + month;
      if (year.length) formatted += '/' + year;

      e.target.value = formatted;
    });
  });
}

function inputMaskName() {
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

function inputMaskDouble() {
//Máscara de inputs de valores (reais R$)
  document.querySelectorAll('.input-double').forEach(input => {
    input.placeholder = '000,00';
    input.classList.add('placeholder');

    input.addEventListener('input', function (e) {
        let valor = e.target.value;

        // Permitir apenas números e vírgula
        valor = valor.replace(/[^0-9,]/g, '');

        // Garante que haja apenas uma vírgula
        const partes = valor.split(',');
        if (partes.length > 2) {
            valor = partes[0] + ',' + partes[1];
        }

        e.target.value = valor;
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
  inputMaks();
  mostrarTudo();
});