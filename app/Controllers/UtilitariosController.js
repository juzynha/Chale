import {validarCamposPreenchidos, validarString, validarImagem, validarTexto} from './Validacoes.js';
import {fecharModal, inputRenderImg, scrollModalToTop} from '../../public/js/script.js';

document.getElementById('formCriarUtilitario').addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log('clicou');
    const form = this; 
    const nomeUtilitario = form.querySelector('[name="nome_utilitario"]').value.trim();
    const imagemUtilitario = form.querySelector('[name="imagem_utilitario"]');
    const descricao = form.querySelector('[name="descricao"]').value.trim();
    const img = form.querySelector('[name="img"]');

    const error = document.getElementById('cadUtilitario_error');
    let mensagemErro = '';
    // Renderizar imagem selecionada
    inputRenderImg(imagemUtilitario,img);

    //---Validações local---
    const erroImagem = validarImagem(imagemUtilitario);
    const errosPreenchimento = validarCamposPreenchidos(['nome_utilitario', 'imagem_utilitario', 'descricao'], form);
    // Verificar campos preenchidos
    if (errosPreenchimento.length > 0) {
        mensagemErro = errosPreenchimento[0];
    }
    // Validar nome
    else if (!validarString(nomeUtilitario)) {
        mensagemErro = 'Nome inválido.';
    }
    // Validar imagem
    else if (erroImagem.error.length > 0) {
        mensagemErro = erroImagem.error;
    }
    // Validar descrição
    else if (!validarTexto(descricao)) {
        mensagemErro = 'Nome inválido.';
    }
    if (mensagemErro !== '') {
        error.textContent = mensagemErro;
        error.style.display = 'block';
        scrollModalToTop('#modal_criar_utilitario .bloco-modal-geral');
        return;
    }
});