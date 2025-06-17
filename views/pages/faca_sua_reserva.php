<?php
require_once __DIR__ . '/../layouts/header.php';
?>
<header class="cabecalho">
    <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
</header>
<div class="container">
    <h1 class="titulo">Faça sua reserva no chalé La Vie En Rose!</h1>
</div>
<section class="carrossel-container">
    <div class="carrossel"></div>
    <div class="option-editar-carrossel">
        <div class="ferramenta" onclick="abrirModal('modal_editar_carrossel')">
            <p>Editar carrossel</p>
            <img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icon">
        </div>
    </div>
</section>
<section class="container-fr">
    <div class="container-bloco-reserva">
        <div class="ferramenta">
            <p>Editar preços</p>
            <img src="/chale/public/assets/icons/icon-editar(verde).svg" class="icon">
        </div>
        <div class="card-infos-fr">
            <div class="infos-card-fr">
                <p><strong>R$200</strong> diária</p>
                <p><strong>R$250</strong> fim de semana</p>
                <div class="date-container">
                    <div class="date-group">
                        <span class="date-label">Check-in</span>
                        <div class="divider-horizontal"></div>
                        <input type="date" class="date-input">
                    </div>
                    <div class="divider-vertical"></div>
                    <div class="date-group">
                        <span class="date-label">Check-out</span>
                        <div class="divider-horizontal"></div>
                        <input type="date" class="date-input">
                    </div>
                </div>
            </div>
            <div class="footer-card-fr">
                <p><strong>Total: </strong>R$300</p>
                <button class="btn" onclick="abrirModal('modal_fazer_reserva')">Reservar</button>
            </div>
        </div>
    </div>
    <div class="elementos-fr">
        <div class="item-fr">
            <img src="/chale/public/assets/icons/icon-carrinho.svg" width="150px">
            <p>Você pode comprar consumíveis do frigobar! Entre em contato com o dono para receber a tabela de
                produtos e preços</p>
        </div>
        <div class="item-fr">
            <img src="/chale/public/assets/icons/icon-banheira.svg" width="150px">
            <p>A banheira é aquecida e fica em área aberta. Se não souber como utilizar peça ajuda ao anfitrião
            </p>
        </div>
    </div>
</section>
<section class="container-fr">
    <div class="infos-fr">
        <h2 class="subtitulo">Informações gerais</h2>
        <ul class="lista-infos-fr">
            <li><img src="/chale/public/assets/icons/icon-duas-pessoas.svg">Capacidade máxima: 2 pessoas
            </li>
            <li><img src="/chale/public/assets/icons/icon-check-in.svg">Check-in a partir das 8 AM</li>
            <li><img src="/chale/public/assets/icons/icon-check-out.svg">Check-out até as 12 PM</li>
        </ul>
    </div>
    <div class="infos-fr">
        <h2 class="subtitulo">Regras de convivência</h2>
        <ul class="lista-infos-fr">
            <li> <img src="/chale/public/assets/icons/icon-semsom.svg">Evite barulhos altos após as 22h</li>
            <li><img src="/chale/public/assets/icons/icon-proibidoanimal.svg">Animais de estimação não são
                permitidos</li>
            <li><img src="/chale/public/assets/icons/icon-proibidovisita.svg">Não é permitido receber visitas
                não registradas</li>
        </ul>
    </div>
</section>
<section class="container-fr">
    <div class="infos-fr">
        <h2 class="subtitulo">Serviços inclusos</h2>
        <ul class="lista-infos-fr">
            <li><img src="/chale/public/assets/icons/icon-ar-condicionado.svg">Ar-condicionado</li>
            <li><img src="/chale/public/assets/icons/icon-frigobar.svg">Frigobar</li>
            <li><img src="/chale/public/assets/icons/icon-wifi.svg">Wifi</li>
            <li> <img src="/chale/public/assets/icons/icon-tv-a-cabo.svg">TV a cabo</li>
            <li><img src="/chale/public/assets/icons/icon-cafeteira.svg">Cafeteira elétrica</li>
            <li><img src="/chale/public/assets/icons/icon-estacionamento.svg">Estacionamento</li>
        </ul>
    </div>
</section>
<!-- Modais -->
<div class="sombra-modal" id="modal_fazer_reserva">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Fazer reserva</h2>
            <button onclick="fecharModal('modal_fazer_reserva')">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
            <p class="error"></p>
        </div>
        <div class="modal-body">
            <form id="formFazerReserva" class="form-inputcomum">
                <div class="infos-datas-fr">
                    <div class="date-container">
                        <div class="date-group">
                            <span class="date-label">Check-in</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input">
                        </div>
                        <div class="divider-vertical"></div>
                        <div class="date-group">
                            <span class="date-label">Check-out</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input">
                        </div>
                    </div>
                </div>
                <p class="valortotal-fr"><strong>Valor Total: </strong>R$400</p>
                <div class="modal-footer">
                    <button class="btn">Reservar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="sombra-modal" id="modal_editar_carrossel">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Editar carrossel</h2>
            <button onclick="fecharModal('modal_editar_carrossel')">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
        </div>
        <div class="modal-body">
            <form id="formEditarCarrossel" class="form-inputcomum">
                <div class="carrossel-itens">
                    <div class="divider-horizontal"></div>
                    <div class="item-carrossel">
                        <div class="titulo-item-carrossel">
                            <p>Canto Esquerdo</p>
                        </div>
                        <div class="foto-item-carrossel">
                            <img src="/chale/public/assets/img1.jpeg" class="foto-carrossel">
                            <img src="/chale/public/assets/icons/icon-selecionar.svg" class="icon">
                        </div>
                    </div>
                    <div class="divider-horizontal"></div>
                    <div class="item-carrossel">
                        <div class="titulo-item-carrossel">
                            <p>Meio Esquerdo</p>
                        </div>
                        <div class="foto-item-carrossel">
                            <img src="/chale/public/assets/img2.jpeg" class="foto-carrossel">
                            <img src="/chale/public/assets/icons/icon-selecionar.svg" class="icon">
                        </div>
                    </div>
                    <div class="divider-horizontal"></div>
                    <div class="item-carrossel">
                        <div class="titulo-item-carrossel">
                            <p>Centro</p>
                        </div>
                        <div class="foto-item-carrossel">
                            <img src="/chale/public/assets/img3.jpeg" class="foto-carrossel">
                            <img src="/chale/public/assets/icons/icon-selecionar.svg" class="icon">
                        </div>
                    </div>
                    <div class="divider-horizontal"></div>
                    <div class="item-carrossel">
                        <div class="titulo-item-carrossel">
                            <p>Meio Direito</p>
                        </div>
                        <div class="foto-item-carrossel">
                            <img src="/chale/public/assets/img4.jpeg" class="foto-carrossel">
                            <img src="/chale/public/assets/icons/icon-selecionar.svg" class="icon">
                        </div>
                    </div>
                    <div class="divider-horizontal"></div>
                    <div class="item-carrossel">
                        <div class="titulo-item-carrossel">
                            <p>Canto Direito</p>
                        </div>
                        <div class="foto-item-carrossel">
                            <img src="/chale/public/assets/img5.jpeg" class="foto-carrossel">
                            <img src="/chale/public/assets/icons/icon-selecionar.svg" class="icon">
                        </div>
                    </div>
                    <div class="divider-horizontal"></div>
                    <div class="item-carrossel">
                        <div class="titulo-item-carrossel">
                            <p>Posição 6</p>
                        </div>
                        <div class="foto-item-carrossel">
                            <img src="/chale/public/assets/img2.jpeg" class="foto-carrossel">
                            <img src="/chale/public/assets/icons/icon-selecionar.svg" class="icon">
                        </div>
                    </div>
                    <div class="divider-horizontal"></div>
                    <div class="item-carrossel">
                        <div class="titulo-item-carrossel">
                            <p>Posição 7</p>
                        </div>
                        <div class="foto-item-carrossel">
                            <img src="/chale/public/assets/img4.jpeg" class="foto-carrossel">
                            <img src="/chale/public/assets/icons/icon-selecionar.svg" class="icon">
                        </div>
                    </div>
                    <div class="divider-horizontal"></div>
                </div>
                <div class="ferramenta-branco" onclick="fecharModal('modal_editar_carrossel'), abrirModal('modal_add_foto_carrossel')">
                    <p>Adicionar foto</p>
                    <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" class="icon">
                </div>
                <div class="modal-footer">
                    <button class="btn">Salvar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="sombra-modal" id="modal_add_foto_carrossel">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Selecione uma imagem</h2>
            <button onclick="fecharModal('modal_add_foto_carrossel'), abrirModal('modal_editar_carrossel')">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
            <p class="error"></p>
        </div>
        <div class="modal-body">
            <form id="formAddFotoCarrossel" class="form-inputcomum">
                <div class="add-imagem-carrossel">
                    <div class="campo-add-foto">
                        <div class="input-padrao">
                            <label for="add-foto">Abrir arquivo:</label>
                            <input type="file" id="add-foto">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn">Salvar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>