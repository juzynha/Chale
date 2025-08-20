<?php
require_once __DIR__ . '/../layouts/header.php';
?>

<body data-page="precos_promocoes">
    <header class="cabecalho">
        <?php
        require_once __DIR__ . '/../layouts/menu.php';
        ?>
    </header>
    <!-- Preços -->
    <section class="container">
        <h2 class="subtitulo verde-escuro">Preços</h2>
        <div class="container-bloco-preco">
            <div class="card-infos-preco">
                <div class="diaria-preco">
                    <p>Diária: R$ <strong name="preco_diaria"></strong></p>
                    <p>Diária fim de semana: R$ <strong name="preco_diaria_fds"></strong></p>
                </div>
                <img src="/chale/public/assets/icons/icon-editar.svg" class="lapzinho">
            </div>
        </div>
    </section>
    <hr>

    <!-- Promoções -->
    <section class="container">
        <h2 class="subtitulo verde-escuro">Promoções</h2>
        <div class="card-promocoes">
            <h3 class="nome-promocao">Promoção de Natal</h3>
            <div class="promo-content">
                <div class="bloco-promocoes-esquerdo">
                    <div class="date-container">
                        <div class="date-group">
                            <span class="date-label">Início</span>
                            <hr class="divider-horizontal">
                            </hr>
                            <input type="date" class="date-input" name="data_inicial">
                        </div>
                        <hr class="divider-vertical">
                        </hr>
                        <div class="date-group">
                            <span class="date-label">Fim</span>
                            <hr class="divider-horizontal">
                            </hr>
                            <input type="date" class="date-input" name="data_final">
                        </div>
                    </div>
                    <div class="promocoes-preco">
                        <p>Diária: R$ <strong name="preco_diaria-promocoes"></strong></p>
                        <p>Diária fim de semana: R$ <strong name="preco_promocoes_fds"></strong></p>
                    </div>
                </div>
                <div class="icones-promocoes">
                    <img src="/chale/public/assets/icons/icon-editar.svg" class="lapzinho">
                    <img src="/chale/public/assets/icons/icon-lixeira.svg" class="lixeirinha">
                </div>
            </div>
        </div>
    </section>
</body>

<?php
    require_once __DIR__ . '/../modals/CadAltPromocao.php';
    require_once __DIR__ . '/../layouts/footer.php';
?>