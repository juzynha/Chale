<?php
require_once __DIR__ . '/../../config/Database.php';

class Usuario {
    public static function login($email, $senha) {
        try {
            $pdo = Database::conectar();
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = "CALL login(?, ?)";
            $prp = $pdo->prepare($sql);
            $prp->execute([$email, $senha]);

            $data = $prp->fetch(PDO::FETCH_ASSOC);
            if ($data) {
                $_SESSION["id"] = $data["usuid"];
                $_SESSION["nome"] = $data["usunome"];
                $_SESSION["telefone"] = $data["usutelefone"];
                $_SESSION["email"] = $data["usuemail"];
                $_SESSION["datanasc"] = $data["usudatanasc"];
                $_SESSION["senha"] = $data["ususenha"];
                $_SESSION["foto"] = $data["usufoto"];
                $_SESSION["tipo"] = $data["usutipo"];
                $_SESSION["logado"] = true;

                return 'ok';
            } else {
                return 'E-mail ou senha incorretos.';
            }
        } catch (Exception $erro) {
            return 'Erro no login: ' . $erro->getMessage();
        }
    }

    public static function cadastrar($nome, $email, $telefone, $datanasc, $senha) {
        try {
            $pdo = Conexao::conectar();
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = "CALL cadastrar_usuario(?, ?, ?, ?, ?)";
            $prp = $pdo->prepare($sql);
            $prp->execute([$nome, $email, $telefone, $datanasc, $senha]);

            session_start();
            $_SESSION["mensagem_cadastro"] = "Usuário cadastrado com sucesso!";
            header("Location: /chale/view/login.php");
            exit();
        } catch (Exception $erro) {
            die("Erro ao cadastrar: " . $erro->getMessage());
        }
    }
}
?>
