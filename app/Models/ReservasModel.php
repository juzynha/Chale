<?php
require_once __DIR__ . '/../../config/Database.php';

Class Reservas{
    private $pdo;

    public function __construct() {
        $this->pdo = Database::conectar();
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function listaReservas() {
        $sql = "SELECT *, TIMESTAMPDIFF(YEAR, usudatanasc, CURDATE()) AS idade FROM lista_reservas";
        $prp = $this->pdo->prepare($sql);
        $prp->execute();
        $data = $prp->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    }
}

if (isset($_GET['action'])) {
    $reservas = new Reservas();

    if ($_GET['action'] == 'listaReservas') {
        $reservas->listaReservas();
    } elseif ($_GET['action'] == 'outraFuncao') {
        $reservas->outraFuncao();
    } else {
        echo json_encode(['erro' => 'Ação inválida']);
    }
} else {
    echo json_encode(['erro' => 'Nenhuma ação especificada']);
}

?>