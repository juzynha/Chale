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
        </ul>
    </section>
    <section class="conteudo-conta">
        <section class="sessao-conta">
            <div class="titulo-sessao-conta">
                <h2>Ações</h2>
                <hr>
            </div>
            <div class="titulo-sessao-conta">
                <div class="itens-sessao-conta">
                    <div class="item-descricao">
                        <div class="escrita-item-sessao">
                            <a href="">Consultar preços e promoções</a>
                        </div>
                    </div>
                </div>
                <div class="itens-sessao-conta">
                    <div class="item-descricao">
                        <div class="escrita-item-sessao">
                            <a href="">Consultar reservas</a>
                        </div>
                    </div>
                </div>
                <div class="itens-sessao-conta">
                    <div class="item-descricao">
                        <div class="escrita-item-sessao">
                            <a href="">Editar calendário</a>
                        </div>
                    </div>
                </div>
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
                            <p>Criar outra conta administradora</p>
                            <img src="/chale/public/assets/icons/icon-adicionar.svg" class="icon">
                        </div>
                    </div>
                </div>
                <div class="itens-sessao-conta">
                    <div class="item-descricao">
                        <div class="escrita-item-sessao">
                            <p>Ver contas administradoras</p>
                            <img src="/chale/public/assets/icons/icon-administradores.svg" class="icon">
                        </div>
                    </div>
                </div>
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
                        <div class="escrita-item-sessao" onclick="abrirModal('modal_sair')">
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
require_once __DIR__ .'/../modals/sair_conta.php';
?>