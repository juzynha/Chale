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
        <section class="container-flex">
            <div class="card-infos-fr">
                <div class="infos-card-fr">
                    <p><strong>R$200</strong> diária</p>
                    <p><strong>R$250</strong> fim de semana</p>
                    <div class="date-container">
                        <div class="date-group">
                            <span class="date-label">Check-in</span>
                            <div class="divider-horizontal"></div>
                            <input type="date" class="date-input" id="start-date" >
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
                    <button class="btn">Reservar</button>
                </div>
            </div>
            <div class="elementos-fr">
                <div class="item-fr">
                    <img src="/chale/public/assets/icons/icon-carrinho.svg" width="100px">
                    <p>Você pode comprar consumíveis do frigobar! Entre em contato com o dono para receber a tabela de produtos e preços</p>
                </div>
                <div class="item-fr">
                    <img src="/chale/public/assets/icons/icon-banheira.svg" width="100px">
                    <p>A banheira é aquecida e fica em área aberta. Se não souber como utilizar peça ajuda ao anfitrião</p>
                </div>
            </div>
        </section>
        <!--
        <section class="container detalhes">
            <div>
                <h2 class="subtitulo">Informações gerais</h2>
                <ul>
                    <li><img src="/chale/public/assets/icons/icon-duas-pessoas.svg" alt="" width="15"
                            height="15">Capacidade máxima: 2 pessoas</li>
                    <li><img src="/chale/public/assets/icons/icon-check-in.svg" alt="" width="15" height="15">Check-in a
                        partir das 8 AM</li>
                    <li><img src="/chale/public/assets/icons/icon-check-out.svg" alt="" width="15" height="15">Check-out
                        até as 12 PM</li>
                </ul>
            </div>
            <div>
                <h2 class="subtitulo">Regras de convivência</h2>
                <ul>
                    <li> <img src="/chale/public/assets/icons/icon-semsom.svg" alt="" width="15" height="15">Evite
                        barulhos altos após as 22h</li>
                    <li><img src="/chale/public/assets/icons/icon-proibidoanimal.svg" alt="" width="15" height="15">
                        Animais de estimação não são permitidos</li>
                    <li><img src="/chale/public/assets/icons/icon-proibidovisita.svg" alt="" width="15" height="15"> Não
                        é permitido receber visitas não registradas</li>
                </ul>
            </div>
        </section>
        <section class="container">
            <section class="servicos">
                <h2 class="subtitulo">Serviços inclusos</h2>
                <ul>
                    <li><img src="/chale/public/assets/icons/icon-ar-condicionado.svg" alt="" width="18" height="18">
                        Ar-condicionado</li>
                    <li><img src="/chale/public/assets/icons/icon-frigobar.svg" alt="" width="18" height="18">Frigobar
                    </li>
                    <li><img src="/chale/public/assets/icons/icon-wifi.svg" alt="" width="18" height="18">Wifi</li>
                    <li> <img src="/chale/public/assets/icons/icon-tv-a-cabo.svg" alt="" width="18" height="18">TV a
                        cabo</li>
                    <li><img src="/chale/public/assets/icons/icon-cafeteira.svg" alt="" width="18" height="18">Cafeteira
                        elétrica</li>
                    <li><img src="/chale/public/assets/icons/icon-estacionamento.svg" alt="" width="18" height="18">
                        Estacionamento</li>
                </ul>
            </section>
        </section>
-->
        <?php
require_once __DIR__ . '/../layouts/footer.php';
?>