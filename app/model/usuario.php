<?php
require '/chale/app/controller/usuario.php';
require '/chale/config/conexao.php';

$pdo = Bnc::conectar();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

class Usuario {
    public static function login($email,$senha){
        $sql = "CALL login(?,?)";
        $prp = $pdo->prepare($sql);
        $prp->execute(array($email,$senha));
    }

}

?>