<div class="sombra-modal" id="modal_pagamento">
    <div class="bloco-modal-geral">
        <form action="">
            <div class="contorno-modal-branco">
                <div class="modal-header">
                    <h2>Método de Pagamento</h2>
                </div>
                <div class="modal-body">
                    <div class="opcao-pag">
                        <div class="opcao">
                            <img src="/chale/public/assets/icons/icon-pix.svg">
                            <p>Pix</p>
                        </div>
                        <input type="radio" name="metodo_pagamento" value="pix">
                    </div>
                    <hr class="hr-branco">
                    <div class="opcao-pag">
                        <div class="opcao">
                            <img src="/chale/public/assets/icons/icon-cartao.svg">
                            <p>Débito</p>
                        </div>
                        <input type="radio" name="metodo_pagamento" value="debito">
                    </div>
                    <hr class="hr-branco">
                    <div class="opcao-pag">
                        <div class="opcao">
                            <img src="/chale/public/assets/icons/icon-cartao.svg">
                            <p>Crédito</p>
                        </div>
                        <input type="radio" name="metodo_pagamento" value="credito">
                    </div>
                    <hr class="hr-branco">
                    <div class="opcao-pag">
                        <div class="opcao">
                            <img src="/chale/public/assets/icons/icon-boleto.svg">
                            <p>Boleto</p>
                        </div>
                        <input type="radio" name="metodo_pagamento" value="boleto">
                    </div>
                    <hr class="hr-branco">
                </div>
            </div>
            <div class="modal-body">
                <p class="valortotal-fr" name="preco_total"><strong>Valor Total: </strong></p>
                <div class="modal-footer-pagamento">
                    <span class="textinho" onclick="fecharModal('modal_pagamento')">Pagar depois</span>
                    <button type="button" class="btn">Pagar</button>
                </div>
            </div>
        </form>
    </div>
</div>
