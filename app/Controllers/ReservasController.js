import {converterDataParaBR,validarDataPassada,validarDataFutura,validarDistanciaData,converterDataParaISO, abrirModal, fecharModal} from './Utils.js';

const pagina = document.body.dataset.page;

if (pagina === 'reservas') {
    document.addEventListener("DOMContentLoaded", function () {
        listaReservas();
        mostrarTudo();
    });
}

// ------- util -------
async function retornarPrecos() {
  const response = await fetch(`../../app/Models/PrecosModel.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ acao: "listar_precos" }),
  });
  return await response.json();
}

function parseDateFlexible(str) {
  if (!str) return null;
  if (str.includes("/")) {
    const [d, m, y] = str.split("/").map(Number);
    return new Date(y, m - 1, d);
  }
  if (str.includes("-")) {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  return null;
}

function calcularPreco(diaInicial, diaFinal, precoDiaria, precoDiariaFds) {
  const ini = parseDateFlexible(diaInicial);
  const fim = parseDateFlexible(diaFinal);
  if (!ini || !fim || fim <= ini) return 0;

  // normaliza para meia-noite pra evitar problemas de fuso/DST
  ini.setHours(0, 0, 0, 0);
  fim.setHours(0, 0, 0, 0);

  let total = 0;
  const cursor = new Date(ini);
  while (cursor < fim) {
    const dow = cursor.getDay(); // 0=Dom ... 5=Sex 6=Sáb
    total += (dow === 5 || dow === 6) ? Number(precoDiariaFds) : Number(precoDiaria);
    cursor.setDate(cursor.getDate() + 1);
  }
  return total;
}

// ------- página "faça sua reserva" -------
if (pagina === 'faca_sua_reserva') {
  const preForm = document.getElementById('preFormReserva');
  const elPrecoDiaria = preForm.querySelector('[name="preco_diaria"]');
  const elPrecoDiariaFds = preForm.querySelector('[name="preco_diaria_fds"]');
  const elPrecoTotal = preForm.querySelector('[name="preco_total"]');
  const inputCheckin = preForm.querySelector('[name="data_inicial"]');
  const inputCheckout = preForm.querySelector('[name="data_final"]');

  // 1) Preços do banco (NUMÉRICOS)
  const data = await retornarPrecos();
  const precoDiaria = Number(data?.[0]?.prediaria ?? 0);
  const precoDiariaFds = Number(data?.[0]?.prediariafds ?? 0);

  // 2) Exibe preços formatados
  elPrecoDiaria.textContent = `R$ ${precoDiaria.toFixed(2).replace('.', ',')} diária`;
  elPrecoDiariaFds.textContent = `R$ ${precoDiariaFds.toFixed(2).replace('.', ',')} fim de semana`;

  // 3) Atualiza total no pré-form
  const atualizarPrecoPreForm = () => {
    const total = calcularPreco(inputCheckin.value, inputCheckout.value, precoDiaria, precoDiariaFds);
    elPrecoTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  };
  atualizarPrecoPreForm();
  inputCheckin.addEventListener('change', atualizarPrecoPreForm);
  inputCheckout.addEventListener('change', atualizarPrecoPreForm);

  // 4) Abrir modal e sincronizar datas + total
  preForm.querySelector('[name="reservar"]').addEventListener('click', (e) => {
    e.preventDefault();
    abrirModalCadastrarReserva();

    const formModal = document.getElementById('formCadAltReserva');
    const modalCheckin = formModal.querySelector('[name="data_inicial"]');
    const modalCheckout = formModal.querySelector('[name="data_final"]');
    const modalTotalEl = formModal.querySelector('[name="preco_total"]');

    // Prefill com as datas do pré-form
    modalCheckin.value = inputCheckin.value;
    modalCheckout.value = inputCheckout.value;

    const atualizarPrecoModal = () => {
      const total = calcularPreco(modalCheckin.value, modalCheckout.value, precoDiaria, precoDiariaFds);
      modalTotalEl.innerHTML = `<strong>Valor Total: </strong>R$ ${total.toFixed(2).replace('.', ',')}`;
    };
    atualizarPrecoModal();
    modalCheckin.addEventListener('change', atualizarPrecoModal);
    modalCheckout.addEventListener('change', atualizarPrecoModal);
  });

  // 5) Submit do modal (envia reserva)
  
}

if (pagina === 'conta_usuario') {
  document.addEventListener('DOMContentLoaded', function(){
    listaReservasNPagas();
  });
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
                        <img src="/chale/public/assets/icons/icon-lixeira.svg" class="icon" onclick="abrirModal('modal_cancelar')">
                    </div>
                </div>
                `;
        });
    
    });
}

function listaReservasNPagas() {
    let lista = document.getElementById("reservas_nao_pagas");
    fetch(`../../app/Models/ReservasModel.php`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({ acao: "listar_reservas_npagas" }),
    }).then((response) => response.json()).then((data) => {
        lista.innerHTML = "";
        data.forEach((reserva) => {
            const checkin = converterDataParaBR(reserva.rescheckin);
            const checkout = converterDataParaBR(reserva.rescheckout);
            const valor = Number(reserva.resvtotal);
            lista.innerHTML += `
              <div class="card-reservaUser">
                <div class="date-container">
                    <div class="date-group">
                        <span class="date-label">Check-in</span>
                        <div class="divider-horizontal"></div>
                        <input type="text" class="date-input" value="${checkin}" readonly>
                    </div>
                    <div class="divider-vertical"></div>
                    <div class="date-group">
                        <span class="date-label">Check-out</span>
                        <div class="divider-horizontal"></div>
                        <input type="text" class="date-input" value="${checkout}" readonly>
                    </div>
                </div>
                <p class="valor"><strong>Valor total:</strong>R$${valor.toFixed(2).replace('.', ',')}</p>
                <div class="card-reservaUser-footer">
                  <p class="textinho" onclick="abrirModalEditarReserva()">Editar período <img src="/chale/public/assets/icons/icon-editar.svg" class="icon"></p>
                  <button type="submit" class="btn" onclick="abrirModal('modal_pagamento')">Pagar</button>
                </div>
              </div>   
                `;
        });
        if (data.length > 0) {
          const numero = document.getElementById('numeroReservasNPagas');
          numero.style.display= 'block';
          numero.textContent = data.length; // mostra a quantidade de reservas
        } else {
          document.getElementById('numeroReservasNPagas').style.display = "none";
        }
    });
}

//tirar o limite de tamanho para mostrar a lista completa de reservas
function mostrarTudo() {
    let mostrar = document.getElementById('mostrar_lista');
    let container = document.getElementById('container_reservas');

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

window.abrirModalCadastrarReserva = function () {
  const modal = document.getElementById('modal_cadalt_reserva');
  modal.querySelector('[name="titulo"]').textContent = 'Fazer reserva';
  const form = document.getElementById('formCadAltReserva');
  form.querySelector('.btn').textContent = 'Criar';
  abrirModal('modal_cadalt_reserva');
  cadastrarReserva();
} 

async function cadastrarReserva() {
  document.getElementById('formCadAltReserva').addEventListener('submit', async function (e) {
    e.preventDefault();

    const precos = await retornarPrecos();
    const precoDiaria = Number(precos?.[0]?.prediaria ?? 0);
    const precoDiariaFds = Number(precos?.[0]?.prediariafds ?? 0);

    const modalCheckin = this.querySelector('[name="data_inicial"]').value;
    const modalCheckout = this.querySelector('[name="data_final"]').value;
    const valorTotal = calcularPreco(modalCheckin, modalCheckout, precoDiaria, precoDiariaFds);

    const error = document.getElementById('cadReserva_error');
    let mensagemErro = '';

    const diffDias = validarDistanciaData(modalCheckin, modalCheckout);

    if (diffDias < 1) {
      mensagemErro = 'O período precisa ter uma duração de pelo menos 1 dia';
    } else if (diffDias > 31) {
      mensagemErro = 'O período não pode ultrapassar 31 dias';
    }
    //Validar se a data não está no passado
    else if (!validarDataPassada(modalCheckin)){
      mensagemErro = 'Você não pode usar uma data no passado';
    }
    //Validar se a data não está mais distante que 10 anos
    else if (!validarDataFutura(modalCheckout)){
      mensagemErro = 'Você não pode usar uma data tão distante';
    }
    //Validar se a data final está pelo menos 1 dia a frente da data inicial
    else if (!validarDistanciaData(modalCheckin, modalCheckout)){
      mensagemErro = 'O período precisa ter uma duração de pelo menos um dia';
    }
    if (mensagemErro !== '') {
      error.textContent = mensagemErro;
      error.style.display = 'block';
      scrollModalToTop('#modal_cadalt_promocao .bloco-modal-geral');
      return;
    }
    let dataInicial = converterDataParaISO(modalCheckin);
    let dataFinal = converterDataParaISO(modalCheckout);
    const dados = {
      dataInicial, // mande no formato que seu PHP espera
      dataFinal,
      valorTotal // número
    };

    // Ajuste o endpoint/ação conforme seu backend
    const resposta = await fetch('../../app/Models/ReservasModel.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ acao: 'cadastrar_reserva', dados })
    });

    const json = await resposta.json();

    if (!json.erro) {
      fecharModal('modal_cadalt_reserva');
      alert(json.mensagem || 'Reserva criada com sucesso!');
      abrirModal('modal_pagamento')
    } else {
      alert(json.mensagem);
    }
  });
}

window.abrirModalEditarPromocao = function (id, dataini, datafim) {
    const modal = document.getElementById('modal_cadalt_reserva');
    modal.querySelector('[name="titulo"]').textContent = 'Editar Reserva';
    const form = document.getElementById('formCadAltPromocao');
    form.querySelector('.btn').textContent = 'Editar';
    //Atribuindo valor aos campos
    form.querySelector('[name="nome_promocao"]').value = nome;
    form.querySelector('[name="data_inicial"]').value = converterDataParaBR(dataini);
    form.querySelector('[name="data_final"]').value = converterDataParaBR(datafim);
    form.querySelector('[name="valor_diaria"]').value = npreco;
    form.querySelector('[name="valor_diariafds"]').value = nprecofds;
    abrirModal('modal_cadalt_promocao');
    editarPromocao(id);
};
