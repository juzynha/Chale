<?php
require_once __DIR__ . '/../layouts/header.php';
?>

<body data-page="faca_sua_reserva">
    <header class="cabecalho">
        <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
    </header>
    <div class="container">
        <h1 class="titulo verde-escuro">Faça sua reserva no chalé La Vie En Rose!</h1>
    </div>
    <section>
        <div class="carrossel-container">
            <div class="button-carrossel" id="prevBtn_carrossel"><img src="/chale/public/assets/icons/icon-seta-left.svg"></div>
            <div class="carrossel" id="carrossel-box">
                <!--carrossel-->
            </div>
            <div class="button-carrossel" id="nextBtn_carrossel"><img src="/chale/public/assets/icons/icon-seta-right.svg"></div>
        </div>
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
            <div class="card-infos-fr" id="preFormReserva">
                <div class="infos-card-fr">
                    <p><strong name="preco_diaria"></strong></p>
                    <p><strong name="preco_diaria_fds"></strong></p>
                    <div class="date-container">
                        <div class="date-group">
                            <span class="date-label">Check-in</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input" name="data_inicial" data-blocked="true">
                        </div>
                        <div class="divider-vertical"></div>
                        <div class="date-group">
                            <span class="date-label">Check-out</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input" name="data_final" data-blocked="true">
                        </div>
                    </div>
                </div>
                <div class="footer-card-fr">
                    <p><strong name="preco_total"></strong></p>
                    <button name="reservar" class="btn">Reservar</button>
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
    <section class="container-calendario">
        <div class="container-elementos">
            <img src="/chale/public/assets/elementos-graficos/onda-calendario-left.svg" class="element-planta-left">
            <img src="/chale/public/assets/elementos-graficos/onda-calendario-right.svg" class="element-planta-right">
            <div class="sessao-calendario">
                <div class="atualizar-calendario">
                    <div class="ferramenta">
                        <p>Atualizar calendário</p>
                        <img src="/chale/public/assets/icons/icon-atualizar.svg" class="icon">
                    </div>
                </div>
                <div class="calendario-box">
                    <header>
                        <img src="/chale/public/assets/icons/icon-seta-left(branco).svg" class="icon prev">
                        <span class="currentMonth"></span>
                        <img src="/chale/public/assets/icons/icon-seta-right(branco).svg" class="icon next">
                    </header>
                    <div class="calendario-content">
                        <hr class="divider-horizontal-cal">
                        <ul class="weeks">
                            <li>Dom</li>
                            <hr class="divider-vertical-cal">
                            <li>Seg</li>
                            <hr class="divider-vertical-cal">
                            <li>Ter</li>
                            <hr class="divider-vertical-cal">
                            <li>Qua</li>
                            <hr class="divider-vertical-cal">
                            <li>Qui</li>
                            <hr class="divider-vertical-cal">
                            <li>Sex</li>
                            <hr class="divider-vertical-cal">
                            <li>Sab</li>
                        </ul>
                        <hr class="divider-horizontal-cal">
                        <ul class="days"></ul>
                    </div>
                </div>
            </div>
        </div>
    </section>


</body>

<!-- Modais -->
<div class="sombra-modal" id="modal_fazer_reserva">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Fazer reserva</h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
        </div>
        <div class="modal-body">
            <form id="formFazerReserva" class="form-inputcomum">
                <p class="error" id="cadReserva_error"></p>
                <div class="contorno-modal-branco">
                    <div class="date-container">
                        <div class="date-group">
                            <span class="date-label">Check-in</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input" name="data_inicial">
                        </div>
                        <div class="divider-vertical"></div>
                        <div class="date-group">
                            <span class="date-label">Check-out</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input" name="data_final">
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

<div class="sombra-modal" id="modal_editar_carrossel">
    <div class="bloco-modal-geral">
        <div class="modal-header">
            <h2>Editar carrossel</h2>
            <button class="btn-fechar-modal">
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
                <div class="ferramenta-branco"
                    onclick="fecharModal('modal_editar_carrossel'), abrirModal('modal_add_foto_carrossel')">
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
            <h2>Adicionar Foto</h2>
            <button class="btn-fechar-modal">
                <img src="/chale/public/assets/icons/icon-close.svg" class="icon">
            </button>
        </div>
        <div class="modal-body">
            <form id="formAddFotoCarrossel">
                <p class="error" id="cadFotoCarrossel_error"></p>
                <div class="campos-form-inputpadrao">
                    <div class="imagem-servico img-box">
                        <img src="/chale/public/assets/icons/icon-adicionar(branco).svg" class="icon">
                        <input type="file" name="foto">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn">Adicionar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php
require_once __DIR__ . '/../modals/pagamento.php';
require_once __DIR__ . '/../layouts/footer.php';
?>