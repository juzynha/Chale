<?php
require_once __DIR__ . '/../../config/Database.php';
session_start();
$pdo = Database::conectar();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['acao'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Ação não definida']);
    exit;
}

switch ($input['acao']) {
    case 'listar_reservas':
        listarReservas($pdo);
        break;
    case 'listar_reservas_npagas':
        listarReservasNPagas($pdo);
        break;
    case 'cadastrar_reserva':
        cadastrarReservas($input['dados'],$pdo);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function listarReservas($pdo) {
    $sql = "SELECT * FROM lista_reservas;";
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute()) {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao comunicar com o banco']);
    }

}

function listarReservasNPagas($pdo) {
    if (isset($_SESSION['usuario']) && ($_SESSION['usuario']['tipo'] === 'cliente')) {
        $usuario = $_SESSION['usuario'];
        $id = $usuario['id'];
        $sql = "SELECT * FROM reservas WHERE resusuid = :id AND resstatuspag = 0;";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);


        if ($stmt->execute()) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data);
            exit;
        } else {
            echo json_encode(['erro' => true, 'mensagem' => 'Erro ao comunicar com o banco']);
        }
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Usuario nao logado']);
    }
}

function cadastrarReservas($dados, $pdo) {
    try {
        if (!isset($_SESSION['usuario'])) {
            echo json_encode([
                "erro" => true,
                "mensagem" => "Você precisa estar logado para fazer uma reserva"
            ]);
            return;
        }

        $usuid    = $_SESSION['usuario']['id'];
        $checkin  = $dados['dataInicial'];
        $checkout = $dados['dataFinal'];
        $vltotal  = $dados['valorTotal'];

        // 1️⃣ Executa a procedure
        $sql1 = "CALL cadastrar_reserva(:checkin, :checkout, :usuid, :vtotal)";
        $stmt1 = $pdo->prepare($sql1);
        $stmt1->bindParam(":checkin", $checkin);
        $stmt1->bindParam(":checkout", $checkout);
        $stmt1->bindParam(":usuid", $usuid, PDO::PARAM_INT);
        $stmt1->bindParam(":vtotal", $vltotal);
        $stmt1->execute();

        // 2️⃣ Insere bloqueio_dia
        $tipo = 'reserva';
        $sql2 = "INSERT INTO bloqueio_dia (blodinicial, blodfinal, blotipo)
                 VALUES (:datainicial, :datafinal, :tipo)";
        $stmt2 = $pdo->prepare($sql2);
        $stmt2->bindParam(":datainicial", $checkin);
        $stmt2->bindParam(":datafinal", $checkout);
        $stmt2->bindParam(":tipo", $tipo);

        if ($stmt2->execute()) {
            echo json_encode([
                "erro" => false,
                "mensagem" => "Reserva cadastrada com sucesso!"
            ]);
        } else {
            echo json_encode([
                "erro" => true,
                "mensagem" => "Erro ao cadastrar reserva (bloqueio)."
            ]);
        }

    } catch (PDOException $e) {
        echo json_encode(["erro" => true, "mensagem" => $e->getMessage()]);
    }
}

?>