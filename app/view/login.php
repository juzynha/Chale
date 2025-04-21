<?php
require 'header.php';
?>

<div class="sombra-modal" id="login">
    <div class="bloco-modal">
        <div class="contorno-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="/chale/public/assets/imagens/logo.svg" width="120px">
                    <button>
                        <img src="/chale/public/assets/imagens/icons/icon-close.svg" width="20px">
                    </button>
                </div>
                <div class="modal-body">
                    <h2>Não possui uma conta? <p class="link" id="fazer_cadastro">Cadastre-se</p> agora</h2>
                    <form id="formLogin" action="/chale/app/controller/usuario.php" method="post">
                        <div class="input-wrapper">
                            <label for="email">E-mail:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="last-input">
                            <div class="input-wrapper">
                                <label for="senha">Senha:</label>
                                <input type="password" id="senha" name="senha" required>
                            </div>
                            <p id="esqueci_senha">Esqueci a senha</p>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn" name="btn_entrar">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="sombra-modal" id="cadastro">
    <div class="bloco-modal">
        <div class="contorno-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="/chale/public/assets/imagens/logo.svg" width="120px">
                    <button>
                        <img src="/chale/public/assets/imagens/icons/icon-close.svg" width="20px">
                    </button>
                </div>
                <div class="modal-body">
                    <h2>Já possui uma conta? Fazer <p class="link" id="fazer_login">login</p>
                    </h2>
                    <form id="formLogin" action="/chale/app/controller/usuario.php" method="post">
                        <div class="input-wrapper">
                            <label for="nome">Nome:</label>
                            <input type="text" id="nome" name="nome" required>
                        </div>
                        <div class="input-wrapper">
                            <label for="email">E-mail:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="input-wrapper">
                            <label for="telefone">Telefone:</label>
                            <input type="text" id="telefone" name="telefone" required>
                        </div>
                        <div class="input-wrapper">
                            <label for="data_nasc">Data de nascimento:</label>
                            <input type="text" id="data_nasc" name="data_nasc" required>
                        </div>
                        <div class="input-wrapper">
                            <label for="senha">Senha:</label>
                            <input type="password" id="senha" name="senha" required>
                        </div>
                        <div class="last-input">
                            <div class="input-wrapper">
                                <label for="senha">Confirmar senha:</label>
                                <input type="password" id="conf_senha" name="conf_senha" required>
                            </div>
                            <p id="esqueci_senha">Esqueci a senha</p>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn" name="btn_cadastrar">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
require 'footer.php';
?>