// Renderiza imagens carregadas de inputs (file)
document.querySelectorAll('.img-box input[type="file"]').forEach(input => {
    input.addEventListener('change', function () {
        const file = this.files[0];
        if (!file) return;

        const container = this.closest('.img-box');
        const icon = container.querySelector('.icon');

        // Remove o ícone de "+"
        if (icon) icon.remove();

        // Desativa o input
        this.style.pointerEvents = 'none';

        // Cria e insere a imagem
        const img = document.createElement('img');
        img.classList.add('img');

        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
            container.appendChild(img);
            /*
            img.onload = function () {
            // Posição inicial centralizada
            let offsetX = 0;
            let offsetY = 0;
            let startX, startY;

            // Limites
            const updateLimits = () => {
                const containerRect = container.getBoundingClientRect();
                const imgRect = img.getBoundingClientRect();

                const maxX = Math.max(0, img.width - container.clientWidth);
                const maxY = Math.max(0, img.height - container.clientHeight);

                return {
                minX: -maxX / 2,
                maxX: maxX / 2,
                minY: -maxY / 2,
                maxY: maxY / 2
                };
            };

            // Centralizar a imagem inicialmente
            offsetX = (container.clientWidth - img.width) / 2;
            offsetY = (container.clientHeight - img.height) / 2;
            img.style.left = `${offsetX}px`;
            img.style.top = `${offsetY}px`;

            // Drag funcional
            img.addEventListener('mousedown', function (e) {
                e.preventDefault();
                startX = e.clientX;
                startY = e.clientY;

                const onMouseMove = (eMove) => {
                const deltaX = eMove.clientX - startX;
                const deltaY = eMove.clientY - startY;

                const limits = updateLimits();

                let newX = offsetX + deltaX;
                let newY = offsetY + deltaY;

                // Limitar movimento
                newX = Math.min(limits.maxX, Math.max(limits.minX, newX));
                newY = Math.min(limits.maxY, Math.max(limits.minY, newY));

                img.style.left = `${newX}px`;
                img.style.top = `${newY}px`;
                };

                const onMouseUp = (eUp) => {
                offsetX = parseInt(img.style.left);
                offsetY = parseInt(img.style.top);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
            };
            */
        };

        reader.readAsDataURL(file);
    });
});

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
  // --- Função que inicializa UM input (com proteção para não duplicar) ---
  function initInputDate(input) {
    if (!input || input.dataset.maskDateInit === '1') return;
    input.dataset.maskDateInit = '1';

    // Transforma em texto e adiciona classes/placeholder
    input.type = 'text';
    input.classList.add('input-date', 'placeholder');
    input.placeholder = '  /  /    ';

    // Preenche valor inicial se vazio
    if (!input.value) {
      const hoje = new Date();
      if (input.name === 'data_final') {
        hoje.setDate(hoje.getDate() + 1);
      }
      const ano = hoje.getFullYear();
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const dia = String(hoje.getDate()).padStart(2, '0');
      input.value = `${dia}/${mes}/${ano}`;
    }

    // Handler da máscara para este input
    input.addEventListener('input', handleDateMask);
  }

  // --- Máscara (dd/mm/aaaa) ---
  function handleDateMask(e) {
    const input = e.target;

    let v = input.value.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);

    let day = v.slice(0, 2);
    let month = v.slice(2, 4);
    let year = v.slice(4, 8);

    if (day.length === 2) {
      let d = parseInt(day, 10);
      if (d < 1) d = 1;
      if (d > 31) d = 31;
      day = d.toString().padStart(2, '0');
    }

    if (month.length === 2) {
      let m = parseInt(month, 10);
      if (m < 1) m = 1;
      if (m > 12) m = 12;
      month = m.toString().padStart(2, '0');
    }

    if (year.length === 4) {
      let y = parseInt(year, 10);
      if (y < 1) y = new Date().getFullYear();
      year = y.toString().padStart(4, '0');
    }

    let formatted = day;
    if (month.length) formatted += '/' + month;
    if (year.length) formatted += '/' + year;

    input.value = formatted;
  }

  // --- Inicializa os inputs já existentes ---
  document.querySelectorAll('input[type="date"], input.input-date')
    .forEach(initInputDate);

  // --- Se focar um input novo que ainda não foi inicializado, inicializa na hora ---
  document.addEventListener('focusin', (e) => {
    if (e.target.matches('input[type="date"], input.input-date')) {
      initInputDate(e.target);
    }
  });

  // --- Observa o DOM para inputs adicionados dinamicamente ---
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return; // só ELEMENT_NODE
        // Se o próprio node é um input de data
        if (node.matches?.('input[type="date"], input.input-date')) {
          initInputDate(node);
        }
        // Ou se trouxe inputs dentro dele
        node.querySelectorAll?.('input[type="date"], input.input-date')
          .forEach(initInputDate);
      });
    }
  });

  mo.observe(document.body, { childList: true, subtree: true });
}

function abrirCalendario(input) {
  let calendario = document.querySelector(".calendario-box");

  // Garante que só 1 calendário fique aberto
  calendario.style.display = "block";

  // Pega posição e tamanho do input
  const rect = input.getBoundingClientRect();

  // Posição padrão: abaixo do input
  let top = rect.bottom + window.scrollY + 5;
  let left = rect.left + window.scrollX;

  // Verifica se há espaço suficiente abaixo
  const spaceBelow = window.innerHeight - rect.bottom;
  const calendarioHeight = calendario.offsetHeight || 250; // altura estimada
  if (spaceBelow < calendarioHeight) {
      // coloca acima do input
      top = rect.top + window.scrollY - calendarioHeight - 5;
  }

  calendario.style.position = "absolute";
  calendario.style.top = `${top}px`;
  calendario.style.left = `${left}px`;
  calendario.style.zIndex = 9999;
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
    input.placeholder = '00,00';
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

document.addEventListener("DOMContentLoaded", function () {
  inputMaks();
});

/*/ Opcional: fechar clicando fora
document.addEventListener("click", (e) => {
  const calendario = document.querySelector(".calendario-box");
  if (calendario && !calendario.contains(e.target) && !e.target.classList.contains("input-date")) {
      calendario.style.display = "none";
  }
});
*/

//abrir a caixa que exibe as reservas à pagar ou em andamento na page conta de usuário
function abrirContainer(idContainer) {
    const container = document.getElementById(idContainer);
    const seta = container.querySelector('[name="seta"]');
    const content = container.querySelector('[name="content"]');

    if (seta.src.endsWith("icon-seta-left(verde).svg")) {
        seta.src = "/chale/public/assets/icons/icon-seta-baixo.svg";
        content.style.display = 'flex';
    } else {
        seta.src = "/chale/public/assets/icons/icon-seta-left(verde).svg";
        content.style.display = 'none';
    }
}
