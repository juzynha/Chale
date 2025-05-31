<?php
require_once __DIR__ . '/../layouts/header.php';
?>
<header class="cabecalho">
    <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
</header>

<section class="perfil">
    <div class="usuario">
        <img src="/chale/public/assets/img-perfil.png" alt="avatar do usuario" width="100" height="100">
        <div>
            <h2>Nome: <?php echo htmlspecialchars($_SESSION['nome'] ?? 'Usuário'); ?></h2>
            <h3>Email: <?php echo htmlspecialchars($_SESSION['email'] ?? 'usuario@gmail.com'); ?></h3>
            <h3>Telefone: <?php echo htmlspecialchars($_SESSION['telefone'] ?? '(99)99408-9393'); ?></h3>
            <h3>Data de nascimento: <?php echo htmlspecialchars($_SESSION['data de nascimento'] ?? '00/00/0000'); ?></h3>
        </div>
    </div>

    <div class="Reservas">
        <h3>Ações</h3>
        <ul class="lista">
    <li><a href="#">À pagar</a></li>
    <li><a href="#">Em andamento</a></li>
    </ul>
    <p class="aviso-cancelamento">Caso queira cancelar reserva, entre em contato com o <strong>anfitrião</strong></p>

    </div>

    <div class="confi-conta">
        <h3>Configurações da conta</h3>
        <ul class="lista">
            <li><a href="#">Editar dados</a><img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icon"></li>
            <li><a href="#">Excluir conta</a><img src="/chale/public/assets/icons/icon-lixeira(verde).svg" class="icon"></li>
            <li><a href="#">Sair</a><img src="/chale/public/assets/icons/icon-logout.svg" class="icon"></li>
        </ul>
    </div>
</section>

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>
