<div class="sombra-modal" id="modal_login">
    <div class="bloco-modal-usuario">
        <div class="contorno-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="/chale/public/assets/logo.svg" width="120px">
                    <button class="btn-fechar-modal">
                        <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
                    </button>
                </div>
                <div class="modal-body">
                    <h2>Não possui uma conta? <p class="link" onclick="fecharModal('modal_login'), abrirModal('modal_cadastro_usuario')">Cadastre-se</p> agora</h2>
                    <form id="formLogin" class="form-inputwrapper">
                        <div class="campos-form-inputwrapper">
                            <p class="error" id="login_error"></p>
                            <div class="input-wrapper">
                                <span>E-mail:</span>
                                <input type="email" id="email_login" name="email" required>
                            </div>
                            <div class="last-input">
                                <div class="input-wrapper">
                                    <span>Senha:</span>
                                    <input type="password" id="senha_login" name="senha" required>
                                    <img src="/chale/public/assets/icons/icon-olho.svg" class="icon-olho toggleSenha">
                                </div>
                                <p id="esqueci_senha" class="textinho">Esqueci a senha</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>