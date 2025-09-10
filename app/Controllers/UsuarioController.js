import { validarCamposPreenchidos, validarNomeProprio, validarEmail, validarTelefone, validarSenha, converterDataParaISO, converterDataParaBR, abrirModal, fecharModal, scrollModalToTop } from './Utils.js';

const pagina = document.body.dataset.page;

if (pagina === 'conta_admin' || pagina === 'conta_usuario') {
    document.getElementById('formDigiteSuaSenha').addEventListener('submit', async function (e) {
        e.preventDefault();

        const senhaDigitada = this.querySelector('[name="senha_editar_dados"]').value.trim();
        const error = document.getElementById('digiteSenha_error');

        // Validação simples local
        if (senhaDigitada === '') {
            error.textContent = 'Digite sua senha';
            error.style.display = 'block';
            return;
        }

        // Chamada ao backend para verificar senha
        const resposta = await fetch('../../app/Models/LoginModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'verificar_senha', senhaDigitada }),
        });

        const json = await resposta.json();

        if (!json.erro) {
            fecharModal('modal_digite_sua_senha');
            // Aqui chamamos o modal de editar passando os dados do $_SESSION que o backend retornou
            if (pagina === 'conta_admin') {
                abrirModalEditarAdmin(json.dados.id, json.dados.nome, json.dados.email);
            } else {
                abrirModalEditarUsuario(json.dados.id, json.dados.nome, json.dados.email, json.dados.telefone, json.dados.datanasc);
            }
        } else {
            error.textContent = json.mensagem;
            error.style.display = 'block';
            return;
        }
    });
}

window.abrirModalCadastrarAdmin = function () {
    const modal = document.getElementById('modal_cadalt_admin');
    modal.querySelector('[name="titulo"]').textContent = 'Criar conta de administrador';
    const form = document.getElementById('formCadAltAdmin');
    form.querySelector('.btn').textContent = 'Criar';
    abrirModal('modal_cadalt_admin');
    cadastrarAdmin();
};

window.abrirModalEditarAdmin = function (id, nome, email) {
    const modal = document.getElementById('modal_cadalt_admin');
    modal.querySelector('[name="titulo"]').textContent = 'Editar conta de administrador';
    const form = document.getElementById('formCadAltAdmin');
    form.querySelector('.btn').textContent = 'Editar';
    //Atribuindo valor aos campos
    form.querySelector('[name="nome"]').value = nome;
    form.querySelector('[name="email"]').value = email;
    abrirModal('modal_cadalt_admin');
    editarAdmin(id);
};

//-------CADASTRO DE ADMIN-------
function cadastrarAdmin() {
    document.getElementById('formCadAltAdmin').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const nome = form.querySelector('[name="nome"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const senha = form.querySelector('[name="senha"]').value;
        const confSenha = form.querySelector('[name="conf_senha"]').value;

        const error = document.getElementById('cadAltAdmin_error');
        let mensagemErro = '';

        //---Validações local---
        // Verificar campos preenchidos
        const errosPreenchimento = validarCamposPreenchidos(['nome', 'email', 'senha', 'conf_senha'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        }
        // Validar nome
        else if (!validarNomeProprio(nome)) {
            mensagemErro = 'Nome inválido.';
        }
        // Validar email
        else if (!validarEmail(email)) {
            mensagemErro = 'Email inválido.';
        }
        // Validar senha
        else if (!validarSenha(senha)) {
            mensagemErro = 'Senha fraca.';
        }
        // Verificar senhas
        else if (senha !== confSenha) {
            mensagemErro = 'As senhas não coincidem.';
        }
        // Se houve erro, mostra de forma centralizada
        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_admin .contorno-modal');
            return;
        }

        //---Verificar se o email já está cadastrado---
        const emailCheck = await fetch('../../app/Models/UsuarioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'verificar_email', email }),
        });

        const emailCheckJson = await emailCheck.json();

        if (emailCheckJson.existe) {
            error.textContent = 'Este email já está cadastrado.';
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_admin .contorno-modal');
            return;
        }

        //---Passando das validações---
        const dados = { nome, email, senha };
        const resposta = await fetch('../../app/Models/UsuarioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'cadastrar_admin', dados }),
        });
        const json = await resposta.json();

        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_cadalt_admin');
            alert(json.mensagem);
        } else {
            error.textContent = json.mensagem;
        }
    });
}

//-------EDIÇÃO DE ADMIN-------
function editarAdmin(id) {
    document.getElementById('formCadAltAdmin').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const nome = form.querySelector('[name="nome"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const senha = form.querySelector('[name="senha"]').value;
        const confSenha = form.querySelector('[name="conf_senha"]').value;

        const error = document.getElementById('cadAltAdmin_error');
        let mensagemErro = '';

        //---Validações local---
        // Verificar campos preenchidos
        const errosPreenchimento = validarCamposPreenchidos(['nome', 'email', 'senha', 'conf_senha'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        }
        // Validar nome
        else if (!validarNomeProprio(nome)) {
            mensagemErro = 'Nome inválido.';
        }
        // Validar email
        else if (!validarEmail(email)) {
            mensagemErro = 'Email inválido.';
        }
        // Validar senha
        else if (!validarSenha(senha)) {
            mensagemErro = 'Senha fraca.';
        }
        // Verificar senhas
        else if (senha !== confSenha) {
            mensagemErro = 'As senhas não coincidem.';
        }
        // Se houve erro, mostra de forma centralizada
        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_admin .contorno-modal');
            return;
        }

        //---Verificar se o email já está cadastrado---
        const emailCheck = await fetch('../../app/Models/UsuarioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'verificar_email', email }),
        });

        const emailCheckJson = await emailCheck.json();

        if (emailCheckJson.existe) {
            error.textContent = 'Este email já está cadastrado.';
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_admin .contorno-modal');
            return;
        }

        //---Passando das validações---
        const dados = { id, nome, email, senha };
        const resposta = await fetch('../../app/Models/UsuarioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'editar_admin', dados }),
        });
        const json = await resposta.json();

        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_cadalt_admin');
            alert(json.mensagem);
        } else {
            error.textContent = json.mensagem;
        }
    });
}

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

window.abrirModalCadastrarUsuario = function () {
    const form = document.getElementById('formCadAltUsuario');
    form.querySelector('.btn').textContent = 'Cadastrar';
    abrirModal('modal_cadalt_usuario');
    cadastrarUsuario();
};

window.abrirModalEditarUsuario = function (id, nome, email, telefone, dataNasc) {
    const modal = document.getElementById('modal_cadalt_usuario');
    modal.querySelector('[name="titulo"]').textContent = 'Editar conta de Usuario';
    const form = document.getElementById('formCadAltUsuario');
    form.querySelector('.btn').textContent = 'Editar';
    //Atribuindo valor aos campos
    form.querySelector('[name="nome"]').value = nome;
    form.querySelector('[name="email"]').value = email;
    form.querySelector('[name="telefone"]').value = telefone;
    form.querySelector('[name="data_nasc"]').value = converterDataParaBR(dataNasc);
    abrirModal('modal_cadalt_usuario');
    editarUsuario(id);
};

//-------CADASTRO DE USUÁRIO-------
let codigoCriado = '';
let dados = {};

function cadastrarUsuario() {
    document.getElementById('formCadAltUsuario').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const nome = form.querySelector('[name="nome"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const telefone = form.querySelector('[name="telefone"]').value.trim();
        let dataNasc = form.querySelector('[name="data_nasc"]').value.trim();
        const senha = form.querySelector('[name="senha"]').value;
        const confSenha = form.querySelector('[name="conf_senha"]').value;

        dataNasc = converterDataParaISO(dataNasc);
        const idade = calcularIdade(dataNasc);

        const error = document.getElementById('cadAltUsuario_error');
        let mensagemErro = '';

        //--- Validações locais ---
        const errosPreenchimento = validarCamposPreenchidos(['nome', 'email', 'telefone', 'data_nasc', 'senha', 'conf_senha'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        } else if (!validarNomeProprio(nome)) {
            mensagemErro = 'Nome inválido.';
        } else if (!validarEmail(email)) {
            mensagemErro = 'Email inválido.';
        } else if (!validarTelefone(telefone)) {
            mensagemErro = 'Telefone inválido.';
        } else if (idade < 18) {
            mensagemErro = 'Você deve ter 18 anos ou mais para se cadastrar.';
        } else if (idade > 120) {
            mensagemErro = 'Idade inválida.';
        } else if (!validarSenha(senha)) {
            mensagemErro = 'Senha fraca.';
        } else if (senha !== confSenha) {
            mensagemErro = 'As senhas não coincidem.';
        }

        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_usuario .contorno-modal');
            return;
        }

        //--- Verificar se o email já está cadastrado ---
        const emailCheck = await fetch('app/Models/UsuarioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'verificar_email', email }),
        });

        const emailCheckJson = await emailCheck.json();

        if (emailCheckJson.existe) {
            error.textContent = 'Este email já está cadastrado.';
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_usuario .contorno-modal');
            return;
        }

        //--- Preparar dados e abrir modal de validação ---
        dados = { nome, email, telefone, dataNasc, senha };

        fecharModal('modal_cadalt_usuario');
        abrirModal('modal_validar_email');
        document.getElementById('validacao_email').textContent = email;

        // Enviar código de validação
        const resposta = await fetch('app/Models/UsuarioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'enviar_codigo' , email }),
        });

        const json = await resposta.json();
        codigoCriado = json.codigo;
        console.log('Código gerado:', codigoCriado);
    });

    verificarCodigo();  
}

function verificarCodigo(){
    document.getElementById('formValidacaoEmail').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const codigoInformado = form.querySelector('[name="codigo"]').value.trim();
        const error = document.getElementById('validarEmail_error');
        let mensagemErroValidacao = '';

        const errosPreenchimento = validarCamposPreenchidos(['codigo'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErroValidacao = errosPreenchimento[0];
        } else if (codigoInformado != codigoCriado) {
            mensagemErroValidacao = 'O código informado está incorreto.';
        }

        if (mensagemErroValidacao !== '') {
            error.textContent = mensagemErroValidacao;
            error.style.display = 'block';
            return;
        }

        // Cadastro final do usuário
        const respostaCadastro = await fetch('app/Models/UsuarioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'cadastrar_usuario', dados }),
        });

        const jsonCadastro = await respostaCadastro.json();

        if (!jsonCadastro.erro) {
            fecharModal('modal_validar_email');
            abrirModal('modal_cadastrar_foto');
            alert(jsonCadastro.mensagem);
        } else {
            error.textContent = jsonCadastro.mensagem;
            error.style.display = 'block';
        }
    });

    document.getElementById('reenviar_codigo').addEventListener('click', async function (e) {
        const resposta = await fetch('app/Models/UsuarioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'enviar_codigo' }),
        });

        const json = await resposta.json();
        codigoCriado = json.codigo;
        console.log('Código gerado:', codigoCriado);
    });
}

//-------EDIÇÃO DE ADMIN-------
function editarUsuario(id) {
    document.getElementById('formCadAltUsuario').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const nome = form.querySelector('[name="nome"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const telefone = form.querySelector('[name="telefone"]').value.trim();
        let dataNasc = form.querySelector('[name="data_nasc"]').value.trim();
        const senha = form.querySelector('[name="senha"]').value;
        const confSenha = form.querySelector('[name="conf_senha"]').value;

        dataNasc = converterDataParaISO(dataNasc);
        const idade = calcularIdade(dataNasc);

        const error = document.getElementById('cadAltUsuario_error');
        let mensagemErro = '';

        //--- Validações locais ---
        const errosPreenchimento = validarCamposPreenchidos(['nome', 'email', 'telefone', 'data_nasc', 'senha', 'conf_senha'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        } else if (!validarNomeProprio(nome)) {
            mensagemErro = 'Nome inválido.';
        } else if (!validarEmail(email)) {
            mensagemErro = 'Email inválido.';
        } else if (!validarTelefone(telefone)) {
            mensagemErro = 'Telefone inválido.';
        } else if (idade < 18) {
            mensagemErro = 'Você deve ter 18 anos ou mais para se cadastrar.';
        } else if (idade > 120) {
            mensagemErro = 'Idade inválida.';
        } else if (!validarSenha(senha)) {
            mensagemErro = 'Senha fraca.';
        } else if (senha !== confSenha) {
            mensagemErro = 'As senhas não coincidem.';
        }

        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_usuario .contorno-modal');
            return;
        }

        //--- Verificar se o email já está cadastrado ---
        const emailCheck = await fetch('app/Models/UsuarioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'verificar_email', email }),
        });

        const emailCheckJson = await emailCheck.json();

        if (emailCheckJson.existe) {
            error.textContent = 'Este email já está cadastrado.';
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_usuario .contorno-modal');
            return;
        }

        //--- Preparar dados e abrir modal de validação ---
        dados = { id, nome, email, telefone, dataNasc, senha };
        const resposta = await fetch('../../app/Models/UsuarioModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'editar_usuario', dados }),
        });
        const json = await resposta.json();

        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_cadalt_usuario');
            alert(json.mensagem);
        } else {
            error.textContent = json.mensagem;
        }
    });
}