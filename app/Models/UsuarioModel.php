<?php
require_once __DIR__ . '/../../config/Database.php';

$pdo = Database::conectar();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['acao'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Ação não definida']);
    exit;
}

switch ($input['acao']) {
    case 'verificar_email':
        verificarEmail($input['email'], $pdo);
        break;
    case 'cadastrar_admin':
        cadastrarAdmin($input['dados'], $pdo);
        break;
    case 'enviar_codigo':
        enviarCodigo();
        break;
    case 'cadastrar_usuario':
        cadastrarUsuario($input['dados'], $pdo);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function verificarEmail($email, $pdo) {
    $sql = "SELECT COUNT(*) FROM usuarios WHERE usuemail = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $count = $stmt->fetchColumn();

    echo json_encode(['existe' => $count > 0]);
}

function cadastrarAdmin($dados, $pdo) {
    $nome = $dados['nome'];
    $email = $dados['email'];
    $senha = password_hash($dados['senha'], PASSWORD_DEFAULT);

    $sql = "CALL cadastrar_admin(:nome, :email, :senha)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':senha', $senha); 

    if ($stmt->execute()) {
        echo json_encode([
            'erro' => false,
            'mensagem' => 'Usuário cadastrado com sucesso!'
        ]);
    } else {
        echo json_encode([
            'erro' => true,
            'mensagem' => 'Erro ao salvar no banco'
        ]);
    }
}

function enviarCodigo() {
    $codigo = rand(100000, 999999);

    // Enviar código por email (exemplo com função mail)
   // mail($email, "Código de verificação", "Seu código é: $codigo");

    // Para testes, retorna o código
    echo json_encode(['status' => 'ok', 'codigo' => $codigo]);
}

function cadastrarUsuario($dados, $pdo) {
    $nome = $dados['nome'];
    $email = $dados['email'];
    $telefone = $dados['telefone'];
    $dataNasc = $dados['dataNasc'];
    $senha = $dados['senha'];

    $sql = "CALL cadastrar_usuario(:nome, :email, :telefone, :datanasc, :senha)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':datanasc', $dataNasc);
    $stmt->bindParam(':senha', $senha);

    if ($stmt->execute()) {
        echo json_encode(['erro' => false, 'mensagem' => 'Usuario cadastrado com sucesso!']);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar no banco']);
    }
}
