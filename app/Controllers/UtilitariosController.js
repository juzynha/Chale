import {validarCamposPreenchidos, validarNomeProprio, validarEmail, validarSenha} from './Validacoes.js';
import {fecharModal, inputRenderImg} from '../../public/js/script.js';

const form = document.getElementById('formCriarUtilitario');
let input = form.querySelector('[name="imagem_utilitario"]');
let img = form.querySelector('.imagem-utilitario img');

inputRenderImg(input,img);
