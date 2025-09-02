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
        $sql = "SELECT * FROM lista_reservas WHERE resusuid = :id AND resstatuspag = 0;";
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
        session_start();
        $usuid = '';
        $checkin = $dados['dataInicial'];
        $checkout = $dados['dataFinal'];
        $vltotal = $dados['valorTotal'];
        // pega o id do usuário logado da session
        if (!isset($_SESSION['usuario'])) {
            echo json_encode(["erro" => true, "mensagem" => "Usuário não está logado."]);
        } else {
            $usuid = $_SESSION['usuario']['id'];
            $sql = "CALL cadastrar_reserva(:checkin, :checkout, :usuid, :vtotal)";
            $stmt = $pdo->prepare($sql);

            $stmt->bindParam(":checkin", $checkin);
            $stmt->bindParam(":checkout", $checkout);
            $stmt->bindParam(":usuid", $usuid, PDO::PARAM_INT);
            $stmt->bindParam(":vtotal", $vltotal);

            $tipo = 'reserva';
            $sql = "INSERT INTO bloqueio_dia (blodinicial, blodfinal, blotipo)
                        VALUES (:datainicial, :datafinal, :tipo)";
            $stmt = $pdo->prepare($sql);

            $stmt->bindParam(":datainicial", $checkin);
            $stmt->bindParam(":datafinal", $checkout);
            $stmt->bindParam(":tipo", $tipo);

            if ($stmt->execute()) {
                echo json_encode(["erro" => false, "mensagem" => "Reserva cadastrada com sucesso!"]);
            } else {
                echo json_encode(["erro" => true, "mensagem" => "Erro ao cadastrar reserva."]);
            }
        }
        
    } catch (PDOException $e) {
        echo json_encode(["erro" => true, "mensagem" => $e->getMessage()]);
    }
}

?>