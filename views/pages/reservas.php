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
            <div class="ferramenta-calendario">
                <p>Criar promoção</p>
                <img src="/chale/public/assets/icons/icon-adicionar.svg" class="icon">
            </div>
            <div class="ferramenta-calendario">
                <p>Bloquear dias</p>
                <img src="/chale/public/assets/icons/icon-bloquear.svg" class="icon">
            </div>
        </div>
    </div>
</section>
<div>
    
</div>

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>