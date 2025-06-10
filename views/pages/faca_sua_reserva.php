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
       <div class="container">
       <div class="card-reserva">
                <p><strong>R$ 200</strong> diária</p>
                <p><strong>R$ 250</strong> fim de semana</p>
                <p><strong>CHECK-IN</strong> 27/01/2025</p>
                <p><strong>CHECK-OUT</strong> 28/01/2025</p>
                <p><strong>TOTAL</strong><br>R$ 300</p>

                <div class="modal-footer">
                    <button type="submit" class="btn" id="fazer-reserva">Reservar</button>
                </div>
            </div>
     </div>
                    
        
    <section class="container">
        <div class="infos-para-reserva">

        </div>
        <div class="infos">
            <p><img src="/chale/public/assets/icons/icon-carrinho.svg" alt="" width="15"  height="15"> Você pode comprar consumíveis do frigobar! Entre em contato com o dono.</p>
            <p><img src="/chale/public/assets/icons/icon-frigobar.svg" alt="" width="15"  height="15">A banheira é aquecida e fica em área aberta.</p>
        </div>
    </section>  
    <section class="container detalhes">
        <div>
            <h2 class="subtitulo">Informações gerais</h2>
            <ul>
            <li><img src="/chale/public/assets/icons/icon-duas-pessoas.svg" alt="" width="15"  height="15">Capacidade máxima: 2 pessoas</li>
            <li><img src="/chale/public/assets/icons/icon-check-in.svg" alt="" width="15"  height="15">Check-in a partir das 8 AM</li>
            <li><img src="/chale/public/assets/icons/icon-check-out.svg" alt="" width="15"  height="15">Check-out até as 12 PM</li>
            </ul>
        </div>
        <div>
            <h2 class="subtitulo">Regras de convivência</h2>
            <ul>
            <li> <img src="/chale/public/assets/icons/icon-semsom.svg" alt="" width="15"  height="15">Evite barulhos altos após as 22h</li>
            <li><img src="/chale/public/assets/icons/icon-proibidoanimal.svg" alt="" width="15"  height="15"> Animais de estimação não são permitidos</li>
            <li><img src="/chale/public/assets/icons/icon-proibidovisita.svg" alt="" width="15"  height="15"> Não é permitido receber visitas não registradas</li>
            </ul>
        </div>
    </section>
    <section class="container">
        <section class="servicos">
            <h2 class="subtitulo">Serviços inclusos</h2>
            <ul>
                <li><img src="/chale/public/assets/icons/icon-ar-condicionado.svg" alt="" width="18"  height="18"> Ar-condicionado</li>
                <li><img src="/chale/public/assets/icons/icon-frigobar.svg" alt="" width="18"  height="18">Frigobar</li>
                <li><img src="/chale/public/assets/icons/icon-wifi.svg" alt="" width="18"  height="18">Wifi</li>
                <li> <img src="/chale/public/assets/icons/icon-tv-a-cabo.svg" alt="" width="18"  height="18">TV a cabo</li>
                <li><img src="/chale/public/assets/icons/icon-cafeteira.svg" alt="" width="18"  height="18">Cafeteira elétrica</li>
                <li><img src="/chale/public/assets/icons/icon-estacionamento.svg" alt="" width="18"  height="18"> Estacionamento</li>
            </ul>
        </section>
    </section>
<?php
require_once __DIR__ . '/../layouts/footer.php';
?>
