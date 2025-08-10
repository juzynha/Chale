import {validarCamposPreenchidos, validarNomeProprio, validarEmail, validarTelefone, validarSenha, converterDataParaISO} from './Validacoes.js';
import {abrirModal, fecharModal, scrollModalToTop} from '../../public/js/script.js';

//-------CADASTRO DE USUÁRIO-------
//let listenerValidacaoAtivado = false; // FLAG GLOBAL
const codigoCriado = '';
const dados = { };
document.getElementById('formCadAltUsuario').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = this;
    const nome = form.querySelector('[name="nome"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const telefone = form.querySelector('[name="telefone"]').value.trim();
    let dataNasc = form.querySelector('[name="data_nasc"]').value.trim();
    const senha = form.querySelector('[name="senha"]').value;
    const confSenha = form.querySelector('[name="conf_senha"]').value;

    dataNasc = converterDataParaISO(dataNasc);
    const idade = calcularIdade(dataNasc);

    const error = document.getElementById('cadUsuario_error');
    let mensagemErro = '';

    //--- Validações locais ---
    const errosPreenchimento = validarCamposPreenchidos(
        ['nome', 'email', 'telefone', 'data_nasc', 'senha', 'conf_senha'],
        form
    );
    if (errosPreenchimento.length > 0) {
        mensagemErro = errosPreenchimento[0];
    } else if (!validarNomeProprio(nome)) {
        mensagemErro = 'Nome inválido.';
    } else if (!validarEmail(email)) {
        mensagemErro = 'Email inválido.';
    } else if (!validarTelefone(telefone)) {
        mensagemErro = 'Telefone inválido.';
    } else if (idade < 18) {
        mensagemErro = 'Você deve ter 18 anos ou mais para se cadastrar.';
    } else if (idade > 120) {
        mensagemErro = 'Idade inválida.';
    } else if (!validarSenha(senha)) {
        mensagemErro = 'Senha fraca.';
    } else if (senha !== confSenha) {
        mensagemErro = 'As senhas não coincidem.';
    }

    if (mensagemErro !== '') {
        error.textContent = mensagemErro;
        error.style.display = 'block';
        scrollModalToTop('#modal_cadalt_usuario .contorno-modal');
        return;
    }

    //--- Verificar se o email já está cadastrado ---
    const emailCheck = await fetch('app/Models/UsuarioModel.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acao: 'verificar_email', email })
    });

    const emailCheckJson = await emailCheck.json();

    if (emailCheckJson.existe) {
        error.textContent = 'Este email já está cadastrado.';
        error.style.display = 'block';
        scrollModalToTop('#modal_cadalt_usuario .contorno-modal');
        return;
    }

    //--- Preparar dados e abrir modal de validação ---
    dados = { nome, email, telefone, dataNasc, senha };

    fecharModal('modal_cadalt_usuario');
    abrirModal('modal_validar_email');
    document.getElementById('validacao_email').textContent = email;

    // Enviar código de validação
    const resposta = await fetch('app/Models/UsuarioModel.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acao: 'enviar_codigo' })
    });

    const json = await resposta.json();
    codigoCriado = json.codigo;
    console.log('Código gerado:', codigoCriado); 
});
   // if (!listenerValidacaoAtivado) {
        document.getElementById('formValidacaoEmail').addEventListener('submit', async function (e) {
            e.preventDefault();

            const form = this;
            const codigoInformado = form.querySelector('[name="codigo"]').value.trim();
            const error = document.getElementById('validarEmail_error');
            let mensagemErroValidacao = '';

            const errosPreenchimento = validarCamposPreenchidos(['codigo'], form);
            if (errosPreenchimento.length > 0) {
                mensagemErroValidacao = errosPreenchimento[0];
            } else if (codigoInformado !== codigoCriado) {
                mensagemErroValidacao = 'O código informado está incorreto.';
            }

            if (mensagemErroValidacao !== '') {
                error.textContent = mensagemErroValidacao;
                error.style.display = 'block';
                return;
            }

            // Cadastro final do usuário
            const respostaCadastro = await fetch('app/Models/UsuarioModel.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ acao: 'cadastrar_usuario', dados })
            });

            const jsonCadastro = await respostaCadastro.json();

            if (!jsonCadastro.erro) {
                fecharModal('modal_validar_email');
                abrirModal('modal_cadastrar_foto');
                alert(jsonCadastro.mensagem);
            } else {
                error.textContent = jsonCadastro.mensagem;
                error.style.display = 'block';
            }
        });
        listenerValidacaoAtivado = true;
   // }


// Função para calcular idade
function calcularIdade(data) {
  const hoje = new Date();
  const nasc = new Date(data);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade;
}
