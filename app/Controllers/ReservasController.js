document.addEventListener("DOMContentLoaded", function() {
    listaReservas();
});

function listaReservas() {
    const caminho = '/chale/app/';
    lista = document.getElementById('lista_reservas');
    fetch(`${caminho}Models/ReservasModel.php?action=listaReservas`)
        .then(response => response.json())
        .then(data => {
            lista.innerHTML = '';
            data.forEach(reserva => {
                let fotoHTML = '';
                if (reserva.usufoto) {
                    // Se tiver foto, exibe com uma URL dinâmica (exemplo com exibir_imagem.php?id=)
                    //fotoHTML = `<img src="${caminho}exibir_imagem.php?tabela=usuarios&campo=usufoto&id=${reserva.usuid}" alt="Foto do usuário" class="foto-usuario">`;
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
                                <p>${reserva.idade}</p>
                            </div>
                            <hr class="divider-horizontal">
                            <div class="info">
                                <h3>Valor pago: </h3>
                                <p>R$ ${reserva.resvtotal}</p>
                            </div>
                            <div class="info">
                                <h3>Check-in: </h3>
                                <p>${reserva.rescheckin}</p>
                            </div>
                            <div class="info">
                                <h3>Check-out: </h3>
                                <p>${reserva.rescheckout}</p>
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

