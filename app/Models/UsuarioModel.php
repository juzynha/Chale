<?php // PHPMailer via Composer

session_start();
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
        enviarCodigo($input['email']);
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


function cadastrarUsuario($dados, $pdo) {
    $nome = $dados['nome'];
    $email = $dados['email'];
    $telefone = $dados['telefone'];
    $dataNasc = $dados['dataNasc'];
    $senha = password_hash($dados['senha'], PASSWORD_DEFAULT);

    $sql = "CALL cadastrar_usuario(:nome, :telefone, :email, :datanasc, :senha)";
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

function enviarCodigo($email) {
    $codigo = rand(100000, 999999);

    // Dados que vamos enviar para o Node
    $postData = json_encode([
        'email' => $email,
        'codigo' => $codigo
    ]);

    // Inicializa cURL
    $ch = curl_init("http://localhost:3000/enviar-codigo"); // URL do seu Node.js
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

    // Executa a requisição
    $response = curl_exec($ch);

    // Verifica erro de cURL
    if ($response === false) {
        echo json_encode([
            'status' => 'erro',
            'mensagem' => 'Falha na comunicação com o servidor de e-mail'
        ]);
        curl_close($ch);
        return;
    }

    curl_close($ch);

    // Retorna o que o Node.js enviou
    echo $response;
}

