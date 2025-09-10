<?php
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
    case 'login':
        login($input['dados'], $pdo);
        break;
    case 'logout':
        logout();
        break;
    case 'verificar_senha':
        verificarSenha($input['senhaDigitada']);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function login($dados, $pdo) {
    $email = $dados['email'];
    $senha = $dados['senha'];

    // 1. Busca dados do usuário
    $sql = "SELECT * FROM usuarios WHERE usuemail = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':email', $email);
    $stmt->execute();
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        echo json_encode([
            'erro' => true,
            'mensagem' => 'Usuário não encontrado'
        ]);
        exit;
    }

    // 2. Verifica senha
    if (!password_verify($senha, $usuario['ususenha'])) {
        echo json_encode([
            'erro' => true,
            'mensagem' => 'Senha incorreta'
        ]);
        exit;
    }

    // 3. Guarda dados na sessão
    $_SESSION['usuario'] = [
        'id'    => $usuario['usuid'],
        'nome'  => $usuario['usunome'],
        'telefone'  => $usuario['usutelefone'],
        'email' => $usuario['usuemail'],
        'datanasc'  => $usuario['usudatanasc'],
        'senha'  => $usuario['ususenha'],
        'foto'  => $usuario['usufotcaminho'],
        'tipo' => $usuario['usutipo']
    ];

    echo json_encode(['erro' => false, 'mensagem' => 'Login realizado com sucesso']);
}

function logout() {
    // Remove todos os dados da sessão
    $_SESSION = [];
    // Destrói a sessão
    session_destroy();

    echo json_encode(['erro' => false, 'mensagem' => 'Logout realizado com sucesso']);
}

function verificarSenha($senhaDigitada) {
    if (!isset($_SESSION['usuario'])) {
        echo json_encode(['erro' => 'true', 'mensagem' => 'Usuário não logado']);
        exit;
    }

    $usuario = $_SESSION['usuario'];

    // Verificar senha
    if (!password_verify($senhaDigitada, $usuario['senha'])) {
        echo json_encode(['erro' => 'true', 'mensagem' => 'Senha incorreta']);
        exit;
    }

    // Se for admin, retorna campos básicos
    else {
        if ($usuario['tipo'] === 'admin') {
            $dadosRetorno = [
                'id' => $usuario['id'],
                'nome' => $usuario['nome'],
                'email' => $usuario['email'],
                'tipo' => 'admin'
            ];
        } else { // usuário comum
            $dadosRetorno = [
                'id' => $usuario['id'],
                'nome' => $usuario['nome'],
                'email' => $usuario['email'],
                'telefone' => $usuario['telefone'] ?? '',
                'datanasc' => $usuario['datanasc'] ?? '',
                'tipo' => 'usuario'
            ];
        }
    }
    echo json_encode(['status' => 'sucesso', 'dados' => $dadosRetorno]);
}

?>