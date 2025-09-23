import {
    validarCamposPreenchidos,
    validarString,
    validarImagem,
    validarTexto,
    abrirModal,
    fecharModal,
    verificarLogin
} from './Utils.js';

const pagina = document.body.dataset.page;

if (pagina === 'o_chale') {
    document.addEventListener('DOMContentLoaded', function () {
        listarSessoesServicos();
        listarSessoesFotos();
    });

    //-------LISTAGEM DE SESSÕES FOTOS-------
    async function listarSessoesFotos() {
        const lista = document.getElementById('sessaoFotos');
        const login = await verificarLogin(); // já pega o tipo de usuário
    
        fetch(`../../app/Models/SessoesModel.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'listar_sessoes_fotos' }),
        })
        .then(response => response.json())
        .then(data => {
            lista.innerHTML = '';
    
            data.forEach(sessao => {
                let sessaoHtml = `
                <div class="sessao">
                    <div class="titulo-sessao">
                        <h2 class="subtitulo branco">${sessao.sesnome}</h2>
                        ${login.logado && login.tipo === "admin"
                            ? `<img src="/chale/public/assets/icons/icon-editar.svg" class="icon" onclick="abrirModalEditarSessao(${sessao.sesid},'${sessao.sesnome}')">`
                            : ""}
                    </div>
                    <div class="sessao-cards" id="sessao-${sessao.sesid}">
                        ${login.logado && login.tipo === "admin"
                            ? `<div class="card-foto-add" data-sessao-id="${sessao.sesid}">
                                <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" width="50px">
                            </div>`
                            : ""}
                    </div>
                    ${login.logado && login.tipo === "admin"
                        ? `<div class="opcao-excluir-sessao">
                               <div class="ferramenta-branco" onclick="abrirModalExcluir('Sessão de Fotos')">
                                   <p>Excluir sessão</p>
                                   <img src="/chale/public/assets/icons/icon-lixeira.svg" class="icon">
                               </div>
                           </div>`
                        : ""}
                    <hr class="hr-branco">
                </div>
                `;
    
                lista.innerHTML += sessaoHtml;
    
                listarFotos(sessao.sesid, login);
            });
    
            // registrar cliques nos botões de adicionar (só se admin)
            if (login.logado && login.tipo === "admin") {
                lista.addEventListener('click', function(e) {
                    if (e.target.closest('.card-foto-add')) {
                        const btn = e.target.closest('.card-foto-add');
                        const sesId = btn.dataset.sessaoId;
                        document.getElementById('formAddFotoGaleria').dataset.sessaoId = sesId;
                        abrirModal('modal_add_foto_galeria');
                    }
                });
            }
        });
    }

    //-------LISTAGEM DE SESSÕES SERVIÇOS-------
    async function listarSessoesServicos() {
        let lista = document.getElementById('sessaoServicos');
        const login = await verificarLogin(); // já pega o tipo de usuário

        fetch(`../../app/Models/SessoesModel.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'listar_sessoes_servicos' }),
        })
            .then((response) => response.json())
            .then((data) => {
                lista.innerHTML = '';

                data.forEach((sessao) => {
                    // monta a sessão base
                    let sessaoHtml = `
                    <div class="sessao">
                        <div class="titulo-sessao">
                            <h2 class="subtitulo verde-medio">${sessao.sesnome}</h2>
                            ${login.logado && login.tipo === "admin"
                                ? `<img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icon" onclick="abrirModalEditarSessao(${sessao.sesid},'${sessao.sesnome}')">`
                                : ""}
                        </div>
                        <div class="sessao-cards" id="sessao-${sessao.sesid}">
                            ${login.logado && login.tipo === "admin"
                                ? `<div class="card-servico-add" data-sessao-id="${sessao.sesid}">
                                    <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" width="50px">
                                </div>`
                                : ""}
                        </div>
                        ${login.logado && login.tipo === "admin"
                            ? `<div class="opcao-excluir-sessao">
                                <div class="ferramenta" onclick="abrirModalExcluir('Sessão de Serviços')">
                                    <p>Excluir sessão</p>
                                    <img src="/chale/public/assets/icons/icon-lixeira(verde).svg" class="icon">
                                </div>
                            </div>`
                            : ""}
                        <hr>
                    </div>
                    `;

                    lista.innerHTML += sessaoHtml;

                    listarServicos(sessao.sesid, login);
                });

                // registrar cliques nos botões de adicionar (só se admin)
                if (login.logado && login.tipo === "admin") {
                    lista.addEventListener('click', function (e) {
                        if (e.target.closest('.card-servico-add')) {
                            const btn = e.target.closest('.card-servico-add');
                            const sesId = btn.dataset.sessaoId;
                            document.getElementById('formCriarServico').dataset.sessaoId = sesId;
                            abrirModal('modal_criar_servico');
                        }
                    });
                }
            });
    }
    
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
        const errosPreenchimento = validarCamposPreenchidos(
            ['nome_servico', 'imagem_servico', 'descricao'],
            form
        );
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
            body: formData,
        });
        const json = await resposta.json();

        if (!json.erro) {
            fecharModal('modal_criar_servico');
            alert(json.mensagem);
            location.href = window.location.pathname;
        } else {
            error.textContent = json.mensagem;
        }
    });

    //-------CADASTRO DE FOTO-------
    document.getElementById('formAddFotoGaleria').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const foto = form.querySelector('[name="foto"]');
        const sesId = form.dataset.sessaoId;
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
        formData.append('sesId', sesId);

        const resposta = await fetch('../../app/Models/FotServModel.php', {
            method: 'POST',
            body: formData,
        });
        const json = await resposta.json();

        if (!json.erro) {
            fecharModal('modal_add_foto_galeria');
            alert(json.mensagem);
            location.reload();
        } else {
            error.textContent = json.mensagem;
        }
    });

    //-------LISTAR SERVIÇOS-------
    function listarServicos(sesId, login) {
        fetch(`../../app/Models/FotServModel.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'listar_servicos', sesId }),
        })
            .then((response) => response.json())
            .then((data) => {
                let container = document.getElementById('sessao-' + sesId);
                container.innerHTML = '';
    
                // botão de adicionar só aparece se admin
                if (login.logado && login.tipo === "admin") {
                    container.innerHTML += `
                        <div class="card-servico-add" data-sessao-id="${sesId}">
                            <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" width="50px">
                        </div>
                    `;
                }
    
                data.forEach((servico) => {
                    container.innerHTML += `
                    <div class="card-servico">
                        <div class="card-servico-header">
                            <p class="nome-servico">${servico.sernome}</p>
                            ${login.logado && login.tipo === "admin"
                                ? `<div class="ferramentas admin">
                                       <img src="/chale/public/assets/icons/icon-lixeira.svg" onclick="abrirModalExcluir('Serviço')">
                                   </div>`
                                : ""}
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

    //-------LISTAR FOTOS-------
    function listarFotos(sesId, login) {
        fetch(`../../app/Models/FotServModel.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'listar_fotos', sesId }),
        })
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('sessao-' + sesId);
    
            // preserva botões de adicionar
            let botoesAdd = [];
            if (login.logado && login.tipo === "admin") {
                botoesAdd = container.querySelectorAll('.card-foto-add');
            }
    
            container.innerHTML = '';
    
            botoesAdd.forEach(btn => container.appendChild(btn));
    
            data.forEach(foto => {
                const cardFoto = document.createElement('div');
                cardFoto.classList.add('card-foto');
    
                cardFoto.innerHTML = `
                    <img src="/chale/public/uploads/galeria/${foto.fotcaminho}" class="img-card">
                    ${login.logado && login.tipo === "admin"
                        ? `<img src="/chale/public/assets/icons/icon-lixeira.svg" class="icon" onclick="abrirModalExcluir('Foto')">`
                        : ""}
                `;
    
                container.appendChild(cardFoto);
            });
        });
    }    
    
    window.abrirModalCriarSessao = function (sessao) {
        const modal = document.getElementById('modal_cadalt_sessao');
        modal.querySelector('#titulo_texto').textContent = 'Criar Sessão para: ' + sessao;
        modal.querySelector('#nome_referencia').textContent = sessao;
    
        const form = document.getElementById('formCadAltSessao');
        form.querySelector('.btn').textContent = 'Criar';
    
        abrirModal('modal_cadalt_sessao');
        cadastrarSessao();
    };
    
    window.abrirModalEditarSessao = function (id, nome) {
        const modal = document.getElementById('modal_cadalt_sessao');
        modal.querySelector('#titulo_texto').textContent = 'Editar Sessão';
    
        const form = document.getElementById('formCadAltSessao');
        form.querySelector('.btn').textContent = 'Editar';
        form.querySelector('[name="nome_sessao"]').value = nome;
    
        abrirModal('modal_cadalt_sessao');
        editarSessao(id);
    };
}

//-------CADASTRO DE SESSÃO-------
function cadastrarSessao() {
    document.getElementById('formCadAltSessao').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const nomeSessao = form.querySelector('[name="nome_sessao"]').value.trim();
        let referencia = document.getElementById('nome_referencia').textContent;

        const error = document.getElementById('cadAltSessao_error');
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
        const dados = { nomeSessao, referencia };
        const resposta = await fetch('../../app/Models/SessoesModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'cadastrar_sessao', dados }),
        });
        const json = await resposta.json();
        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_criar_sessao');
            alert(json.mensagem);
            location.href = window.location.pathname;
        } else {
            error.textContent = json.mensagem;
        }
    });
}

//-------EDIÇÃO DE SESSÃO-------
function editarSessao(id) {
    document.getElementById('formCadAltSessao').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const nomeSessao = form.querySelector('[name="nome_sessao"]').value.trim();

        const error = document.getElementById('cadAltSessao_error');
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
        const dados = { id, nomeSessao };
        const resposta = await fetch('../../app/Models/SessoesModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'editar_sessao', dados }),
        });
        const json = await resposta.json();
        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_criar_sessao');
            alert(json.mensagem);
            location.href = window.location.pathname;
        } else {
            error.textContent = json.mensagem;
        }
    });
}
