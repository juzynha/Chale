import {converterDataParaBR} from './Validacoes.js';
import {abrirModal, fecharModal} from '../../public/js/script.js';

const pagina = document.body.dataset.page;

if (pagina === 'reservas') {
    document.addEventListener("DOMContentLoaded", function () {
        listaReservas();
        mostrarTudo();
    });
}

if (pagina === 'faca_sua_reserva') {
    let data = await retornarPrecos();
    // atribui os preços (em valor numérico) a variáveis
    let precoDiaria = Number(data[0].prediaria);
    let precoDiariaFds = Number(data[0].prediariafds);

    const preForm = document.getElementById('preFormReserva');
    // exibe preços na caixa de reserva 
    preForm.querySelector('[name="preco_diaria"]').textContent = 'R$ ' + precoDiaria.toFixed(2).replace('.', ',') + ' diária';
    preForm.querySelector('[name="preco_diaria_fds"]').textContent = 'R$ ' + precoDiariaFds.toFixed(2).replace('.', ',') + ' fim de semana';

    // exibe o preço
    let dataInicial = preForm.querySelector('[name="data_inicial"]').value;
    let dataFinal = preForm.querySelector('[name="data_final"]').value;

    let precoTotal = calcularPreco(dataInicial, dataFinal, precoDiariaNum, precoDiariaFdsNum);
    let precoTotalFmt = precoTotal.toFixed(2).replace('.', ',');
    let preco = preForm.querySelector('[name="preco_total"]');
    console.log(preco);
    preForm.querySelector('[name="preco_total"]').textContent = 'Total: R$ ' + precoTotalFmt;

    //ao abrir o modal, preenche os inputs dele com os valores que estavam na caixinha de infos 
    preForm.querySelector('[name="reservar"]').addEventListener('click', async function (e) { 
        e.preventDefault();
        
        abrirModal('modal_fazer_reserva');
        const form = document.getElementById('formFazerReserva');
        //exibe as datas selecionadas na caixa
        form.querySelector('[name="data_inicial"]').value = dataInicial;
        form.querySelector('[name="data_final"]').value = dataFinal;
    });
    
    //-------CADASTRO DE RESERVA-------
    document.getElementById('formFazerReserva').addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const form = this; 
        const dataInicial = form.querySelector('[name="data_inicial"]').value;
        const dataFinal = form.querySelector('[name="data_final"]').value;
        let data = await retornarPrecos();
        // cria variáveis formatadas para exibir
        let precoDiaria = Number(data[0].prediaria).toFixed(2).replace('.', ',');
        let precoDiariaFds = Number(data[0].prediariafds).toFixed(2).replace('.', ',');
        const valorTotal = calcularPreco(dataInicial,dataFinal,precoDiaria,precoDiariaFds);
        const error = document.getElementById('cadSessao_error');
        let mensagemErro = '';

        //---Validações---
        //Verificar campos preenchidos
        const errosPreenchimento = validarCamposPreenchidos(['nome_sessao'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        }
        //Validar nome
        else if (!validarString(nomeSessao)) {
            mensagemErro = 'Nome inválido.';
        }
        // Se houve erro, mostra de forma centralizada
        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            return;
        }

        //---Passando das validações---
        const dados = {nomeSessao, referencia};
        const resposta = await fetch('../../app/Models/SessoesModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({acao: 'cadastrar_sessao', dados})
        });
        const json = await resposta.json();
        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_criar_sessao');
            alert(json.mensagem);
        } else {
            error.textContent= json.mensagem;
        }

    });
}

// busca preços do banco
async function retornarPrecos() {
    const response = await fetch(`../../app/Models/PrecosModel.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ acao: "listar_precos" }),
    });

    const data = await response.json();
    return data;
}

function calcularPreco(diaInicial, diaFinal, precoDiaria, precoDiariaFds) {
    // Converter strings dd/mm/yyyy para objetos Date
    const [diaI, mesI, anoI] = diaInicial.split('/').map(Number);
    const [diaF, mesF, anoF] = diaFinal.split('/').map(Number);

    let dataInicio = new Date(anoI, mesI - 1, diaI);
    let dataFim = new Date(anoF, mesF - 1, diaF);

    // Garantir que a data final seja depois da inicial
    if (dataFim <= dataInicio) {
        return 0; // ou lançar erro
    }

    let total = 0;

    // Loop de cada noite
    while (dataInicio < dataFim) {
        const diaSemana = dataInicio.getDay(); // 0=Dom, 5=Sex, 6=Sáb
        
        // Se for sexta (5) ou sábado (6) → preço de fim de semana
        if (diaSemana === 5 || diaSemana === 6) {
            total += precoDiariaFds;
        } else {
            total += precoDiaria;
        }

        // Avança 1 dia
        dataInicio.setDate(dataInicio.getDate() + 1);
    }

    return total;
}

function listaReservas() {
    let lista = document.getElementById("lista_reservas");
    fetch(`../../app/Models/ReservasModel.php`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({ acao: "listar_reservas" }),
    }).then((response) => response.json()).then((data) => {
        lista.innerHTML = "";
        data.forEach((reserva) => {
            let fotoHTML = "";
            const checkin = converterDataParaBR(reserva.rescheckin);
            const checkout = converterDataParaBR(reserva.rescheckout);
            if (reserva.usufotcaminho) {
            fotoHTML += `<img src="/chale/public/uploads/perfil-usuario/${reserva.usufotcaminho}" class="foto-usuario">`;
            } else {
            // Se não tiver foto, exibe o ícone padrão
            fotoHTML = `<img src="/chale/public/assets/icons/icon-user.svg" width="25px">`;
            }
            lista.innerHTML += `
                <div class="card-reserva">
                    <div class="infos-reserva">
                        <div class="nome-cliente">
                            <div class="foto-cliente">${fotoHTML}</div>
                            <p>${reserva.usunome}</p>
                        </div>
                        <div class="info">
                            <h3>Telefone: </h3>
                            <p>${reserva.usutelefone}</p>
                        </div>
                        <div class="info">
                            <h3>E-mail: </h3>
                            <p>${reserva.usuemail}</p>
                        </div>
                        <div class="info">
                            <h3>Idade: </h3>
                            <p>${reserva.usuidade}</p>
                        </div>
                        <hr class="divider-horizontal">
                        <div class="info">
                            <h3>Valor pago: </h3>
                            <p>R$ ${reserva.resvtotal}</p>
                        </div>
                        <div class="info">
                            <h3>Check-in: </h3>
                            <p>${checkin}</p>
                        </div>
                        <div class="info">
                            <h3>Check-out: </h3>
                            <p>${checkout}</p>
                        </div>
                    </div>
                    <div class="excluir-reserva">
                        <img src="/chale/public/assets/icons/icon-lixeira.svg" class="icon" onclick="abrirModal('excluir_reserva')">
                    </div>
                </div>
                `;
        });
    
    });
}

//tirar o limite de tamanho para mostrar a lista completa de reservas
function mostrarTudo() {
    let mostrar = document.getElementById('mostrar_lista');
    let container = document.getElementById('container_reservas');

    // Calcula 150% da altura da tela
    let alturaLimite = window.innerHeight * 0.1;

    // Verifica se o conteúdo ultrapassa 150% da tela
    if (container.scrollHeight > alturaLimite) {
        // Conteúdo é maior -> ativa limite e mostra o botão
        container.classList.add("limita-tamanho");
        mostrar.style.display = "flex"; // garante que o botão apareça

        // Configura o botão para alternar mostrar tudo/mostrar menos
        mostrar.addEventListener("click", function () {
            if (mostrar.textContent === 'Mostrar tudo') {
                // Expandir
                container.classList.remove("limita-tamanho");
                mostrar.textContent = 'Mostrar menos';
            } else {
                // Recolher
                container.classList.add("limita-tamanho");
                mostrar.textContent = 'Mostrar tudo';
            }
        });
    } else {
        // Conteúdo não é grande -> sem limite, esconde botão ou desativa
        container.classList.remove("limita-tamanho");
        container.classList.add("sem-limite");
        mostrar.style.display = "none"; // esconde o botão
    }
}