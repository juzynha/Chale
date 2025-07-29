<?php
require_once __DIR__ . '/../layouts/header.php';
?>
<header class="cabecalho">
    <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
</header>
<div class="container">
    <h2 class="titulo verde-escuro">Utilitários</h2>
    <div class="utilitarios">
        <div class="sessao-utilitarios">
            <h3 class="subtitulo verde-medio">Título da sessão</h3>
            <div class="sessao-cards">
                <div class="card-utilitario-add" onclick="abrirModal('modal_criar_utilitario')">
                    <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" width="50px">
                </div>
                <div class="card-utilitario">
                    <p class="nome-utilitario">Nome do utilitario</p>
                    <div class="imagem-utilitario">
                        <img src="" alt="">
                    </div>
                    <div class="descricao-utilitario">
                        <p>Texto descritivo do utilitario aaaaaaa aaaaaaaaaa asdasdhasd ahbsdhqywdbnxchadsy ash uahd
                            basdh uawhd abjshdhawudh jakjhwduhasjnjwbdb nasda</p>
                    </div>
                </div>
                <div class="card-utilitario">
                    <p class="nome-utilitario">Nome do utilitario</p>
                    <div class="imagem-utilitario">
                        <img src="" alt="">
                    </div>
                    <div class="descricao-utilitario">
                        <p>Texto descritivo do utilitario aaaaaaa aaaaaaaaaa asdasdhasd ahbsdhqywdbnxchadsy ash uahd
                            basdh uawhd abjshdhawudh jakjhwduhasjnjwbdb nasda</p>
                    </div>
                </div>
            </div>
            <div class="ferramenta">
                <p>Editar sessão</p>
                <img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icon">
            </div>
            <hr>
        </div>
        <div class="sessao-utilitarios">
            <h2 class="subtitulo verde-medio">Título da sessão</h2>
            <div class="sessao-cards">
                <div class="card-utilitario-add" onclick="abrirModal('modal_criar_utilitario')">
                    <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" width="50px">
                </div>
            </div>
            <hr>
        </div>
        <div class="ferramenta" id="criar_sessao_utilitarios">
            <p>Criar sessão</p>
            <img src="/chale/public/assets/icons/icon-adicionar.svg" class="icon">
        </div>
    </div>
</div>
<div class="galeria-container">
    <img src="/chale/public/assets/elementos-graficos/onda-superior-sessao.svg" class="element-gal-fotos">
    <div class="galeria-de-fotos">
        <h2 class="titulo branco">Galeria de fotos</h2>
        <div class="galeria-content">
            <div class="sessao-fotos">
                <h3 class="subtitulo branco">Sessão 1</h3>
                <div class="sessao-cards">
                    <div class="item-foto">
                        <img src="" alt="">
                    </div>
                    <div class="item-foto">
                        <img src="" alt="">
                    </div>
                    <div class="item-foto">
                        <img src="" alt="">
                    </div>
                </div>
                <div class="ferramenta-branco">
                    <p>Editar sessão</p>
                    <img src="/chale/public/assets/icons/icon-editar.svg" class="icon">
                </div>
                <hr class="hr-branco">
            </div>
            <div class="sessao-fotos">
                <h3 class="subtitulo branco">Sessão 1</h3>
                <div class="sessao-cards">
                    <div class="item-foto">
                        <img src="" alt="">
                    </div>
                </div>
                <hr class="hr-branco">
            </div>
            <div class="ferramenta-branco" id="criar_sessao_fotos">
                <p>Criar sessão</p>
                <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" class="icon">
            </div>
        </div>
    </div>
    <img src="/chale/public/assets/elementos-graficos/onda-inferior-sessao.svg" class="element-gal-fotos">
</div>

<!-- Modais -->
<div class="sombra-modal" id="modal_criar_sessao">
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

<div class="sombra-modal" id="modal_criar_utilitario">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Criar utilitário</h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
        </div>
        <div class="modal-body">
            <form id="formCriarUtilitario">
                <p class="error" id="cadUtilitario_error"></p>
                <div class="campos-form-inputpadrao">
                    <div class="input-padrao">
                        <span>Nome do utilitario:</span>
                        <input type="text" name="nome_utilitario">
                    </div>
                    <div class="imagem-utilitario">
                            <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" class="icon">
                            <input type="file" name="imagem_utilitario">
                    </div>
                    <div class="descricao-utilitario">
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

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>