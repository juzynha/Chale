<?php
require_once __DIR__ . '/../../config/Database.php';

$pdo = Database::conectar();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['acao'])) {
    echo json_encode(['erro' => true, 'mensagem' => 'Ação não definida']);
    exit;
}

switch ($input['acao']) {
    case 'bloquear_dias':
        bloquearDias($input['dados'], $pdo);
        break;
    default:
        echo json_encode(['erro' => true, 'mensagem' => 'Ação inválida ou dados ausentes.']);
}

function bloquearDias($dados, $pdo) {
    $dataInicial = $dados['dataInicial'] ?? null;
    $dataFinal = $dados['dataFinal'] ?? null;
    $tipo = $dados['tipo'] ?? null;

    if (!$dataInicial || !$dataFinal || !$tipo) {
        echo json_encode(['erro' => true, 'mensagem' => 'Dados obrigatórios ausentes.']);
        return;
    }

    $sql = "INSERT INTO bloqueios (blodinicial, blodfinal, blodtipo)
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
