<?php
require_once __DIR__ . '/../layouts/header.php';
?>

<body data-page="conta_admin">
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
                <li class="nome-usuario"> Nome do admin</li>
                <li>E-mail: admin@gmail.com</li>
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
                                <a href="/chale/views/pages/reservas.php">Consultar reservas</a>
                            </div>
                        </div>
                    </div>
                    <div class="itens-sessao-conta">
                        <div class="item-descricao">
                            <div class="escrita-item-sessao">
                                <a href="/chale/views/pages/reservas.php">Editar calendário</a>
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
                            <div class="escrita-item-sessao" onclick="abrirModal('modal_cadastro_admin')">
                                <p>Criar outra conta administradora</p>
                                <img src="/chale/public/assets/icons/icon-adicionar(verde-escuro).svg" class="icon">
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

    <!-- Modais -->
    <div class="sombra-modal" id="modal_cadastro_admin">
        <div class="bloco-modal-usuario">
            <div class="contorno-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Criar conta de administrador</h2>
                        <button class="btn-fechar-modal">
                            <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="formCadastroAdmin">
                            <div class="campos-form-inputwrapper">
                                <p class="error" id="cadAdmin_error"></p>
                                <div class="input-wrapper">
                                    <span>Nome:</span>
                                    <input type="text" name="nome">
                                </div>
                                <div class="input-wrapper">
                                    <span>E-mail:</span>
                                    <input type="email" name="email">
                                </div>
                                <p>A senha deve conter no mínimo 8 caracteres, pelo menos uma letra, um número e um
                                    símbolo</p>
                                <div class="input-wrapper">
                                    <span>Senha:</span>
                                    <input type="password" name="senha">
                                    <img src="/chale/public/assets/icons/icon-olho.svg" class="icon-olho toggleSenha">
                                </div>
                                <div class="last-input">
                                    <div class="input-wrapper">
                                        <span>Confirmar senha:</span>
                                        <input type="password" name="conf_senha">
                                        <img src="/chale/public/assets/icons/icon-olho.svg"
                                            class="icon-olho toggleSenha">
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn">Criar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="sombra-modal" id="modal_nao_pode_excluir">
        <div class="bloco-modal-geral">
            <div class="modal-header">
                <h2>Aviso</h2>
                <button class="btn-fechar-modal">
                    <img src="/chale/public/assets/icons/icon-close.svg" class="icon" alt="Fechar">
                </button>
            </div>
            <div class="modal-body">
                <p>Você não pode excluir sua conta pois é a única existente!</p>
            </div>
            <div class="modal-footer">
                <button class="btn" onclick="fecharModal('modal_nao_pode_excluir')">OK</button>
            </div>
        </div>
    </div>
</body>
<?php
require_once __DIR__ .'/../modals/sair_conta.php';
require_once __DIR__ .'/../modals/digite_sua_senha.php';
require_once __DIR__ .'/../modals/excluir_conta.php';
require_once __DIR__ . '/../layouts/footer.php';
?>