<?php
<<<<<<< HEAD
require_once __DIR__ . '/../../config/conexao.php';

class Usuario {
    public static function login($email, $senha) {
        try {
            $pdo = Conexao::conectar();
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = "CALL login(?, ?)";
            $prp = $pdo->prepare($sql);
            $prp->execute([$email, $senha]);

            $data = $prp->fetch(PDO::FETCH_ASSOC);
            if ($data) {
                session_start();
                $_SESSION["id"] = $data["usuid"];
                $_SESSION["nome"] = $data["usunome"];
                $_SESSION["telefone"] = $data["usutelefone"];
                $_SESSION["email"] = $data["usuemail"];
                $_SESSION["datanasc"] = $data["usudatanasc"];
                $_SESSION["senha"] = $data["ususenha"];
                $_SESSION["foto"] = $data["usufoto"];
                $_SESSION["tipo"] = $data["usutipo"];
                $_SESSION["logado"] = true;

                header("Location: /chale/index.php");
                exit();
            } else {
                session_start();
                $_SESSION["logado"] = false;
                $_SESSION["erro_login"] = "E-mail ou senha incorretos.";
                header("Location: /chale/view/login.php");
                exit();
            }
        } catch (Exception $erro) {
            die("Erro no login: " . $erro->getMessage());
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
=======
require '/chale/app/controller/usuario.php';
require '/chale/config/conexao.php';

$pdo = Bnc::conectar();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

class Usuario {
    public static function login($email,$senha){
        $sql = "CALL login(?,?)";
        $prp = $pdo->prepare($sql);
        $prp->execute(array($email,$senha));
    }

}

?>
>>>>>>> 2a071886bee0f14f25301e13b5c2bd9b65d528fc
