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
                        <div class="escrita-item-sessao" onclick="abrirModal('modal_excluir_admin')">
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

<div class="sombra-modal" id="modal_cadastro_admin">
    <div class="bloco-modal-usuario">
        <div class="contorno-modal">
            <div class="modal-content">
                <div class="modal-header">
                     <h2>Criar conta de administrador</h2>
                    <button onclick="fecharModal('modal_cadastro_admin')">
                        <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
                    </button>
                </div>
                <div class="modal-body">
                    <form id="formCadastroAdmin">
                        <p class="error" id="erro_cadastro"></p>
                        <div class="input-wrapper">
                            <label for="nome">Nome:</label>
                            <input type="text" id="nome" name="nome">
                        </div>
                        <div class="input-wrapper">
                            <label for="email">E-mail:</label>
                            <input type="email" id="email" name="email">
                        </div>
                        <div class="input-wrapper">
                            <label for="senha">Senha:</label>
                            <input type="password" id="senha" name="senha">
                        </div>
                        <div class="last-input">
                            <div class="input-wrapper">
                                <label for="senha">Confirmar senha:</label>
                                <input type="password" id="conf_senha" name="conf_senha">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn" id="continuar_cadastro">Continuar</button>
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
        <button onclick="fecharModal('modal_nao_pode_excluir')">
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



<?php
require_once __DIR__ . '/../layouts/footer.php';
require_once __DIR__ .'/../modals/sair_conta.php';
require_once __DIR__ .'/../modals/digite_sua_senha.php';
require_once __DIR__ .'/../modals/excluir_conta.php';
?>