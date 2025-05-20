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
        <img src="/chale/public/assets/icons/icon-user.svg" alt="avatar do usuario" width="100"   height="100">
        <div>
<h2> Gabriel cardoso <h2>
<h3> Email:Gabriel.cardoso@gmail.com <h3>
<h3> Telefone:(14)9908-9303</h3>    
<h3> Data de nascimento:04/11/2020</h3>
  </div>
</div>

<div class="reservas">
    <h3> Reservas </h3>
    <ul>
        <li><a href="#">À pagar</a></li>
        <li><a href="#">Em andamento</a></li>
    </ul>
</div>
<div class="confi-conta">
    <h3> Configurações da conta </h3>
    <ul>
        <ul>
  <li>
    <a href="#">
      Editar dados
      <img src="assets/icons/icon-editar(verde).svg" alt="Editar" class="icone">
    </a>
  </li>
  <li>
    <a href="#">
      Excluir conta
      <img src="assets/icons/icon-lixeira(verde).svg" alt="Excluir" class="icone">
    </a>
  </li>
  <li>
    <a href="#">
      Sair
      <img src="assets/icons/icon-logout.svg" alt="Sair" class="icone">
    </a>
  </li>
</ul>


    </ul>
</div>
<?php
require_once __DIR__ . '/../layouts/footer.php';
?>


