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
    case 'cadastrar_sessao':
        cadastrarSessao($input['dados'], $pdo);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function cadastrarSessao($dados, $pdo) {
    if ($dados['referencia'] === 'Galeria de fotos'){
        $sql = "CALL cadastrar_sessao(:nome, 'fotos')";
    } else {
        $sql = "CALL cadastrar_sessao(:nome, 'utilitarios')";
    }

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nome', $dados['nomeSessao']);

    if ($stmt->execute()) {
        echo json_encode(['erro' => false, 'mensagem' => 'Sessão criada com sucesso!']);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar no banco']);
    }
}

?>