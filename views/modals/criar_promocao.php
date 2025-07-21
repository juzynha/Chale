<div class="sombra-modal" id="modal_criar_promocao">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Criar Promoção</h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
        </div>
        <div class="modal-body">
            <form id="formCadastroPromocao">
                <div class="campos-form-inputpadrao">
                    <div class="input-padrao">
                        <span>Nome da promoção:</span>
                        <input type="text" id="criar_nome_promocao" name="criar_nome_promocao">
                    </div>
                    <div class="date-container">
                        <div class="date-group">
                            <span class="date-label">Início</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input">
                        </div>
                        <div class="divider-vertical"></div>
                        <div class="date-group">
                            <span class="date-label">Fim</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input">
                        </div>
                    </div>
                    <div class="input-padrao">
                        <span>Diária:</span>
                        <div class="input-preco">
                            <p>R$</p>
                            <input type="text">
                        </div>
                    </div>
                    <div class="input-padrao">
                        <span>Diária fim de semana:</span>
                        <div class="input-preco">
                            <p>R$</p>
                            <input type="text">
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