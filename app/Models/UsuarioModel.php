<?php
require_once(__DIR__ . '/../../config/Database.php');

class Usuario {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::conectar();
    }

    public function login($email, $senha) {
        $sql = "SELECT * FROM usuarios WHERE email = :email LIMIT 1";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($senha, $usuario['senha'])) {
            return $usuario;
        }

        return false;
    }
}
