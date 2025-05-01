
<div class="sombra-modal" id="login">
    <div class="bloco-modal-usuario">
        <div class="contorno-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="/chale/public/assets/imagens/logo.svg" width="120px">
                    <button onclick="fecharModal('login')">
                        <img src="/chale/public/assets/imagens/icons/icon-close.svg" width="20px">
                    </button>
                </div>
                <div class="modal-body">
                    <h2>Não possui uma conta? <p class="link" id="abrir_cadastro">Cadastre-se</p> agora</h2>
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
                            <p id="esqueci_senha" class="textinho">Esqueci a senha</p>
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