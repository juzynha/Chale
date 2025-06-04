<div class="sombra-modal" id="modal_criar_promocao">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Criar Promoção</h2>
            <button onclick="fecharModal('modal_criar_promocao')">
                <img src="/chale/public/assets/icons/icon-close.svg" width="20px">
            </button>
        </div>
        <div class="modal-body">
            <form id="formCadastroPromocao">
                <div class="campos-padrao">
                    <label for="conf_email" class="">Nome da promoção:</label>
                    <input type="text" id="criar_nome_promocao" name="criar_nome_promocao">
                </div>
                <div class="periodo-data-promocao">
                    <div class="data-box">
                        <label for="inicio">Início</label>
                        <hr class="divisor-databox">
                        <input type="date" id="inicio" name="inicio" value="2025-01-27" class="input-data-box">
                    </div>
                    <div class="data-box">
                        <label for="fim">Fim</label>
                        <hr class="divisor-databox">
                        <input type="date" id="fim" name="fim" value="2025-01-28" class="input-data-box">
                    </div>
                </div>
                <div class="campos-padrao">
                    <label for="conf_email">Diária:</label>
                    <div class="input-preco">
                        <p>R$</p>
                        <input type="text" id="diaria_promocao" name="diaria_promocao">
                    </div>
                </div>
                <div class="campos-padrao">
                    <label for="conf_email">Diária fim de semana:</label>
                    <div class="input-preco">
                        <p>R$</p>
                        <input type="text" id="diaria_promocao" name="diaria_promocao">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn" id="criar_promocao">Criar</button>
                </div>
            </form>
        </div>
    </div>
</div>