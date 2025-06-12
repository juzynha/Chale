<?php
require_once __DIR__ . '/../layouts/header.php';
?>
<header class="cabecalho">
    <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
</header>
<div class="container">
    <h2 class="titulo">Utilitários</h2>
    <div class="utilitarios">
        <div class="sessao-cards-utilitarios">
            <h2 class="subtitulo">Título da sessão</h2>
            <div class="cards-utilitarios">
                <div class="card-utilitario">
                    <p class="nome-utilitario">Nome do utilitario</p>
                    <div class="imagem-utilitario">
                        <img src="" alt="">
                    </div>
                    <div class="descricao-utilitario">
                        <p>Texto descritivo do utilitario aaaaaaa aaaaaaaaaa asdasdhasd ahbsdhqywdbnxchadsy ash uahd basdh uawhd abjshdhawudh jakjhwduhasjnjwbdb nasda</p>
                    </div>
                </div>
                <div class="card-utilitario">
                    <p class="nome-utilitario">Nome do utilitario</p>
                    <div class="imagem-utilitario">
                        <img src="" alt="">
                    </div>
                    <div class="descricao-utilitario">
                        <p>Texto descritivo do utilitario aaaaaaa aaaaaaaaaa asdasdhasd ahbsdhqywdbnxchadsy ash uahd basdh uawhd abjshdhawudh jakjhwduhasjnjwbdb nasda</p>
                    </div>
                </div>
            </div>
            <div class="opcao-editar-sessao verde-medio">
                <p>Editar sessão</p>
                <img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icon">
            </div>
            <hr>
        </div>
        <div class="sessao-cards-utilitarios">
            <h2 class="subtitulo">Título da sessão</h2>
            <div class="cards-utilitarios">
                <div class="card-utilitario-add" onclick="abrirModal('modal_criar_utilitario')">
                    <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" width="50px">
                </div>
            </div>
            <hr>
        </div>
        <div class="opcao-criar-sessao verde-medio" onclick="abrirModal('modal_criar_sessao')">
             <p>Criar sessão</p>
            <img src="/chale/public/assets/icons/icon-adicionar.svg" class="icon">
        </div>
    </div>
</div>
<!-- Modais -->
<div class="sombra-modal" id="modal_criar_sessao">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Criar sessão para: Utilitários</h2>
            <button onclick="fecharModal('modal_criar_sessao')">
                <img src="/chale/public/assets/icons/icon-close.svg" width="20px">
            </button>
        </div>
        <div class="modal-body">
            <form id="formCriarSessao" class="form-inputcomum">
                <div class="input-padrao">
                    <label for="conf_email" class="">Nome da sessão:</label>
                    <input type="text" id="criar_nome_sessao" name="criar_nome_sessao">
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn" id="criar_sessao">Criar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="sombra-modal" id="modal_criar_utilitario">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Criar utilitário</h2>
            <button onclick="fecharModal('modal_criar_utilitario')">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
        </div>
        <div class="modal-body">
            <form id="formCriarSessao" class="form-inputcomum">
                <div class="input-padrao">
                    <label for="conf_email" class="">Nome do utilitario:</label>
                    <input type="text" id="criar_nome_sessao" name="criar_nome_sessao">
                </div>
                <div class="imagem-utilitario">
                    <div class="icon-add-imagem">
                        <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" width="30px">
                    </div>
                </div>
                <div class="descricao-utilitario">
                    <div class="input-padrao">
                        <label for="conf_email" class="">Descrição:</label>
                        <input type="text" id="criar_nome_sessao" name="criar_nome_sessao">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn" id="criar_utilitario">Criar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>