<?php
require_once __DIR__ . '/../layouts/header.php';
?>

<header class="cabecalho">
    <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
</header>

<div class="container">
    <h1>Faça sua reserva no Chalé La Vie en Rose</h1>
</div>
<div class="carousel-container">
    <div class="button" id="prevBtn"><img src="/chale/public/assets/icons/seta-left"></div>
        <div class="carousel">
            <div class="carousel-item small-left">
                <img src="imagens/img1.jpeg">
            </div>
            <div class="carousel-item mid-left">
                <img src="imagens/img2.jpeg">
            </div>
            <div class="carousel-item center">
                <img src="imagens/img3.jpeg">
            </div>
            <div class="carousel-item mid-right">
                <img src="imagens/img4.jpeg">
            </div>
            <div class="carousel-item small-right">
                <img src="imagens/img5.jpeg">
            </div>
        </div>
    <div class="button" id="nextBtn"><img src="/chale/public/assets/icons/seta-right"></div>
</div>
<div class="container espaçamento">
    <div class="bloco-infos-reserva">
        <div class="infos">
            
        </div>
        <div class="bloco-footer">

        </div>
    </div>
</div>

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>