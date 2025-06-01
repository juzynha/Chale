<?php
/*
session_start();
require_once(__DIR__ . '/../Models/UsuarioModel.php');

// Lê os dados JSON do corpo da requisição
$dados = json_decode(file_get_contents("php://input"), true);

// Verifica se ação é "login"
if (isset($dados['acao']) && $dados['acao'] === 'login') {
    $email = trim($dados['email'] ?? '');
    $senha = trim($dados['senha'] ?? '');

    if (empty($email) || empty($senha)) {
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Preencha todos os campos."
        ]);
        exit;
    }

    $usuarioModel = new Usuario();
    $usuario = $usuarioModel->login($email, $senha);

    if ($usuario) {
        $_SESSION["id"] = $usuario["usuid"];
        $_SESSION["nome"] = $usuario["usunome"];
        $_SESSION["telefone"] = $usuario["usutelefone"];
        $_SESSION["email"] = $usuario["usuemail"];
        $_SESSION["datanasc"] = $usuario["usudatanasc"];
        $_SESSION["senha"] = $usuario["ususenha"];
        $_SESSION["foto"] = $usuario["usufoto"];
        $_SESSION["tipo"] = $usuario["usutipo"];
        $_SESSION["logado"] = true;
    
        echo json_encode([
            "sucesso" => true,
            "mensagem" => "Login realizado com sucesso!"
        ]);
    } else {
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "E-mail ou senha inválidos."
        ]);
    }
    exit;
}
*/
?>