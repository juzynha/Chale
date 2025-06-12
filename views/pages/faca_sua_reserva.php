<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <?php
require_once __DIR__ . '/../layouts/header.php';
?>
    <header class="cabecalho">
        <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
    </header>
    <main>
        <div class="container">
            <h1 class="titulo">Faça sua reserva no chalé La Vie En Rose!</h1>
        </div>
        <section class="container-fr">
            <div class="container-bloco-reserva">
                <div class="ferramenta-calendario">
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
                                <input type="date" class="date-input" id="start-date">
                            </div>
                            <div class="divider-vertical"></div>
                            <div class="date-group">
                                <span class="date-label">Check-out</span>
                                <div class="divider-horizontal"></div>
                                <input type="date" class="date-input" id="end-date">
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
                            <input type="date" class="date-input" id="start-date">
                        </div>
                        <div class="divider-vertical"></div>
                        <div class="date-group">
                            <span class="date-label">Check-out</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input" id="end-date">
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

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>