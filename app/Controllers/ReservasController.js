import {converterDataParaBR} from './Validacoes.js';

const pagina = document.body.dataset.page;

if (pagina === 'reservas') {
    document.addEventListener("DOMContentLoaded", function () {
        listaReservas();
        mostrarTudo();
    });
}

if (pagina === 'faca_sua_reserva') {
    
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