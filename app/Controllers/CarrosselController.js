import {validarCamposPreenchidos, validarImagem, fecharModal} from './Utils.js';

const pagina = document.body.dataset.page;

if (pagina === 'faca_sua_reserva') {
    //-------CADASTRO DE FOTO-------
    document.getElementById('formAddFotoCarrossel').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this; 
        const foto = form.querySelector('[name="foto"]');

        const error = document.getElementById('cadFotoCarrossel_error');
        let mensagemErro = '';

        //---Validações local---
        const erroImagem = validarImagem(foto);
        const errosPreenchimento = validarCamposPreenchidos(['foto'], form);
        // Verificar campos preenchidos
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        }
        // Validar imagem
        if (erroImagem.error) {
            mensagemErro = erroImagem.error;
        }
        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            return;
        }
        //---Passando das validações---
        const formData = new FormData();
        formData.append('acao', 'cadastrar_foto');
        formData.append('foto', foto.files[0]);

        const resposta = await fetch('../../app/Models/CarrosselModel.php', {
            method: 'POST',
            body: formData
        });
        const json = await resposta.json();
            
        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_add_foto_carrossel');
            alert(json.mensagem);
            location.href = window.location.pathname;
        } else {
            error.textContent= json.mensagem;
        }
        
    });
    //-------LISTAGEM DE FOTO-------
    document.addEventListener('DOMContentLoaded', async function () {
        const resposta = await fetch('../../app/Models/CarrosselModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'acao=listar_carrossel'
        });
    
        const json = await resposta.json();
        if (!json.erro) {
            montarCarrossel(json.fotos);
        } else {
            console.error(json.mensagem);
        }
    });
    
    function montarCarrossel(fotos) {
        const container = document.getElementById('carrossel-box');
        container.innerHTML = '';
    
        fotos.forEach((foto, index) => {
            const div = document.createElement('div');
            div.classList.add('carrossel-item');
            div.dataset.index = index;
    
            const img = document.createElement('img');
            img.src = `/chale/public/uploads/carrossel/${foto.carfotcaminho}`;
    
            div.appendChild(img);
            container.appendChild(div);
        });
    
        atualizarCarrossel(0);
    }
    
    let posicaoAtual = 0;
    
    function atualizarCarrossel(index) {
        const items = document.querySelectorAll('.carrossel-item');
        const total = items.length;
    
        items.forEach((item, i) => {
            item.className = 'carrossel-item'; // reset classes
    
            if (i === index) {
                item.classList.add('center');
            } else if (i === (index - 1 + total) % total) {
                item.classList.add('mid-left');
            } else if (i === (index - 2 + total) % total) {
                item.classList.add('small-left');
            } else if (i === (index + 1) % total) {
                item.classList.add('mid-right');
            } else if (i === (index + 2) % total) {
                item.classList.add('small-right');
            } else {
                item.classList.add('oculto'); // imagens extras ficam escondidas
            }
        });
    
        posicaoAtual = index;
    }
    
    document.getElementById('prevBtn_carrossel').addEventListener('click', () => {
        atualizarCarrossel((posicaoAtual - 1 + document.querySelectorAll('.carrossel-item').length) % document.querySelectorAll('.carrossel-item').length);
    });
    
    document.getElementById('nextBtn_carrossel').addEventListener('click', () => {
        atualizarCarrossel((posicaoAtual + 1) % document.querySelectorAll('.carrossel-item').length);
    });
}


