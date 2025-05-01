<?php
session_start();
require_once '../model/usuario.php';

if (isset($_POST["btn_entrar"])) {
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    Usuario::login($email, $senha);
}

if (isset($_POST["btn_cadastrar"])) {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $datanasc = $_POST['data_nasc'];
    $senha = $_POST['senha'];
    $confsenha = $_POST['conf_senha'];

    if ($senha !== $confsenha) {
        $_SESSION["erro_cadastro"] = "As senhas não coincidem.";
        header("Location: /chale/view/login.php");
        exit();
    } else {
        Usuario::cadastrar($nome, $email, $telefone, $datanasc, $senha);
    }
}
?>
