<?php
require_once __DIR__ . '/../../config/Database.php';

$pdo = Database::conectar();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$input = $_POST;

if (!isset($input['acao'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Ação não definida']);
    exit;
}

switch ($input['acao']) {
    case 'cadastrar_servico':
        cadastrarServico($input, $_FILES, $pdo);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function cadastrarServico($dados, $pdo) {
    $nomeServico = $post['nomeServico'];
    $descricao = $post['descricao'];
    $sesid = 9;

    $imagem = $files['imagemServico'];
    $caminhoFinal = 'caminho/para/uploads/' . uniqid() . '_' . $imagem['name'];

    move_uploaded_file($imagem['tmp_name'], $caminhoFinal);

    $sql = "CALL cadastrar_servico(:nomeServico,:imagemServico,:descricao,:sesid)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nomeServico', $nomeServico);
    $stmt->bindParam(':imagemServico', $imagemServico);
    $stmt->bindParam(':descricao', $descricao);
    $stmt->bindParam(':sesid', $sesid);

    if ($stmt->execute()) {
        echo json_encode(['erro' => false, 'mensagem' => 'Serviço cadastrado com sucesso!']);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar no banco']);
    }
}