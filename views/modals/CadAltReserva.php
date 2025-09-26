<div class="sombra-modal" id="modal_cadalt_reserva">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2 name="titulo"></h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
        </div>
        <div class="modal-body">
            <form id="formCadAltReserva" class="form-inputcomum">
                <p class="error" id="cadReserva_error"></p>
                <div class="contorno-modal-branco">
                    <div class="date-container">
                        <div class="date-group">
                            <span class="date-label">Check-in</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input" name="data_inicial" data-blocked="true" readonly>
                        </div>
                        <div class="divider-vertical"></div>
                        <div class="date-group">
                            <span class="date-label">Check-out</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input" name="data_final" data-blocked="true" readonly>
                        </div>
                    </div>
                </div>
                <p class="valortotal-fr" name="preco_total"><strong>Valor Total: </strong></p>
                <div class="modal-footer">
                    <button type="submit" class="btn">Reservar</button>
                </div>
            </form>
        </div>
    </div>
</div>