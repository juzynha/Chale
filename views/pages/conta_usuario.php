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
            <li>Data de nascimento: 13/12/1989</li>
        </ul>
    </section>
    <section class="conteudo-conta">
        <section class="sessao-conta">
            <div class="titulo-sessao-conta">
                <h2>Reservas</h2>
                <hr>
            </div>
            <div class="titulo-sessao-conta">
                <div class="itens-sessao-conta">
                    <div class="item-descricao">
                        <p>À pagar</p>
                        <img src="/chale/public/assets/icons/icon-seta-baixo.svg" class="icon">
                    </div>
                    <div class="sessao-reservas-a-pagar">
                        <p>Você pode editar sua reserva enquanto ela não tiver sido paga!</p>
                        <div class="reservas-a-pagar">
                            <div class="reserva-a-pagar">
                                <!-- aqui é o bloquinho de reserva -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="itens-sessao-conta">
                    <div class="item-descricao">
                        <p>Em andamento</p>
                        <img src="/chale/public/assets/icons/icon-seta-baixo.svg" class="icon">
                    </div>
                    <div class="sessao-reservas-a-pagar">
                        <p>Você pode editar sua reserva enquanto ela não tiver sido paga!</p>
                        <div class="reservas-a-pagar">
                            <div class="reserva-a-pagar">
                                <!-- aqui é o bloquinho de reserva -->
                            </div>
                        </div>
                    </div>
                </div>
                <p class="aviso-cancelamento">Caso queira cancelar a reserva, entre em contato com o <strong>anfitrião.</strong></p> 
            </div>
        </section>
        <section class="sessao-conta">
            <div class="titulo-sessao-conta">
                <h2>Configurações da conta</h2>
                <hr>
            </div>
            <div class="titulo-sessao-conta">
                <div class="itens-sessao-conta">
                    <div class="item-descricao">
                        <div class="escrita-item-sessao">
                            <p>Editar dados</p>
                            <img src="/chale/public/assets/icons/icon-editar(verde-escuro).svg" class="icon">
                        </div>
                    </div>
                </div>
                <div class="itens-sessao-conta">
                    <div class="item-descricao">
                        <div class="escrita-item-sessao">
                            <p>Excluir conta</p>
                            <img src="/chale/public/assets/icons/icon-lixeira(verde-escuro).svg" class="icon">
                        </div>
                    </div>
                </div>
                <div class="itens-sessao-conta">
                    <div class="item-descricao">
                        <div class="escrita-item-sessao">
                            <p>Sair</p>
                            <img src="/chale/public/assets/icons/icon-logout.svg" class="icon">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</div>

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>