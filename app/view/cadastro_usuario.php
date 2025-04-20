<?php
require 'header.php';
?>

<div id="sombra_modal">
    <div class="modal">
        <div class="modal-content">
            <div class="modal-body">
                <div class="header-modal">
                    <img src="/chale/public/assets/imagens/logo.svg" width="120px">
                    <img src="/chale/public/assets/imagens/icons/icon-close.svg" width="20px">
                </div>
                <main>
                    <h2>Entre ou <p id="cadastro">cadastre-se</p> agora</h2>
                    <form id="formLogin" method="post">
                        <div class="form-content">
                            <label for="email">E-mail:</label>
                            <input type="text" id="email" name="email" required>
                            <label for="senha">Senha:</label>
                            <input type="password" id="senha" name="senha" required>
                            <p id="esqueci_senha">Esqueci a senha</p>
                        </div>
                        <div class="modal-footer">
                            <button type="submit">Entrar</button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    </div>
</div>

<?php
require 'footer.php';
?>