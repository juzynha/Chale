<?php
require_once __DIR__ . '/../layouts/header.php';
?>

<body data-page="sobre nós">
    <header class="cabecalho">
        <?php
        require_once __DIR__ . '/../layouts/menu.php';
        ?>
    </header>
        
    <div class="container">
        <svg class="linha" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 600">

          <!-- Linha curva -->
          <path d="M100 50 
                   C 120 100, 80 150, 100 200 
                   C 120 250, 80 300, 100 350 
                   C 120 400, 80 450, 100 500" 
                class="curva"/>

          <!-- Definindo clip paths para as bolinhas -->
          <defs>
            <clipPath id="clip1">
              <circle cx="100" cy="50" r="25"/>
            </clipPath>
            <clipPath id="clip2">
              <circle cx="100" cy="200" r="25"/>
            </clipPath>
            <clipPath id="clip3">
              <circle cx="100" cy="350" r="25"/>
            </clipPath>
            <clipPath id="clip4">
              <circle cx="100" cy="500" r="25"/>
            </clipPath>
          </defs>

          <!-- Bolinhas com imagens preenchendo completamente -->
          <circle cx="100" cy="50" r="25" class="bolinha"/>
          <image href="/chale/public/uploads/galeria/image.png" 
                 x="75" y="25" width="50" height="50" clip-path="url(#clip1)"/>
                 <text x="140" y="55" font-family="Glacial Indifference" font-size="9" fill="#333">Era uma casa muito engraçada, não tinha teto, não tinha nada;; </text>

          <circle cx="100" cy="200" r="25" class="bolinha"/>
          <image href="/chale/public/uploads/galeria/icone2.png" 
                 x="75" y="175" width="50" height="50" clip-path="url(#clip2)"/>

          <circle cx="100" cy="350" r="25" class="bolinha"/>
          <image href="/chale/public/uploads/galeria/icone3.png" 
                 x="75" y="325" width="50" height="50" clip-path="url(#clip3)"/>

          <circle cx="100" cy="500" r="25" class="bolinha"/>
          <image href="/chale/public/uploads/galeria/icone4.png" 
                 x="75" y="475" width="50" height="50" clip-path="url(#clip4)"/>
          
        </svg>
    </div>
</body>

<?php
require_once __DIR__ . '/../layouts/footer.php';
?>
