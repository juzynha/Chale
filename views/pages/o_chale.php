<?php
require_once __DIR__ . '/../layouts/header.php';
?>
<header class="cabecalho">
    <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
</header>

<div class="container">
    <h2 class="subtitulo">Utilitários</h2>
</div>
<div class="sessao-cards-utilitarios">
    <h2 class="subtitulo">Título da sessão</h2>
    <div class="cards-utilitarios">
        <div class="card-utilitario">
            <p>Nome do utilitario</p>
            <div class="imagem-utilitario">

            </div>
            <div class="descricao-utilitario">
                <h3>Texto em destaque</h3>
                <p>Texto descritivo do utilitario</p>
            </div>
        </div>
    </div>
</div>
<?php
require_once __DIR__ . '/../layouts/footer.php';
?>