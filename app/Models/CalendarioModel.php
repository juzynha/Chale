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
    case 'listar_bloqueados':
        listarBloqueados($input['ano'], $input['mes'], $pdo);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function listarBloqueados($ano, $mes, $pdo) {
    try {
        $inicioMes = sprintf("%04d-%02d-01", $ano, $mes);
        $fimMes = date("Y-m-t", strtotime($inicioMes)); // último dia do mês

        // pega todos os registros que tenham interseção com o mês
        $sql = "SELECT blodinicial, blodfinal 
                  FROM bloqueio_dia 
                 WHERE NOT (blodfinal < :inicio OR blodinicial > :fim)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':inicio' => $inicioMes,
            ':fim'    => $fimMes
        ]);
        $bloqueios = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $datas = [];

        // percorre cada intervalo (reserva ou manual)
        foreach ($bloqueios as $bloqueio) {
            $dataInicio = new DateTime($bloqueio['blodinicial']);
            $dataFim = new DateTime($bloqueio['blodfinal']);

            // garante que não extrapole o mês solicitado
            if ($dataInicio < new DateTime($inicioMes)) {
                $dataInicio = new DateTime($inicioMes);
            }
            if ($dataFim > new DateTime($fimMes)) {
                $dataFim = new DateTime($fimMes);
            }

            $periodo = new DatePeriod(
                $dataInicio,
                new DateInterval('P1D'),
                $dataFim->modify('+1 day') // incluir o último dia
            );

            foreach ($periodo as $dia) {
                $datas[] = $dia->format("Y-m-d");
            }
        }

        // adiciona os dias já passados (até ontem)
        $hoje = date("Y-m-d");
        $periodoMes = new DatePeriod(
            new DateTime($inicioMes),
            new DateInterval('P1D'),
            (new DateTime($fimMes))->modify('+1 day')
        );

        foreach ($periodoMes as $dia) {
            if ($dia->format("Y-m-d") < $hoje) {
                $datas[] = $dia->format("Y-m-d");
            }
        }

        // remove duplicados
        $datas = array_values(array_unique($datas));

        echo json_encode($datas);

    } catch (Exception $e) {
        echo json_encode(['status' => 'erro', 'mensagem' => $e->getMessage()]);
    }
}
