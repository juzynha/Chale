<?php
require_once __DIR__ . '/../layouts/header.php';
?>
<header class="cabecalho">
    <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
</header>
<section class="limita-tamanho container" id="container_reservas">
    <h2 class="subtitulo">Reservas</h2>
    <div class="filtro">
        <input type="text" id="data_filtro">
        <img src="/chale/public/assets/icons/icon-funil.svg" width="20px">
    </div>
    <div id="lista_reservas"> 
        <!--Aqui vai os cards das reservas -->
    </div>
</section>
<div id="mostrar_lista">
    <p>Mostrar tudo</p>
</div>
<section class="container-calendario container">
    <h2 class="subtitulo">Calendário</h2>
    <div class="sessao-calendario">
        <div class="atualizar-calendario">
            <div class="ferramenta-calendario">
                <p>Atualizar calendário</p>
                <img src="/chale/public/assets/icons/icon-atualizar.svg" class="icon">
            </div>
        </div>
        <div id="calendar">
        <!--Aqui vai a montagem do calendário-->
        </div>
        <div class="acoes-calendario">
            <div class="ferramenta-calendario" onclick="abrirModal('modal_criar_promocao')">
                <p>Criar promoção</p>
                <img src="/chale/public/assets/icons/icon-adicionar.svg" class="icon">
            </div>
            <div class="ferramenta-calendario" onclick="abrirModal('modal_bloquear_dias')">
                <p>Bloquear dias</p>
                <img src="/chale/public/assets/icons/icon-bloquear.svg" class="icon">
            </div>
        </div>
    </div>
</section>
<!-- Modais -->
<div class="sombra-modal" id="modal_bloquear_dias">
    <div class="bloco-modal-geral">
         <div class="modal-header">
            <h2>Bloquear dias</h2>
            <button onclick="fecharModal('modal_bloquear_dias')">
                <img src="/chale/public/assets/icons/icon-close.svg" width="20px">
            </button>
        </div>
        <div class="modal-body">
            <form id="formBloquearDias">
                <div class="date-container">
                    <div class="date-group">
                        <span class="date-label">Início</span>
                        <div class="divider-horizontal"></div>
                        <input type="date" class="date-input" id="start-date" >
                    </div>
                    <div class="divider-vertical"></div>
                    <div class="date-group">
                        <span class="date-label">Fim</span>
                        <div class="divider-horizontal"></div>
                        <input type="date" class="date-input" id="end-date">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn" id="criar_promocao">Bloquear</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php
require_once __DIR__ . '/../layouts/footer.php';
require_once __DIR__ . '/../modals/criar_promocao.php';
?>