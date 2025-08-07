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
    case 'cadastrar_foto':
        cadastrarFoto($_FILES, $pdo);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function cadastrarServico($dados, $arquivos, $pdo) {
    $nomeServico = $dados['nomeServico'] ?? '';
    $descricao = $dados['descricao'] ?? '';
    $sesid = 9; // valor fixo por enquanto

    $imagem = $arquivos['imagemServico'];
    $nomeImagem = uniqid() . '-' . $imagem['name'];
    $caminho = __DIR__ . '/../../public/uploads/servicos/' . $nomeImagem;

    if (!move_uploaded_file($imagem['tmp_name'], $caminho)) {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar a imagem.']);
        return;
    }

    $sql = "CALL cadastrar_servico(:nomeServico, :imagemServico, :descricao, :sesid)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nomeServico', $nomeServico);
    $stmt->bindParam(':imagemServico', $nomeImagem);
    $stmt->bindParam(':descricao', $descricao);
    $stmt->bindParam(':sesid', $sesid);

    if ($stmt->execute()) {
        echo json_encode(['erro' => false, 'mensagem' => 'Serviço cadastrado com sucesso!']);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar no banco']);
    }
}

function cadastrarFoto($arquivos, $pdo) {
    $sesid = 9; // valor fixo por enquanto

    $foto = $arquivos['foto'];
    $nomeImagem = uniqid() . '-' . $foto['name'];
    $caminho = __DIR__ . '/../../public/uploads/galeria/' . $nomeImagem;

    if (!move_uploaded_file($foto['tmp_name'], $caminho)) {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar a imagem.']);
        return;
    }

    $sql = "CALL cadastrar_foto_galeria(:foto, :sesid)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':foto', $nomeImagem);
    $stmt->bindParam(':sesid', $sesid);

    if ($stmt->execute()) {
        echo json_encode(['erro' => false, 'mensagem' => 'Foto cadastrada com sucesso!']);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar no banco']);
    }
}