<div class="sombra-modal" id="modal_excluir_conta">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Deseja excluir sua conta?</h2>
            <button onclick="fecharModal('modal_excluir_conta')">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon" alt="Fechar">
            </button>
        </div>
        <div class="modal-body">
            <form id="formExcluirConta" class="form-inputcomum">
                <div class="input-padrao">
                    <label for="senha_excluir_admin">Senha:</label>
                    <input type="password" id="senha_excluir_admin" name="senha_excluir_admin">
                </div>
                <div class="modal-footer">
                    <button class="btn" id="editar_dados">Excluir conta</button>
                </div>
            </form>
        </div>
    </div>
</div>