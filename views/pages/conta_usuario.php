<?php
require_once __DIR__ . '/../layouts/header.php';
?>
<header class="cabecalho">
    <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
</header>
<div class="container-conta">
    <section class="perfil">
        <div class="admin-fotoperfil">
            <img src="/chale/public/assets/icons/icon-user.svg" alt="avatar do adimin" width="100px">
        </div>
        <ul class="admin-infos">
            <li class="nome-usuario">Nome: Nome do admin</li>
            <li>Email: admin@gmail.com</li>
            <li>Telefone: (99)99999-9999</li>
            <li>Data de nascimento: 00/00/0000</li>
        </ul>
    </section>
    <section class="conteudo-conta">
        <section class="sessao-conta">
            <div class="titulo-sessao-conta">
                <h2>Reservas</h2>
                <hr>
            </div>
            <ul class="titulo-sessao-conta">
                <li class="itens-sessao-conta">
                    <a href="#">À pagar</a>
                    <img src="/chale/public/assets/icons/icon-seta-baixo.svg" class="icon">
                </li>
                <li class="itens-sessao-conta">
                    <a href="#">Em andamento</a>
                    <img src="/chale/public/assets/icons/icon-seta-baixo.svg" class="icon">
                </li>
            </ul>
        </section>
        <section class="sessao-conta">
            <div class="titulo-sessao-conta">
                <h2>Configurações da conta</h2>
                <hr>
            </div>
            <ul class="titulo-sessao-conta">
                <li class="itens-sessao-conta">
                    <div>
                        <a href="#">Editar dados</a>
                        <img src="/chale/public/assets/icons/icon-editar(verde-escuro).svg" class="icon">
                    </div>
                </li>
                <li class="itens-sessao-conta">
                    <div>
                        <a href="#">Excluir conta</a>
                        <img src="/chale/public/assets/icons/icon-lixeira(verde-escuro).svg" class="icon">
                    </div>
                </li>
                <li class="itens-sessao-conta">
                    <div>
                        <a href="#">Sair</a>
                        <img src="/chale/public/assets/icons/icon-logout.svg" class="icon">
                    </div>
                </li>
            </ul>
        </section>
    </section>
</div>

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>