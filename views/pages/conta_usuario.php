<?php
require_once __DIR__ . '/../layouts/header.php';
?>

<body data-page="conta_usuario">
    <header class="cabecalho">
        <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
    </header>
    <div class="container-conta">
        <section class="perfil" id="containerContaUsuario">
            <div class="admin-fotoperfil" name="foto_perfil">
                <!-- Foto do usuário -->
            </div>
            <ul class="admin-infos" name="infos_conta">
                <!-- Infos do usuário (nome,email,telefone,data de nascimento) -->
            </ul>
        </section>
        <section class="conteudo-conta">
            <section class="sessao-conta">
                <div class="titulo-sessao-conta">
                    <h2>Reservas</h2>
                    <hr>
                </div>
                <div class="titulo-sessao-conta">
                    <div class="itens-sessao-conta" id="resAPagar">
                        <div class="item-descricao">
                            <p>À pagar</p>
                            <div class="descer-container-reservas">
                                <p id="numeroReservasNPagas"></p>
                                <img src="/chale/public/assets/icons/icon-seta-left(verde).svg" class="icon" name="seta" onclick="abrirContainer('resAPagar')">
                            </div>
                        </div>
                        <div class="sessao-lista-reservas" name="content">
                            <p>Você pode editar sua reserva enquanto ela não tiver sido paga!</p>
                            <div class="lista-reservas" id="reservas_nao_pagas">
                                <!-- Lista de reservas não pagas do usuario -->
                            </div>
                        </div>
                    </div>
                    <div class="itens-sessao-conta" id="resEmAnd">
                        <div class="item-descricao">
                            <p>Em andamento</p>
                            <div class="descer-container-reservas">
                                <p id="numeroReservasPagas"></p>
                                <img src="/chale/public/assets/icons/icon-seta-left(verde).svg" class="icon" name="seta" onclick="abrirContainer('resEmAnd')">
                            </div>
                            
                        </div>
                        <div class="sessao-lista-reservas" name="content">
                            <div class="lista-reservas">
                                
                            </div>
                        </div>
                    </div>
                    <p class="aviso-cancelamento">Caso queira cancelar a reserva, entre em contato com o
                        <strong>anfitrião.</strong>
                    </p>
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
                            <div class="escrita-item-sessao" onclick="abrirModal('modal_digite_sua_senha')">
                                <p>Editar dados</p>
                                <img src="/chale/public/assets/icons/icon-editar(verde-escuro).svg" class="icon">
                            </div>
                        </div>
                    </div>
                    <div class="itens-sessao-conta">
                        <div class="item-descricao">
                            <div class="escrita-item-sessao" onclick="abrirModal('modal_excluir_conta')">
                                <p>Excluir conta</p>
                                <img src="/chale/public/assets/icons/icon-lixeira(verde-escuro).svg" class="icon">
                            </div>
                        </div>
                    </div>
                    <div class="itens-sessao-conta">
                        <div class="item-descricao">
                            <div class="escrita-item-sessao" onclick="abrirModal('modal_logout')">
                                <p>Sair</p>
                                <img src="/chale/public/assets/icons/icon-logout.svg" class="icon">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</body>

<?php
require_once __DIR__ . '/../modals/pagamento.php';
require_once __DIR__ . '/../modals/digite_sua_senha.php';
require_once __DIR__ . '/../modals/excluir_conta.php';
require_once __DIR__ . '/../modals/sair_conta.php';
require_once __DIR__ . '/../layouts/footer.php';
?>