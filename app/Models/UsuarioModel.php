<?php
require_once __DIR__ . '/../../config/Database.php';

$pdo = Bnc::conectar();
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
    case 'enviar_codigo':
        enviarCodigo($input['email']);
        break;
    case 'cadastrar':
        cadastrarUsuario($input, $pdo);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function verificarEmail($email, $pdo) {
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    echo json_encode(['status' => 'ok', 'existe' => $stmt->rowCount() > 0]);
}

function enviarCodigo($email) {
    $codigo = rand(100000, 999999);

    // Enviar código por email (exemplo com função mail)
    mail($email, "Código de verificação", "Seu código é: $codigo");

    // Para testes, retorna o código
    echo json_encode(['status' => 'ok', 'codigo' => $codigo]);
}

function cadastrarUsuario($dados, $pdo) {
    $nome = trim($dados['nome']);
    $email = trim($dados['email']);
    $telefone = trim($dados['telefone']);
    $data_nasc = trim($dados['data_nasc']);
    $senha = password_hash($dados['senha'], PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("CALL cadastrar_usuario(?, ?, ?, ?, ?)");
    $success = $stmt->execute([$nome, $email, $telefone, $data_nasc, $senha]);

    echo json_encode(['status' => $success ? 'ok' : 'erro']);
}
