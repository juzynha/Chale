//cadastro de admin
document.getElementById('modal_cadastro_admin').addEventListener('submit', async function (e) {
    e.preventDefault();

    let nome = document.getElementById('nome1').value;
    let email = document.getElementById('email1').value;
    let senha = document.getElementById('senha1').value;

    dados = {nome, email, senha};
    const resposta = await fetch('../../app/Models/UsuarioModel.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({acao: 'cadastrar_admin', dados})
  });

  const json = await resposta.json();
  document.getElementById('erro_cadastro_admin').textContent = json.mensagem;
});