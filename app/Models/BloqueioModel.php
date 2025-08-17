
<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../config/Database.php';

try {
    $pdo = Database::conectar();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['acao'])) {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação não definida']);
        exit;
    }

    $acao = $input['acao'];
    $dados = $input['dados'] ?? null;

    switch ($acao) {
        case 'verificar_data':
            verificarData($dados, $pdo);
            break;
        case 'bloquear_dias':
            if (!$dados) {
                echo json_encode(['erro' => true, 'mensagem' => 'Dados não enviados.']);
                exit;
            }
            bloquearDias($dados, $pdo);
            break;
        default:
            echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
    }

} catch (Throwable $e) {
    echo json_encode([
        'erro' => true,
        'mensagem' => 'Erro interno no servidor.',
        'detalhes' => $e->getMessage()
    ]);
    exit;
}

// ---------------- Funções ----------------

function bloquearDias($dados, $pdo) {
    $dataInicial = $dados['dataInicial'] ?? null;
    $dataFinal = $dados['dataFinal'] ?? null;
    $tipo = $dados['tipo'] ?? null;

    if (!$dataInicial || !$dataFinal || !$tipo) {
        echo json_encode(['erro' => true, 'mensagem' => 'Dados obrigatórios ausentes.']);
        return;
    }

    try {
        $sql = "INSERT INTO bloqueio_dia (blodinicial, blodfinal, blotipo)
                VALUES (:dataInicial, :dataFinal, :tipo)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':dataInicial', $dataInicial);
        $stmt->bindParam(':dataFinal', $dataFinal);
        $stmt->bindParam(':tipo', $tipo);
        $stmt->execute();

        echo json_encode(['erro' => false, 'mensagem' => 'Dias bloqueados com sucesso!']);
    } catch (PDOException $ex) {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro no banco: ' . $ex->getMessage()]);
    }
}

function verificarData($dados, $pdo) {
    $dataInicial = $dados['dataInicial'] ?? null;
    $dataFinal = $dados['dataFinal'] ?? null;

    if (!$dataInicial || !$dataFinal) {
        echo json_encode(['erro' => true, 'mensagem' => 'Datas não informadas.']);
        return;
    }

    try {
        // Verifica se já existe algum bloqueio que conflita com o período informado
        $sql = "SELECT COUNT(*) FROM bloqueio_dia 
                WHERE (blodinicial <= :dataFinal) AND (blodfinal >= :dataInicial)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':dataInicial' => $dataInicial,
            ':dataFinal' => $dataFinal
        ]);

        $temBloqueio = $stmt->fetchColumn() > 0;

        echo json_encode(['temBloqueio' => $temBloqueio]);
    } catch (PDOException $ex) {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro no banco: ' . $ex->getMessage()]);
    }
}
