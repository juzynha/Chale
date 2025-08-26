import {validarCamposPreenchidos, validarString, validarImagem, validarTexto,abrirModal, fecharModal} from './Utils.js';

const pagina = document.body.dataset.page;

if (pagina === 'o_chale') {
    //-------LISTAGEM DE SESSÕES-------
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
                        <div class="titulo-sessao">
                            <h2 class="subtitulo verde-medio">${sessao.sesnome}</h2>
                            <img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icon">
                        </div>
                        <div class="sessao-cards" id="sessao-${sessao.sesid}">
                            <!-- Card de adicionar serviço -->
                            <div class="card-servico-add admin" data-sessao-id="${sessao.sesid}">
                                <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" width="50px">
                            </div>
                        </div>
                        <div class="opcao-excluir-sessao">
                            <div class="ferramenta" onclick="abrirModal('modal_excluir_sessao')">
                                <p>Excluir sessão</p>
                                <img src="/chale/public/assets/icons/icon-lixeira(verde).svg" class="icon">
                            </div>
                        </div>
                        <hr>
                    </div>
                    `;
                    listarServicos(sessao.sesid);
                });

                // registrar cliques nos botões de adicionar
                lista.addEventListener('click', function(e) {
                    if (e.target.closest('.card-servico-add')) {
                        const btn = e.target.closest('.card-servico-add');
                        const sesId = btn.dataset.sessaoId;
                        document.getElementById('formCriarServico').dataset.sessaoId = sesId;
                        abrirModal('modal_criar_servico');
                    }
                    if (e.target.closest('.card-foto-add')) {
                        const btn = e.target.closest('.card-foto-add');
                        const sesId = btn.dataset.sessaoId;
                        document.getElementById('formAddFotoGaleria').dataset.sessaoId = sesId;
                        abrirModal('modal_add_foto_galeria');
                    }
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
            location.href = window.location.pathname; 
        } else {
            error.textContent= json.mensagem;
        }

    });

    //-------CADASTRO DE SERVIÇO-------
    document.getElementById('formCriarServico').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this; 
        const nomeServico = form.querySelector('[name="nome_servico"]').value.trim();
        const imagemServico = form.querySelector('[name="imagem_servico"]');
        const descricao = form.querySelector('[name="descricao"]').value.trim();
        const sesId = form.dataset.sessaoId; // pegando o id salvo no clique
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
        formData.append('sesId', sesId); 

        const resposta = await fetch('../../app/Models/FotServModel.php', {
            method: 'POST',
            body: formData
        });
        const json = await resposta.json();
            
        if (!json.erro) {
            fecharModal('modal_criar_servico');
            alert(json.mensagem);
            location.href = window.location.pathname; 
        } else {
            error.textContent= json.mensagem;
        }
    });

    //-------CADASTRO DE FOTO-------
    document.getElementById('formAddFotoGaleria').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this; 
        const foto = form.querySelector('[name="foto"]');
        const sesId = form.dataset.sessaoId; // <<<<<<<<<< ID DA SESSÃO

        const error = document.getElementById('cadFotoGaleria_error');
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
        formData.append('sesId', sesId); // <<<<<<<<<< ID DA SESSÃO

        const resposta = await fetch('../../app/Models/FotServModel.php', {
            method: 'POST',
            body: formData
        });
        const json = await resposta.json();
            
        if (!json.erro) {
            fecharModal('modal_add_foto_galeria');
            alert(json.mensagem);
            location.reload();
        } else {
            error.textContent= json.mensagem;
        }
    });

    //-------LISTAR SERVIÇOS-------
    function listarServicos(sesId) {
        fetch(`../../app/Models/FotServModel.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ acao: "listar_servicos", sesId }),
        })
        .then((response) => response.json())
        .then((data) => {
            let container = document.getElementById("sessao-" + sesId);
            // não limpar os botões de add
            let botoesAdd = container.querySelectorAll('.card-servico-add, .card-foto-add');
            container.innerHTML = "";
            botoesAdd.forEach(btn => container.appendChild(btn));

            data.forEach((servico) => {
                container.innerHTML += `
                    <div class="card-servico">
                        <div class="card-servico-header">
                            <p class="nome-servico">${servico.sernome}</p>
                            <div class="ferramentas">
                                <img src="/chale/public/assets/icons/icon-editar.svg">
                                <img src="/chale/public/assets/icons/icon-lixeira.svg">
                            </div>
                        </div>
                        <div class="imagem-servico">
                            <img src="/chale/public/uploads/servicos/${servico.serfotcaminho}" class="img-card">
                        </div>
                        <div class="descricao-servico">
                            <p>${servico.serdescricao}</p>
                        </div>
                    </div>
                `;
            });
        });
    }
}
