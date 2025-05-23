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
<h2> Nome: <?php  echo htmlspecialchars($_SESSION['nome'] ?? 'Visitante')?></h3><h2>
<h3> Email: <?php  echo htmlspecialchars($_SESSION['email'] ?? 'Visitante.@gmail.com')?> <h3>
    </div>
</div>

<div class="acoes">
    <h3> Ações </h3>
    <ul>
        <li><a herf="#">Consultar preços e promoções<a/><img src="/chale/public/assets/icons/icon-(verde).svg" class="icone"  width="10"   height="10"></li>
        <li><a herf="#">Consultar reservas<a/><img src="/chale/public/assets/icons/icon-(verde).svg" class="icone"  width="10"   height="10"></li>
        <li><a herf="#">Editar calendário<a/><img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icone"  width="10"   height="10"></li>
    </ul>
</div>
<div class="confi-conta">
    <h3> Configurações da conta </h3>
    <ul>
        <li><a herf="#">Criar outra conta administradora<a/><img src="/chale/public/assets/icons/icon-adicionar.svg" class="icone"  width="10"   height="10"></li>
        <li><a herf="#">Ver contas adiministradoras<a/><img src="/chale/public/assets/icons/icon-administradores.svg" class="icone"  width="10"   height="10"></li>
        <li><a herf="#">Editar dados<a/><img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icone"  width="10"   height="10"></li>
        <li><a herf="#">Excluir conta<a/><img src="/chale/public/assets/icons/icon-lixeira(verde).svg" class="icone"  width="10"   height="10"></li>
        <li><a herf="#">Sair<a/><img src="/chale/public/assets/icons/icon-logout.svg" class="icone"  width="10"   height="10"></li></li>
    </ul>
</div>
<?php
require_once __DIR__ . '/../layouts/footer.php';
?>




