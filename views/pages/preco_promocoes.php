<?php
require_once __DIR__ . '/../layouts/header.php';
?>

<body data-page="reservas">
    <header class="cabecalho">
        <?php
    require_once __DIR__ . '/../layouts/menu.php';
    ?>
    </header>
    <section class="container-precos" id="container_precos">
        <h2 class="subtitulo verde-escuro">Preços</h2>
        <div class="filtro">
            
            <input type="text" id="data_filtro">
            <img src="/chale/public/assets/icons/icon-funil.svg" width="20px">
        </div>
        
<section class="container-fr">    
                 
    <div class="container-bloco-preco">
        
        <div class="card-infos-fr" id="preFormReserva">
            
            <p>Diária: R$<strong name="preco_diaria"></strong></p>
            <p>Diária fim de semana: R$<strong name="preco_diaria_fds"></strong></p>

        </div>
        
    </div>
    <img src="/chale/public/assets/icons/icon-editar(verde).svg" class="lapzinho">
</section>


        <hr>

    
            
</body>

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>