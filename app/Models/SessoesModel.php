<?php
require_once __DIR__ . '/../../config/Database.php';

$pdo = Database::conectar();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['acao'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Ação não definida']);
    exit;
}

switch ($input['acao']){
    case 'listar_sessoes':
        listarSessoes($pdo);
        break;
    case 'cadastrar_sessao':
        cadastrarSessao($input['dados'], $pdo);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function listarSessoes($pdo) {
    $sql = "SELECT * FROM sessoes ORDER BY sesid DESC";
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute()){
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar no banco']);
    }
}

function cadastrarSessao($dados, $pdo) {
    $nome = $dados['nomeSessao'];
    if ($dados['referencia'] === 'Galeria de fotos'){
        $sql = "CALL cadastrar_sessao(:nome, 'fotos')";
    } else {
        $sql = "CALL cadastrar_sessao(:nome, 'servicos')";
    }

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nome', $nome);

    if ($stmt->execute()) {
        echo json_encode(['erro' => false, 'mensagem' => 'Sessão criada com sucesso!']);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar no banco']);
    }
}

?>