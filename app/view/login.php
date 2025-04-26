
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

<div class="sombra-modal" id="cadastro">
    <div class="bloco-modal-usuario">
        <div class="contorno-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="/chale/public/assets/imagens/logo.svg" width="120px">
                    <button onclick="fecharModal('cadastro')">
                        <img src="/chale/public/assets/imagens/icons/icon-close.svg" width="20px">
                    </button>
                </div>
                <div class="modal-body">
                    <h2>Já possui uma conta? Fazer <p class="link" id="abrir_login">login</p>
                    </h2>
                    <form id="formLogin" action="/chale/app/controller/usuario.php" method="post">
                        <p class="mensagem-erro"></p>
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
                            <p id="esqueci_senha" class="textinho">Esqueci a senha</p>
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

<div class="sombra-modal" id="confirmar_email">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Enviamos um código ao e-mail <p>gabriel@gmail</p></h2>
        </div>
        <div class="modal-body">
            <label for="conf_email">Digite o código:</label>
            <input type="text" id="conf_email" name="conf_email" required>
            <p id="reenviar_email" class="textinho">Reenviar</p>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn" id="continuar_email">Continuar</button>
        </div>
    </div>
</div>

<div class="sombra-modal" id="colocar_foto">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Escolha uma foto de perfil</h2>
        </div>
        <div class="modal-body">
            <div class="modal-centralizado">
                <div class="foto-user">
                    <img src="/chale/public/assets/imagens/icons/icon-user.svg" width="100px">
                </div>
            </div>
            <label for="foto">Abrir arquivo:</label>
            <input type="file" id="foto" name="foto" required>
            <p id="reenviar_email" class="textinho">Reenviar</p>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn" id="continuar_email">Continuar</button>
            <p class="textinho">Pular <img src="/chale/public/assets/imagens/icons/icon-seta-pular.svg" width="12px"></p>
        </div>
    </div>
</div>