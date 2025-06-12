<div class="sombra-modal" id="modal_digite_sua_senha">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Para editar seus dados digite sua senha</h2>
            <button onclick="fecharModal('modal_digite_sua_senha')">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
            <p class="error"></p>
        </div>
        <div class="modal-body">
            <form id="formDigiteSuaSenha" class="form-inputcomum">
                <div class="input-padrao">
                    <label for="conf_email">Senha:</label>
                    <input type="text" id="senha_editar_dados" name="senha_editar_dados">
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn" id="editar_dados">Continuar</button>
                </div>
            </form>
        </div>
    </div>
</div>