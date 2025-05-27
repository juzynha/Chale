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
<h2> nome:Gabriel cardoso <h2>
<h3> email:Gabriel.cardoso@gmail.com <h3>
    </div>
</div>

<div class="acoes">
    <h3> Ações </h3>
    <ul>
        <li><a herf="#">Consultar preços e promoções<a/></li>
        <li><a herf="#">Consultar reservas<a/></li>
        <li><a herf="#">Editar calendário<a/></li>
    </ul>
</div>
<div class="confi-conta">
    <h3> Configurações da conta </h3>
    <ul>
        <li><a herf="#">Criar outra conta administradora<a/>  +  </li>
        <li><a herf="#">Ver contas adiministradoras<a/></li>
        <li><a herf="#">Editar dados<a/></li>
        <li><a herf="#">Excluir conta<a/></li>
        <li><a herf="#">Sair<a/></li>
    </ul>
</div>
<?php
require_once __DIR__ . '/../layouts/footer.php';
?>


