import {validarCamposPreenchidos, validarString} from './Validacoes.js';
import {listarServicos} from './FotServController.js';
import {abrirModal, fecharModal} from '../../public/js/script.js';

const pagina = document.body.dataset.page;

if (pagina === 'o_chale') {
    //Listar sessões
    document.addEventListener('DOMContentLoaded', function () {
        let lista = document.getElementById('sessaoServicos');
        fetch(`../../app/Models/SessoesModel.php`, {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({ acao: "listar_sessoes_servicos" }),
            }).then((response) => response.json()).then((data) => {
                lista.innerHTML = "";
                data.forEach((sessao) => {
                    lista.innerHTML += `
                    <div class="sessao">
                        <h2 class="subtitulo verde-medio">${sessao.sesnome}</h2>

                        <div class="sessao-cards">
                            <div class="card-servico-add admin" onclick="abrirModal('modal_criar_servico')">
                                <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" width="50px">
                            </div>

                            <!-- Container vazio que será preenchido dinamicamente -->
                            <div class="lista-servicos" id="sessao-${sessao.sesid}"></div>
                        </div>
                        <div class="opcao-excluir-sessao">
                            <div class="ferramenta">
                                <p>Excluir sessão</p>
                                <img src="/chale/public/assets/icons/icon-lixeira(verde).svg" class="icon">
                            </div>
                        </div>
                        <hr>
                    </div>

                    `;
                    listarServicos(sessao.sesid);
                });
            
            });   
    });

    //--Colocar o nome de referência da sessão no modal--
    document.getElementById('criar_sessao_fotos').addEventListener('click', function () {
        const tag = document.getElementById('nome_referencia');
        abrirModal('modal_criar_sessao');
        tag.textContent = 'Galeria de fotos';
    });
    document.getElementById('criar_sessao_servicos').addEventListener('click', function () {
        const tag = document.getElementById('nome_referencia');
        abrirModal('modal_criar_sessao');
        tag.textContent = 'Serviços';
    });

    //-------CADASTRO DE SESSÃO-------
    document.getElementById('formCriarSessao').addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const form = this; 
        const nomeSessao = form.querySelector('[name="nome_sessao"]').value.trim();
        let referencia = document.getElementById('nome_referencia').textContent;

        const error = document.getElementById('cadSessao_error');
        let mensagemErro = '';

        //---Validações---
        //Verificar campos preenchidos
        const errosPreenchimento = validarCamposPreenchidos(['nome_sessao'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        }
        //Validar nome
        else if (!validarString(nomeSessao)) {
            mensagemErro = 'Nome inválido.';
        }
        // Se houve erro, mostra de forma centralizada
        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            return;
        }

        //---Passando das validações---
        const dados = {nomeSessao, referencia};
        const resposta = await fetch('../../app/Models/SessoesModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({acao: 'cadastrar_sessao', dados})
        });
        const json = await resposta.json();
        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_criar_sessao');
            alert(json.mensagem);
            location.reload();
        } else {
            error.textContent= json.mensagem;
        }

    });
}