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
    case 'listar_reservas':
        listarReservas($pdo);
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

session_start();

function cadastrarReservas($dados, $pdo) {
    try {
        // pega o id do usuário logado da session
        if (!isset($_SESSION['usuario_id'])) {
            echo json_encode(["erro" => true, "mensagem" => "Usuário não está logado."]);
        }
        $usuid = $_SESSION['usuario']['id'];

        $sql = "CALL cadastrar_reserva(:checkin, :checkout, :usuid, :vtotal)";
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(":checkin", $dados['checkin']);
        $stmt->bindParam(":checkout", $dados['checkout']);
        $stmt->bindParam(":usuid", $usuid, PDO::PARAM_INT);
        $stmt->bindParam(":vtotal", $dados['vtotal']);

        if ($stmt->execute()) {
            echo json_encode(["erro" => false, "mensagem" => "Reserva cadastrada com sucesso!"]);
        } else {
            echo json_encode(["erro" => true, "mensagem" => "Erro ao cadastrar reserva."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["erro" => true, "mensagem" => $e->getMessage()]);
    }
}

?>