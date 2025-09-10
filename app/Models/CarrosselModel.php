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
    case 'cadastrar_foto':
        cadastrarFoto($_FILES, $pdo);
        break;
    case 'listar_carrossel':
        listarCarrossel($pdo);
        break;
    default:
        echo json_encode(['status' => 'erro', 'mensagem' => 'Ação inválida']);
}

function cadastrarFoto($arquivos, $pdo) {
    //armazenar a foto -> salvar na pasta uploads -> armazenar o nome do arquivo em $nomeImagem
    $foto = $arquivos['foto'];
    $nomeImagem = uniqid() . '-' . $foto['name'];
    $caminho = __DIR__ . '/../../public/uploads/carrossel/' . $nomeImagem;

    if (!move_uploaded_file($foto['tmp_name'], $caminho)) {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar a imagem.']);
        return;
    }
    //-----
    //ver a posição mais alta 
    $sqlUltPosicao = "SELECT MAX(carposicao) AS ultima_posicao FROM carrossel";
    $stmt = $pdo->prepare($sqlUltPosicao);
    $stmt->execute();
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
    $ultimaPosicao = $resultado['ultima_posicao'] ?? 0;
    //aumenta uma posição para cadastrar a próxima foto
    $posicao = $ultimaPosicao + 1;
    $sql = "CALL cadastrar_foto_carrossel(:foto, :posicao)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':foto', $nomeImagem);
    $stmt->bindParam(':posicao', $posicao);

    if ($stmt->execute()) {
        echo json_encode(['erro' => false, 'mensagem' => 'Imagem cadastrada com sucesso!']);
    } else {
        echo json_encode(['erro' => true, 'mensagem' => 'Erro ao salvar no banco']);
    }

}

function listarCarrossel($pdo) {
    $sql = "SELECT * FROM carrossel ORDER BY carposicao ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
}
