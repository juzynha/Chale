<?php
header('Content-Type: application/json');
ini_set('display_errors', 0);
error_reporting(E_ALL);

try {
require_once __DIR__ . '/../../config/Database.php';

$pdo = Database::conectar();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['acao'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Ação não definida']);
    exit;
}

switch ($input['acao']) {
    case 'verificar_data':
        verificarData($input['dados'], $pdo);
        break;
    case 'bloquear_dias':
        bloquearDias($input['dados'], $pdo);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function bloquearDias($dados, $pdo) {
    $dataInicial = $dados['dataInicial'] ?? null;
    $dataFinal = $dados['dataFinal'] ?? null;
    $tipo = $dados['tipo'] ?? null;

    if (!$dataInicial || !$dataFinal || !$tipo) {
        echo json_encode(['erro' => true, 'mensagem' => 'Dados obrigatórios ausentes.']);
        return;
    }

    $sql = "INSERT INTO bloqueio_dia (blodinicial, blodfinal, blotipo)
            VALUES (:dataInicial, :dataFinal, :tipo)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':dataInicial', $dataInicial);
    $stmt->bindParam(':dataFinal', $dataFinal);
    $stmt->bindParam(':tipo', $tipo);

    if ($stmt->execute()) {
        echo json_encode(['erro' => false, 'mensagem' => 'Dias bloqueados com sucesso!']);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar no banco.']);
    }
}
} catch (Throwable $e) {
    echo json_encode([
        'erro' => true,
        'mensagem' => 'Erro interno no servidor.',
        'detalhes' => $e->getMessage()
    ]);
    exit;
}