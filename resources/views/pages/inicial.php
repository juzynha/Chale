<?php
require_once __DIR__ . '/../resources/views/layouts/header.php';
?>

<header>
    <div class="background">
        <img src="public/assets/imagens/img-hero.png" alt="">
    </div>
    <?php
    require 'resources/views/layouts/menu.php';
    ?>
    <div class="hero">
        <h1>Seja bem vindo ao chalé <p>la vie en rose</p></h1>
    </div>
</header>

<?php
require_once __DIR__ . 'resources/views/layouts/footer.php'
?>