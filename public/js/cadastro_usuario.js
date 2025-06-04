// === Parte 1: Validação e envio dos dados ===

// Armazenar dados temporariamente
let dadosUsuario = {};

// Evento do formulário de cadastro
document.getElementById('formCadastroUsuario').addEventListener('submit', async function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const dataNasc = document.getElementById('data_nasc').value.trim();
  const senha = document.getElementById('senha').value;
  const confSenha = document.getElementById('conf_senha').value;
  const erroEl = document.getElementById('erro_cadastro');
  erroEl.innerText = '';
  console.log('clicou');
  if (!nome || !email || !telefone || !dataNasc || !senha || !confSenha) {
    erroEl.style.display = 'flex';
    erroEl.innerText = 'Preencha todos os campos';
    document.querySelector(".contorno-modal").scrollTop = 0;
    return;
  }

  const idade = calcularIdade(dataNasc);
  if (idade < 18) {
    erroEl.style.display = 'flex';
    erroEl.innerText = 'Você deve ter 18 anos ou mais para se cadastrar.';
    document.querySelector(".contorno-modal").scrollTop = 0;
    return;
  }

  if (senha !== confSenha) {
    erroEl.style.display = 'flex';
    erroEl.innerText = 'As senhas não coincidem.';
    document.querySelector(".contorno-modal").scrollTop = 0;
    return;
  }

/*
 fetch('/chale/app/Models/UsuarioModel.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ acao: 'verificar_email', email })
  })
  .then(response => response.json())
  .then(data => {
    if (data.existe) {
      erros.push('Esse e-mail já está cadastrado!');
    } 
  })
  .catch(error => {
    console.error('Erro:', error);
  });
  
  // Verifica se email existe
  const res = await fetch('/chale/app/Models/UsuarioModel.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ acao: 'verificar_email', email })
  });

  const dados = await res.json();
  if (dados.existe) {
    erroEl.innerText = 'Este e-mail já está cadastrado.';
    return;
  }
*/
  // Se tudo ok, armazena dados e solicita envio do código
  dadosUsuario = { nome, email, telefone, data_nasc: dataNasc, senha };

  const resposta = await fetch('/chale/app/Models/UsuarioModel.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ acao: 'enviar_codigo', email })
  });

  const resultado = await resposta.json();
  if (resultado.status === 'ok') {
    document.getElementById('cadastro_usuario').style.display = 'none';
    document.getElementById('confirmar_email').style.display = 'flex';
    document.querySelector('#confirmar_email h2 p').innerText = email;
  } else {
    erroEl.innerText = 'Erro ao enviar código de verificação.';
  }
});

// Função para calcular idade
function calcularIdade(data) {
  const hoje = new Date();
  const nasc = new Date(data);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade;
}

// === Parte 2: Verificação do código ===
document.getElementById('validar_email').addEventListener('click', async function () {
  const codigo = document.getElementById('conf_email').value.trim();
  const email = dadosUsuario.email;
  const erroEl = document.querySelector('.mensagem-erro');
  erroEl.innerText = '';

  const res = await fetch('/chale/app/Models/UsuarioModel.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ acao: 'verificar_codigo', email, codigo })
  });

  const dados = await res.json();
  if (dados.status === 'ok') {
    // Insere no banco de dados
    const inserir = await fetch('/chale/app/Models/UsuarioModel.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ acao: 'cadastrar_usuario', ...dadosUsuario })
    });

    const final = await inserir.json();
    if (final.status === 'ok') {
      document.getElementById('confirmar_email').style.display = 'none';
      document.getElementById('cadastrar_foto').style.display = 'flex';
    } else {
      erroEl.innerText = 'Erro ao cadastrar usuário.';
    }
  } else {
    erroEl.innerText = 'Código incorreto. Verifique seu e-mail.';
  }
});
