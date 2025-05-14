<?php
require_once __DIR__ . '/../layouts/header.php';
?>
<header class="cabecalho">
    <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
    

    <div class="icone-perfil-cabecalho">
        <img src="/chale/public/assets/icon-user.svg" alt="ícone do perfil" width="40" height="40">
    </div>
</header>

<section class="perfil">
    <div class="usuario">
        <img src="/chale/public/assets/icon-user.svg" alt="avatar do usuario" width="100" height="100">
        <div>
            <h2> nome: Gabriel Cardoso </h2>
            <h3> email: Gabriel.cardoso@gmail.com </h3>
            <h3> telefone: (11) 99891-0191 </h3>
            <h3> Data de nascimento: 01/01/2000 </h3>
        </div>
    </div>
</section>




<div class="acoes">
    <h3> Ações </h3>
    <ul>
        <li><a herf="#">À pagar</a></li>
        <li><a herf="#">Em andamento</a></li>
        
        <h3>Caso queira cancelar uma reserva, entre em contato com o anfitrião.</h3>     
    </ul>
</div>
<section class="configuracoes-conta">
  <h3>Configurações da conta</h3>

  <button class="botao-configuracao">
    <img src="/chale/public/assets/icon-editar(verde).svg" alt="Editar dados" width="16">
    Editar dados
  </button>

  <button class="botao-configuracao">
    <img src="/chale/public/assets/icon-lixeira(verde).svg" alt="Excluir conta" width="16">
    Excluir conta
  </button>

  <button class="botao-configuracao">
    <img src="/chale/public/assets/icon-logout.svg" alt="Sair" width="16">
    Sair
  </button>
</section>

<?php
require_once __DIR__ . '/../layouts/footer.php';

?>


