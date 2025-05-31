<?php
require_once __DIR__ . '/../../config/Database.php';

Class Carousel{
    private $pdo;

    public function __construct() {
        $this->pdo = Database::conectar();
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    
}
?>