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
        } else {
            error.textContent= json.mensagem;
        }
        
    });
}