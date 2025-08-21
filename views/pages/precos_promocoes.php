<?php
require_once __DIR__ . '/../layouts/header.php';
?>

<body data-page="precos_promocoes">
    <header class="cabecalho">
        <?php
        require_once __DIR__ . '/../layouts/menu.php';
        ?>
    </header>
    <!-- Preços -->
    <section class="container">
        <h2 class="subtitulo verde-escuro">Preços</h2>
        <div class="container-bloco-preco">
            <div class="card-infos-preco">
                <div class="diaria-preco">
                    <p>Diária: R$ <strong name="preco_diaria"></strong></p>
                    <p>Diária fim de semana: R$ <strong name="preco_diaria_fds"></strong></p>
                </div>
                <img src="/chale/public/assets/icons/icon-editar.svg" class="lapzinho" onclick="abrirModal('modal_alterar_preco')">
            </div>
        </div>
    </section>
    <hr>

    <!-- Promoções -->
    <section class="container">
        <h2 class="subtitulo verde-escuro">Promoções</h2>   
        <div class="ferramenta" onclick="abrirModal('modal_cadalt_promocao')">
            <p>Criar Promoção</p>
            <img src="/chale/public/assets/icons/icon-adicionar.svg" class="add-promocao">
        </div>
        <div class="card-promocoes">
            <h3 class="nome-promocao">Promoção de Natal</h3>
            <div class="promo-content">
                <div class="bloco-promocoes-esquerdo">
                    <div class="date-container">
                        <div class="date-group">
                            <span class="date-label">Início</span>
                            <hr class="divider-horizontal">
                            </hr>
                            <input type="date" class="date-input" name="data_inicial">
                        </div>
                        <hr class="divider-vertical">
                        </hr>
                        <div class="date-group">
                            <span class="date-label">Fim</span>
                            <hr class="divider-horizontal">
                            </hr>
                            <input type="date" class="date-input" name="data_final">
                        </div>
                    </div>
                    <div class="promocoes-preco">
                        <p>Diária: R$ <strong name="preco_diaria-promocoes"></strong></p>
                        <p>Diária fim de semana: R$ <strong name="preco_promocoes_fds"></strong></p>
                    </div>
                </div>
                <div class="icones-promocoes">
                    <img src="/chale/public/assets/icons/icon-editar.svg" class="lapzinho">
                    <img src="/chale/public/assets/icons/icon-lixeira.svg" class="lixeirinha" onclick="abrirModal('modal_excluir_promocao')">
                </div>
            </div>
        </div>
    </section> 
</body>

<div class="sombra-modal" id="modal_excluir_promocao">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Deseja excluir promoção? <span id="nome_referencia"></span></h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" width="20px">
            </button>
        </div>
        <div class="modal-body">
            <form id="formExcluirPromocao">
                <p class="error" id="excluirpromocao_error"></p>
                <div class="input-padrao">
                    <span>Nome da promoção:</span>
                    <input type="text" name="nome_promocao">
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn">Excluir</button>
                </div>
            </form>
        </div>
    </div>
</div>


<div class="sombra-modal" id="modal_alterar_preco">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Editar Preços <span id="nome_referencia"></span></h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" width="20px">
            </button>
        </div>
        <div class="modal-body">
            <form id="formAlterarPreco">
                <p class="error" id="altpreco_error"></p>
                <div class="input-padrao">
                    <span>Diária:</span>
                    <input type="text" name="nome_diaria">
                </div>
                <div class="input-padrao">
                    <span>Diária fim de semana:</span>
                    <input type="text" name="nome_diariafds">
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn">Salvar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php
    require_once __DIR__ . '/../modals/CadAltPromocao.php';
    require_once __DIR__ . '/../layouts/footer.php';
?>