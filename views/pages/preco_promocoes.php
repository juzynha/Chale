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
        <h2 class="subtitulo verde-escuro">Preços</h2>
        <div class="filtro">
            <input type="text" id="data_filtro">
            <img src="/chale/public/assets/icons/icon-funil.svg" width="20px">
        </div>