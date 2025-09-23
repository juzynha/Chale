<nav id="nav_menu">
    <a href="/chale/index.php"><img src="/chale/public/assets/logo.svg" class="logo"></a>

    <input type="checkbox" id="menu-toggle" class="menu-toggle">

    <label for="menu-toggle" class="hamburguer" id="hamburguer">
        <span></span>
        <span></span>
        <span></span>
    </label>

    <ul class="menu-nav" id="lista_menu">
        <li><a href="/chale/views/pages/o_chale.php">O Chalé</a></li>
        <div class="barra"></div>
        <li><a href="/chale/views/pages/sobre_nos.php">Sobre nós</a></li>
        <div class="barra"></div>
        <li><a href="/chale/views/pages/faca_sua_reserva.php">Faça sua Reserva</a></li>
    </ul>
</nav>

<div class="nav roll">

</div>

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