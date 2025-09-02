<?php
require_once __DIR__ . '/../layouts/header.php';
?>

<body data-page="reservas">
    <header class="cabecalho">
        <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
    </header>
    <section class="container-reservas" id="container_reservas">
        <h2 class="subtitulo verde-escuro">Reservas</h2>
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
    <section class="container-calendario">
        <h2 class="subtitulo verde-escuro">Calendário</h2>
        <div class="container-elementos">
            <img src="/chale/public/assets/elementos-graficos/onda-calendario-left.svg" class="element-planta-left">
            <img src="/chale/public/assets/elementos-graficos/onda-calendario-right.svg" class="element-planta-right">
            <div class="sessao-calendario">
                <div class="atualizar-calendario">
                    <div class="ferramenta">
                        <p>Atualizar calendário</p>
                        <img src="/chale/public/assets/icons/icon-atualizar.svg" class="icon">
                    </div>
                </div>
                <div class="calendario-box">
                    <header>
                        <img src="/chale/public/assets/icons/icon-seta-left(branco).svg" class="icon prev">
                        <span class="currentMonth"></span>
                        <img src="/chale/public/assets/icons/icon-seta-right(branco).svg" class="icon next">
                    </header>
                    <div class="calendario-content">
                        <hr class="divider-horizontal-cal">
                        <ul class="weeks">
                            <li>Dom</li>
                            <hr class="divider-vertical-cal">
                            <li>Seg</li>
                            <hr class="divider-vertical-cal">
                            <li>Ter</li>
                            <hr class="divider-vertical-cal">
                            <li>Qua</li>
                            <hr class="divider-vertical-cal">
                            <li>Qui</li>
                            <hr class="divider-vertical-cal">
                            <li>Sex</li>
                            <hr class="divider-vertical-cal">
                            <li>Sab</li>
                        </ul>
                        <hr class="divider-horizontal-cal">
                        <ul class="days" onclick="abrirModal('modal_promocao/bloqueio')"></ul>
                    </div>
                </div>
                <div class="acoes-calendario">
                    <div class="ferramenta" onclick="abrirModalCadastrarPromocao()">
                        <p>Criar promoção</p>
                        <img src="/chale/public/assets/icons/icon-adicionar.svg" class="icon">
                    </div>
                    <div class="ferramenta" onclick="abrirModal('modal_bloquear_dias')">
                        <p>Bloquear dias</p>
                        <img src="/chale/public/assets/icons/icon-bloquear.svg" class="icon">
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>

<!-- Modais -->
<div class="sombra-modal" id="modal_bloquear_dias">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Bloquear dias</h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" width="20px">
            </button>
        </div>
        <div class="modal-body">
            <form id="formBloquearDias">
                <div class="date-container">
                    <div class="date-group">
                        <span class="date-label">Início</span>
                        <div class="divider-horizontal"></div>
                        <input type="date" class="date-input" name="data_inicial">
                    </div>
                    <div class="divider-vertical"></div>
                    <div class="date-group">
                        <span class="date-label">Fim</span>
                        <div class="divider-horizontal"></div>
                        <input type="date" class="date-input" name="data_final">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn" id="bloquear">Bloquear</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="sombra-modal" id="modal_promocao/bloqueio">
    <div class="bloco-modal-geral">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="bloque_dia">Bloquear Dia</h2>
                <hr>
                 <h2>Criar Promoção</h2>
                <button class="btn-fechar-modal">
                    <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
                </button>
               
            </div>
            <hr>
        
        </div>
    </div>
</div>

<?php
require_once __DIR__ . '/../modals/CadAltPromocao.php';
require_once __DIR__ . '/../modals/excluir.php';
require_once __DIR__ . '/../layouts/footer.php';
?>