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
        let form = modal.querySelector('form');
        if (form){
            form.reset();
        } 
        const error = modal.querySelector('.error'); 
        const imgBox = modal.querySelector('.img-box');
        if (error) {
            error.textContent = '';
            error.style.display = 'none';
        }
        if (imgBox) {
            // Remove imagem renderizada
            const img = imgBox.querySelector('img');
            if (img) img.remove();

            // Reativa o input
            const input = imgBox.querySelector('input[type="file"]');
            if (input) input.style.pointerEvents = 'auto';

            // Reinsere o ícone, se necessário
            const existingIcon = imgBox.querySelector('.icon');
            if (!existingIcon) {
                const icon = document.createElement('img');
                icon.classList.add('icon');
                icon.src = '/chale/public/assets/icons/icon-adicionar(branco).svg';
                imgBox.appendChild(icon);
            }   
        }
    }
}
window.fecharModal = fecharModal;

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
    //preenche o input com o dia atual
    if (!input.value) {
      const hoje = new Date();
      // Se o name for "data_final", soma 1 dia
      if (input.name === 'data_final') {
        hoje.setDate(hoje.getDate() + 1);
      }
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
        if (d < 1) d = 1; // não permite 00
        if (d > 31) d = 31;
        day = d.toString().padStart(2, '0');
      }

      // Validação de mês
      if (month.length === 2) {
        let m = parseInt(month, 10);
        if (m < 1) m = 1; // não permite 00
        if (m > 12) m = 12;
        month = m.toString().padStart(2, '0');
      }
      
      // Validação de ano
      if (year.length === 4) {
        let y = parseInt(year, 10);
        if (y < 1) {
          y = new Date().getFullYear(); // substitui 0000 pelo ano atual
        }
        year = y.toString().padStart(4, '0');
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

document.addEventListener("DOMContentLoaded", function () {
  inputMaks();
});

window.abrirModal = abrirModal;