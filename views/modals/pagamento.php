<div class="sombra-modal" id="modal_pagamento">
    <div class="bloco-modal-geral">
        <div class="modal-header-karol">
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
        </div>
        <div class="modal-body">
            <form id="formPagamento">
                <div class="contorno-modal">
                      <h2>Método de pagamento</h2>
            <label class="opcao-pagamento">
               <span> <img src="/chale/public/assets/icons/icon-pix2.svg"> Pix </span>
            <input type="radio" name="pagamento" />
          </label>
          <label class="opcao-pagamento">
            <span> <img src="/chale/public/assets/icons/icon-credito.svg">Débito</span>
             <input type="radio" name="pagamento" />
             </label>
          <label class="opcao-pagamento">
             <span> <img src="/chale/public/assets/icons/icon-credito.svg">Crédito</span>
        <input type="radio" name="pagamento" />
        </label>
          <label class="opcao-pagamento">
             <span> <img src="/chale/public/assets/icons/icon-boleto.svg">Boleto</span>
          <input type="radio" name="pagamento" />
          </label>
          </div>
      <div class="footer-modal">
        <p class="valortotal-fr" name="preco_total"><strong>Valor Total: </strong>R$400</p>
        <div class="botoes-pagamento">
          <button type="submit" class="pagar-depois">Pagar depois</button>
          <button type="submit" class="btn-pagar">Pagar</button>
        </div>
      </div>   
            </form>
        </div>
    </div>
</div>
