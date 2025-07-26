<div class="sombra-modal" id="modal_cadastro_usuario">
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
                    <h2>Já possui uma conta? Fazer <p class="link" onclick="fecharModal('modal_cadastro_usuario'), abrirModal('modal_login')">login</p></h2>
                    <form id="formCadastroUsuario">
                        <div class="campos-form-inputwrapper">
                            <p class="error" id="cadUsuario_error"></p>
                            <div class="input-wrapper">
                                <span>Nome:</span>
                                <input type="text" name="nome">
                            </div>
                            <div class="input-wrapper">
                                <span>E-mail:</span>
                                <input type="email" name="email">
                            </div>
                            <div class="input-wrapper">
                                <span>Telefone:</span>
                                <input type="text" placeholder="(99) 999999999" name="telefone">
                            </div>
                            <div class="input-wrapper">
                                <span>Data de nascimento:</span>
                                <input type="date" name="data_nasc">
                            </div>
                            <p>A senha deve conter no mínimo 8 caracteres, pelo menos uma letra, um número e um símbolo</p>
                            <div class="input-wrapper">
                                <span>Senha:</span>
                                <input type="password" name="senha">
                                <img src="/chale/public/assets/icons/icon-olho.svg" class="icon-olho toggleSenha">
                            </div>
                            <div class="last-input">
                                <div class="input-wrapper">
                                    <span>Confirmar senha:</span>
                                    <input type="password" name="conf_senha">
                                    <img src="/chale/public/assets/icons/icon-olho.svg" class="icon-olho toggleSenha">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn">Continuar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="sombra-modal" id="modal_validar_email">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Enviamos um código ao e-mail <p id="validacao_email"></p>
            </h2>
            <p class="error"></p>
        </div>
        <div class="modal-body">
            <form id="formValidacaoEmail" class="form-inputcomum">
                <p class="error" id="validarEmail_error"></p>
                <div class="input-padrao">
                    <span>Digite o código:</span>
                    <input type="text" name="codigo">
                    <p id="reenviar_codigo" class="textinho">Reenviar</p>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn">Continuar</button>
                </div>
            </form>
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
            <p class="textinho" onclick="fecharModal('modal_cadastrar_foto')">Pular <img
                    src="/chale/public/assets/icons/icon-seta-pular.svg" width="12px"></p>
        </div>
    </div>
</div>