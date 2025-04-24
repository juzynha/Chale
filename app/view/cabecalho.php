<nav>
    <img src="public/assets/imagens/logo.svg" class="logo">
    <ul>
        <li><a href="">O Chalé</a></li>
        <li><a href="">Sobre nós</a></li>
        <li><a href="">Faça sua Reserva</a></li>
        <?php
        session_start();
        if (isset($_SESSION['logado']) && $_SESSION['logado'] === true && isset($_SESSION['tipo']) && $_SESSION['tipo'] === 'admin') {
        ?>
            <li><a href="">Admin <img src="/chale/public/assets/imagens/icons/icon-engrenagem.svg" width="18px"></a></li>
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
        <button class="user"><img src="/chale/public/assets/imagens/icons/icon-user.svg" class="icon"></button>
    <?php
        }
    ?>
    <?php
    } else {
    ?>
        <button class="entrar" id="entrar">Entrar</button>
    <?php
    }
    ?>
</nav>
