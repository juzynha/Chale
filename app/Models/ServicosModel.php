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

function cadastrarServico($dados, $arquivos, $pdo) {
    $nomeServico = $dados['nomeServico'] ?? '';
    $descricao = $dados['descricao'] ?? '';
    $sesid = 9; // valor fixo por enquanto

    // Valida imagem enviada
    if (!isset($arquivos['imagemServico']) || $arquivos['imagemServico']['error'] !== 0) {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro no upload da imagem.']);
        return;
    }

    $imagem = $arquivos['imagemServico'];
    $nomeFinalImagem = uniqid() . '_' . basename($imagem['name']);
    $caminhoFinal = '../../public/uploads/' . $nomeFinalImagem;

    $imagem = $_FILES['imagemServico'];

    $dadosImagem = file_get_contents($imagem['tmp_name']); // lê o conteúdo binário

    $sql = "CALL cadastrar_servico(:nomeServico, :imagemServico, :descricao, :sesid)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nomeServico', $nomeServico);
    $stmt->bindParam(':imagemServico', $dadosImagem, PDO::PARAM_LOB); 
    $stmt->bindParam(':descricao', $descricao);
    $stmt->bindParam(':sesid', $sesid);

    if ($stmt->execute()) {
        echo json_encode(['erro' => false, 'mensagem' => 'Serviço cadastrado com sucesso!']);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar no banco']);
    }
}