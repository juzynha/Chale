<div class="sombra-modal" id="modal_cadalt_promocao">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2 id="cad_promo">Criar Promoção</h2>
            <h2 id="alt_promo">Editar Promoção</h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
        </div>
        <div class="modal-body">
            <form id="formCadastroPromocao">
                <p class="error" id="cadPromocao_error"></p>
                <div class="campos-form-inputpadrao">
                    <div class="input-padrao">
                        <span>Nome da promoção:</span>
                        <input type="text" name="nome_promocao">
                    </div>
                    <div class="date-container">
                        <div class="date-group">
                            <span class="date-label">Início</span>
                            <hr class="divider-horizontal"></hr>
                            <input type="date" class="date-input" name="data_inicial">
                        </div>
                        <hr class="divider-vertical"></hr>
                        <div class="date-group">
                            <span class="date-label">Fim</span>
                            <hr class="divider-horizontal"></hr>
                            <input type="date" class="date-input" name="data_final">
                        </div>
                    </div>
                    <div class="input-padrao">
                        <span>Diária:</span>
                        <div class="input-preco">
                            <p>R$</p>
                            <input type="text" name="valor_diaria" class="input-double">
                        </div>
                    </div>
                    <div class="input-padrao">
                        <span>Diária fim de semana:</span>
                        <div class="input-preco">
                            <p>R$</p>
                            <input type="text" name="valor_diariafds" class="input-double">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn">Criar</button>
                </div>
            </form>
        </div>
    </div>
</div>