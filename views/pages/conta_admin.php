<?php
require_once __DIR__ . '/../layouts/header.php';
?>
<header class="cabecalho">
    <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
</header>
<section class="perfil">
    <div class="adimin">
        <img src="/chale/public/assets/img-perfil.png" alt="avatar do adimin" width="100"   height="100">
        <div>
<h2> Nome: <?php  echo htmlspecialchars($_SESSION['nome'] ?? 'Administrador')?></h3><h2>
<h3> Email: <?php  echo htmlspecialchars($_SESSION['email'] ?? 'Administrador.@gmail.com')?> <h3>
    </div>
</div>

<div class="acoes">
    <h3> Ações </h3>
    <ul class="lista">
        <li><a href="#">Consultar preços e promoções</a></li>
        
        <li><a href="#">Consultar reservas</a></li>

        <li><a href="#">Editar calendário</a></li>
    </ul>
</div>
<div class="confi-conta">
    <h3> Configurações da conta </h3>
    <ul class="lista">
        <li><a href="#">Criar outra conta administradora</a><img src="/chale/public/assets/icons/icon-adicionar.svg" class="icon"  width="10" height="10" style="margin-left: 8px;"></li>
        
        <li><a href="#">Ver contas adiministradoras</a><img src="/chale/public/assets/icons/icon-administradores.svg" class="icon"  width="10" height="10" style="margin-left: 8px;"></li>

        <li><a href="#">Editar dados</a><img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icon"  width="10" height="10" style="margin-left: 8px;"></li>

        <li><a href="#">Excluir conta</a><img src="/chale/public/assets/icons/icon-lixeira(verde).svg" class="icon"  width="10"   height="10" style="margin-left: 8px;"></li>

        <li><a href="" id="sair">Sair</a><img src="/chale/public/assets/icons/icon-logout.svg" class="icon"  width="10"   height="10" style="margin-left: 8px;">
    </li>
</li>
    </ul>
</div>
<?php
require_once __DIR__ . '/../layouts/footer.php';
?>




