<nav>
    <a href="/chale/index.php"><img src="/chale/public/assets/logo.svg" class="logo"></a>
    <ul>
        <li><a href="/chale/views/pages/o_chale.php">O Chalé</a></li>
        <li><a href="">Sobre nós</a></li>
        <li><a href="/chale/views/pages/faca_sua_reserva.php">Faça sua Reserva</a></li>
        <?php
        session_start();
        if (isset($_SESSION['logado']) && $_SESSION['logado'] === true && isset($_SESSION['tipo']) && $_SESSION['tipo'] === 'admin') {
        ?>
            <li><a href="">Admin <img src="public/assets/icons/icon-engrenagem.svg" width="18px"></a></li>
        <?php
        }
        ?>
    </ul>

    <?php
    if (isset($_SESSION['logado']) && $_SESSION['logado'] === true) {
        if (!empty($_SESSION['foto'])) {
    ?>
        <button class="user"><img src="<?= $_SESSION['foto'] ?>" alt=""></button>
    <?php
        } else {
    ?>
        <button class="user"><img src="public/assets/icons/icon-user.svg" class="icon"></button>
    <?php
        }
    ?>
    <?php
    } else {
    ?>
     <button onclick="abrirModal('modal_login')" class="entrar">Entrar</button>

    <?php
    }
    ?>
</nav>

<?php
require_once __DIR__ .'/../modals/login.php';
require_once __DIR__ .'/../modals/cadastro_usuario.php';
?> 
