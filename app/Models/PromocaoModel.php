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
    case 'verificar_data':
        verificarData($input['dados'], $pdo);
        break;
    case 'cadastrar_promocao':
        cadastrarPromocao($input['dados'], $pdo);
        break;
    case 'listar_promocoes':
        listarPromocoes($pdo);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function verificarData($dados, $pdo) {
    $dataInicial = $dados['dataInicial'];
    $dataFinal = $dados['dataFinal'];

    $sql = "SELECT COUNT(*) AS total FROM promocoes WHERE (prodataini <= :dataFinal AND prodatafim >= :dataInicial);";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':dataInicial', $dataInicial);
    $stmt->bindParam(':dataFinal', $dataFinal);
    $stmt->execute();

    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($resultado['total'] > 0) {
        echo json_encode(['existe' => true]);
    } else {
        echo json_encode(['existe' => false]);
    }
}

function cadastrarPromocao($dados, $pdo) {
    $nomePromocao = $dados['nomePromocao'];
    $dataInicial = $dados['dataInicial'];
    $dataFinal = $dados['dataFinal'];
    $valorDiaria = $dados['valorDiaria'];
    $valorDiariaFds = $dados['valorDiariaFds'];

    $sql = "CALL cadastrar_promocao(:nomePromocao,:dataInicial,:dataFinal,:valorDiaria,:valorDiariaFds)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nomePromocao', $nomePromocao);
    $stmt->bindParam(':dataInicial', $dataInicial);
    $stmt->bindParam(':dataFinal', $dataFinal);
    $stmt->bindParam(':valorDiaria', $valorDiaria);
    $stmt->bindParam(':valorDiariaFds', $valorDiariaFds);

    if ($stmt->execute()) {
        echo json_encode(['erro' => false, 'mensagem' => 'Promoção cadastrada com sucesso!']);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar no banco']);
    }
}

function listarPromocoes($pdo) {
    $sql = "SELECT * FROM promocoes";
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute()){
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro na comunicação com o banco']);
    }
}