<div class="sombra-modal" id="modal_cadastro_usuario">
    <div class="bloco-modal-usuario">
        <div class="contorno-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="/chale/public/assets/logo.svg" width="120px">
                    <button onclick="fecharModal('modal_cadastro_usuario')">
                        <img src="/chale/public/assets/icons/icon-close.svg" width="20px">
                    </button>
                </div>
                <div class="modal-body">
                    <h2>Já possui uma conta? Fazer <p class="link" id="abrir_login">login</p></h2>
                    <form id="formCadastroUsuario">
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
                            <label for="telefone">Telefone:</label>
                            <input type="text" id="telefone" name="telefone">
                        </div>
                        <div class="input-wrapper">
                            <label for="data_nasc">Data de nascimento:</label>
                            <input type="date" id="data_nasc" name="data_nasc">
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

<div class="sombra-modal" id="modal_confirmar_email">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Enviamos um código ao e-mail <p>gabriel@gmail</p></h2>
            <p class="error"></p>
        </div>
        <div class="modal-body">
            <label for="conf_email">Digite o código:</label>
            <input type="text" id="conf_email" name="conf_email" required>
            <p id="reenviar_email" class="textinho">Reenviar</p>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn" id="validar_email">Continuar</button>
        </div>
    </div>
</div>

<div class="sombra-modal" id="modal_cadastrar_foto">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Escolha uma foto de perfil</h2>
        </div>
        <div class="modal-body">
            <div class="modal-centralizado">
                <div class="foto-user">
                    <img src="/chale/public/assets/icons/icon-user.svg" width="100px">
                </div>
            </div>
            <label for="foto">Abrir arquivo:</label>
            <input type="file" id="foto" name="foto" required>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn" id="continuar_email">Salvar</button>
            <p class="textinho">Pular <img src="/chale/public/assets/icons/icon-seta-pular.svg" width="12px"></p>
        </div>
    </div>
</div>