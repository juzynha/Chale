<nav>
    <a href="/chale/index.php"><img src="/chale/public/assets/logo.svg" class="logo"></a>

    <input type="checkbox" id="menu-toggle" class="menu-toggle">

    <label for="menu-toggle" class="hamburguer" id="hamburguer">
        <span></span>
        <span></span>
        <span></span>
    </label>

    <ul class="menu-nav">
        <li><a href="/chale/views/pages/o_chale.php">O Chalé</a></li>
        <div class="barra"></div>
        <li><a href="/chale/views/pages/sobre_nos.php">Sobre nós</a></li>
        <div class="barra"></div>
        <li><a href="/chale/views/pages/faca_sua_reserva.php">Faça sua Reserva</a></li>
        <?php
        session_start();
        if (isset($_SESSION['usuario']) && $_SESSION['usuario']['tipo'] === 'admin') {
        ?>
            <li><a href="">Admin <img src="/chale/public/assets/icons/icon-engrenagem.svg" width="18px"></a></li>
        <?php
        }
        ?>
    </ul>
    <?php
    if (isset($_SESSION['usuario'])) {
    ?>
        <button class="user"><a href="/chale/views/pages/conta_admin.php"><img
                    src="/chale/public/assets/icons/icon-user.svg" class="icon"></a></button>
    <?php
    } else {
    ?>
        <button onclick="abrirModal('modal_login')" class="entrar">Entrar</button>

    <?php
    }
    ?>

</nav>

<div class="nav roll">

    <script>
        const hamburguer = document.getElementById('hamburguer');
        const menu = document.querySelector('.menu-nav');

        hamburguer.addEventListener('click', (e) => {
            if (menu.style.display === 'flex') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'flex';
            }
        });
    </script>

    <?php
    require_once __DIR__ . '/../modals/login.php';
    require_once __DIR__ . '/../modals/CadAltUsuario.php';
    ?>