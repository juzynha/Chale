<?php
require_once __DIR__ . '/../layouts/header.php';
?>
<header class="cabecalho">
    <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
</header>
<section class="limita-tamanho">
    <div class="filtro">
        <input type="text" id="data_filtro">
        <img src="/chale/public/assets/icons/icon-funil.svg" width="20px">
    </div>
    <div id="lista_reservas"> 
        <!--Aqui vai os cards das reservas -->
    </div>
</section>
<div class="mostrar-tudo">
    <p>Mostrar tudo</p>
</div>

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>