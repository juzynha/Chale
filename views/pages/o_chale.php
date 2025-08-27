<?php
require_once __DIR__ . '/../layouts/header.php';
?>

<body data-page="o_chale">
    <header class="cabecalho">
        <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
    </header>
    <div class="container">
        <h2 class="titulo verde-escuro">Serviços</h2>
        <div class="servicos" id="sessaoServicos">
            <!-- Lista de sessões e serviços -->
        </div>
        <div class="ferramenta admin" id="criar_sessao_servicos">
            <p>Criar sessão</p>
            <img src="/chale/public/assets/icons/icon-adicionar.svg" class="icon">
        </div>
    </div>
    <div class="galeria-container">
        <img src="/chale/public/assets/elementos-graficos/onda-superior-sessao.svg" class="element-gal-fotos">
        <div class="galeria-de-fotos">
            <h2 class="titulo branco">Galeria de fotos</h2>
            <div class="galeria-content" id="sessaoFotos">
                <!-- Lista de sessões e fotos -->
                <div class="ferramenta-branco admin" id="criar_sessao_fotos">
                    <p>Criar sessão</p>
                    <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" class="icon">
                </div>
            </div>
        </div>
        <img src="/chale/public/assets/elementos-graficos/onda-inferior-sessao.svg" class="element-gal-fotos">
    </div>
</body>

<!-- Modais -->
<div class="sombra-modal admin" id="modal_criar_sessao">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Criar sessão para: <span id="nome_referencia"></span></h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" width="20px">
            </button>
        </div>
        <div class="modal-body">
            <form id="formCriarSessao">
                <p class="error" id="cadSessao_error"></p>
                <div class="input-padrao">
                    <span>Nome da sessão:</span>
                    <input type="text" name="nome_sessao">
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn">Criar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="sombra-modal admin" id="modal_criar_servico">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Criar serviço</h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
        </div>
        <div class="modal-body">
            <form id="formCriarServico">
                <p class="error" id="cadServicos_error"></p>
                <div class="campos-form-inputpadrao">
                    <div class="input-padrao">
                        <span>Nome do serviço:</span>
                        <input type="text" name="nome_servico">
                    </div>
                    <div class="imagem-servico img-box">
                        <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" class="icon">
                        <input type="file" name="imagem_servico">
                    </div>
                    <div class="descricao-servico">
                        <div class="input-padrao">
                            <span>Descrição:</span>
                            <input type="text" name="descricao">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn">Criar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="sombra-modal admin" id="modal_add_foto_galeria">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Adicionar Foto</h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
        </div>
        <div class="modal-body">
            <form id="formAddFotoGaleria">
                <p class="error" id="cadFotoGaleria_error"></p>
                <div class="campos-form-inputpadrao">
                    <div class="imagem-servico img-box">
                        <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" class="icon">
                        <input type="file" name="foto">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn">Adicionar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="sombra-modal admin" id="modal_excluir_sessao">
    <div class="bloco-modal-geral">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Deseja mesmo excluir a sessão?</h2>
                <button class="btn-fechar-modal">
                    <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
                </button>
            </div>
            <hr>
            <form id="formLogout">
                <div class="botoes-excluir-sessao">
                    <button class="btn" name="sim">Sim</button>
                    <button class="btn" onclick="fecharModal('modal_logout')">Não</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>