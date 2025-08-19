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

    $dataInicialObj = DateTime::createFromFormat('Y-m-d', $dataInicial);
    $dataFinalObj = DateTime::createFromFormat('Y-m-d', $dataFinal);

    if (!$dataInicialObj || !$dataFinalObj) {
        echo json_encode(['erro' => true, 'mensagem' => 'Formato de data inválido.']);
        return;
    }

    if ($dataFinalObj < $dataInicialObj) {
        $dataFinalObj = clone $dataInicialObj;
    }

    $erros = [];
    $sucesso = [];

    try {
        $pdo->beginTransaction();

        while ($dataInicialObj <= $dataFinalObj) {
            $dataAtual = $dataInicialObj->format('Y-m-d');

            // Verifica se essa data já está bloqueada
            $stmtCheck = $pdo->prepare("
                SELECT COUNT(*) FROM bloqueio_dia 
                WHERE blodinicial = :data AND blodfinal = :data
            ");
            $stmtCheck->execute([':data' => $dataAtual]);
            $existe = $stmtCheck->fetchColumn();

            if (!$existe) {
                try {
                    $stmtInsert = $pdo->prepare("
                        INSERT INTO bloqueio_dia (blodinicial, blodfinal, blotipo)
                        VALUES (:data, :data, :tipo)
                    ");
                    $stmtInsert->execute([
                        ':data' => $dataAtual,
                        ':tipo' => $tipo
                    ]);
                    $sucesso[] = $dataAtual;
                } catch (PDOException $ex) {
                    $erros[] = "Erro ao inserir {$dataAtual}: " . $ex->getMessage();
                }
            } else {
                $erros[] = "Data já bloqueada: {$dataAtual}";
            }

            $dataInicialObj->modify('+1 day');
        }

        $pdo->commit();

        $mensagem = '';
        if (!empty($sucesso)) {
            $mensagem .= "Dias bloqueados com sucesso";
        }
        if (!empty($erros)) {
            $mensagem .= "Erros: " . implode(' | ', $erros);
        }

        echo json_encode([
            'erro' => false,
            'mensagem' => $mensagem
        ]);

    } catch (PDOException $ex) {
        $pdo->rollBack();
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao inserir os dias: ' . $ex->getMessage()]);
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

