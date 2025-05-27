document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");
    const errorMessage = document.getElementById("login_error");

    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault(); // impede o reload da página

        const email = document.getElementById("email_login").value.trim();
        const senha = document.getElementById("senha_login").value.trim();

        try {
            const resposta = await fetch("/chale/app/Controllers/UsuarioController.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    acao: "login",
                    email,
                    senha
                })
            });

            const data = await resposta.json();

            if (data.sucesso) {
                location.reload(); // recarrega a página pra atualizar navbar com $_SESSION
            } else {
                errorMessage.textContent = data.mensagem;
            }

        } catch (erro) {
            errorMessage.textContent = "Erro no login. Tente novamente mais tarde.";
            console.error("Erro:", erro);
        }
    });
});
