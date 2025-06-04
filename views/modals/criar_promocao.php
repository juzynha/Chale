<div class="sombra-modal" id="criar_promocao">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Criar Promoção</h2>
            <button onclick="fecharModal('criar_promocao')">
                <img src="/chale/public/assets/icons/icon-close.svg" width="20px">
            </button>
        </div>
        <div class="modal-body">
            <label for="conf_email" class="">Nome da promoção:</label>
            <input type="text" id="criar_nome_promocao" name="criar_nome_promocao">
            <div class="periodo-promocao">

            </div>
            <label for="conf_email">Diária:</label>
            <div class="input-preco">
                <p>R$</p>
                <input type="text" id="diaria_promocao" name="diaria_promocao">
            </div>
             <label for="conf_email">Diária fim de semana:</label>
            <div class="input-preco">
                <p>R$</p>
                <input type="text" id="diaria_promocao" name="diaria_promocao">
            </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn" id="editar_dados">Continuar</button>
        </div>
    </div>
</div>