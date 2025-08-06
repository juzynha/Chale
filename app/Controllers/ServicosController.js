import {validarCamposPreenchidos, validarImagem, validarTexto} from './Validacoes.js';
import {fecharModal, scrollModalToTop} from '../../public/js/script.js';

document.getElementById('formCriarServico').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = this; 
    const nomeServico = form.querySelector('[name="nome_servico"]').value.trim();
    const imagemServico = form.querySelector('[name="imagem_servico"]');
    const descricao = form.querySelector('[name="descricao"]').value.trim();

    const error = document.getElementById('cadServicos_error');
    let mensagemErro = '';

    //---Validações local---
    const erroImagem = validarImagem(imagemServico);
    const errosPreenchimento = validarCamposPreenchidos(['nome_servico', 'imagem_servico', 'descricao'], form);
    // Verificar campos preenchidos
    if (errosPreenchimento.length > 0) {
        mensagemErro = errosPreenchimento[0];
    }
    // Validar imagem
    else if (erroImagem.error) {
        mensagemErro = erroImagem.error;
    }
    // Validar descrição
    else if (!validarTexto(descricao)) {
        mensagemErro = 'Nome inválido.';
    }
    if (mensagemErro !== '') {
        error.textContent = mensagemErro;
        error.style.display = 'block';
        scrollModalToTop('#modal_criar_servico .bloco-modal-geral');
        return;
    }
    //---Passando das validações---
    const formData = new FormData();
    formData.append('acao', 'cadastrar_servico');
    formData.append('nomeServico', nomeServico);
    formData.append('imagemServico', imagemServico.files[0]);
    formData.append('descricao', descricao);

    const resposta = await fetch('../../app/Models/ServicosModel.php', {
        method: 'POST',
        body: formData
    });
    const json = await resposta.json();
        
    //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
    if (!json.erro) {
        fecharModal('modal_criar_servico');
        alert(json.mensagem);
    } else {
        error.textContent= json.mensagem;
    }
    
});