import { validarCamposPreenchidos, validarString, validarDataPassada, validarDataFutura, validarDistanciaData, converterDataParaISO, fecharModal, abrirModal, scrollModalToTop, converterDataParaBR } from './Utils.js';

const pagina = document.body.dataset.page;

if (pagina === 'precos_promocoes') {
    document.addEventListener('DOMContentLoaded', function () {
        listarPromocoes();
        retornarPrecos();
    });

    //-------LISTAGEM DE PROMOÇÕES-------
    function listarPromocoes() {
        let lista = document.getElementById('listaPromocoes');
        fetch(`../../app/Models/PromocaoModel.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'listar_promocoes' }),
        })
            .then((response) => response.json())
            .then((data) => {
                lista.innerHTML = '';
                data.forEach((promocao) => {
                    const precoDiaria = Number(promocao.pronpreco);
                    const precoDiariaFds = Number(promocao.pronprecofds);
                    const dataInicial = converterDataParaBR(promocao.prodataini); //datas convertidas
                    const dataFinal = converterDataParaBR(promocao.prodatafim);
                    lista.innerHTML += `
                <div class="card-promocoes">
                    <h3 class="nome-promocao">${promocao.pronome}</h3>
                    <div class="promo-content">
                        <div class="bloco-promocoes-esquerdo">
                            <div class="date-container">
                                <div class="date-group">
                                    <span class="date-label">Início</span>
                                    <hr class="divider-horizontal">
                                    </hr>
                                    <p class="date-input">${dataInicial}</p>
                                </div>
                                <hr class="divider-vertical">
                                </hr>
                                <div class="date-group">
                                    <span class="date-label">Fim</span>
                                    <hr class="divider-horizontal">
                                    </hr>
                                    <p class="date-input">${dataInicial}</p>
                                </div>
                            </div>
                            <div class="promocoes-preco">
                                <p>Diária: R$ <strong>${precoDiaria.toFixed(2).replace('.', ',')}</strong></p>
                                <p>Diária fim de semana: R$ <strong>${precoDiariaFds.toFixed(2).replace('.', ',')}</strong></p>
                            </div>
                        </div>
                        <div class="icones-promocoes">
                            <img src="/chale/public/assets/icons/icon-editar.svg" class="lapzinho" onclick="abrirModalEditarPromocao(${promocao.proid},'${promocao.pronome}','${promocao.prodataini}','${promocao.prodatafim}',${precoDiaria},${precoDiariaFds})">
                            <img src="/chale/public/assets/icons/icon-lixeira.svg" class="lixeirinha" onclick="abrirModalExcluir('Promoção')">
                        </div>
                    </div>
                </div>
                `;
                });
            });
    }
    //-------LISTAGEM DE PREÇOS-------
    function retornarPrecos() {
        fetch(`../../app/Models/PrecosModel.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'listar_precos' }),
        })
            .then((response) => response.json())
            .then((data) => {
                const precoDiaria = Number(data?.[0]?.prediaria ?? 0);
                const precoDiariaFds = Number(data?.[0]?.prediariafds ?? 0);
                document.getElementById('precoDiaria').textContent = precoDiaria.toFixed(2).replace('.', ',');
                document.getElementById('precoDiariaFds').textContent = precoDiariaFds.toFixed(2).replace('.', ',');
                document.getElementById('editarPreco').onclick = () => abrirModalEditarPreco(data?.[0]?.preid ?? 0, precoDiaria, precoDiariaFds);
            });
    }
}

window.abrirModalCadastrarPromocao = function () {
    const modal = document.getElementById('modal_cadalt_promocao');
    modal.querySelector('[name="titulo"]').textContent = 'Cadastrar Promoção';
    const form = document.getElementById('formCadAltPromocao');
    form.querySelector('.btn').textContent = 'Criar';
    abrirModal('modal_cadalt_promocao');
    cadastrarPromocao();
};

window.abrirModalEditarPromocao = function (id, nome, dataini, datafim, npreco, nprecofds) {
    const modal = document.getElementById('modal_cadalt_promocao');
    modal.querySelector('[name="titulo"]').textContent = 'Editar Promoção';
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

async function editarPromocao(id) {
    document.getElementById('formCadAltPromocao').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const nomePromocao = form.querySelector('[name="nome_promocao"]').value.trim();
        let dataInicial = form.querySelector('[name="data_inicial"]').value.trim();
        let dataFinal = form.querySelector('[name="data_final"]').value.trim();
        const valorDiaria = form.querySelector('[name="valor_diaria"]').value.trim();
        const valorDiariaFds = form.querySelector('[name="valor_diariafds"]').value.trim();

        const error = document.getElementById('cadPromocao_error');
        let mensagemErro = '';

        //---Validações local---
        // Verificar campos preenchidos
        const errosPreenchimento = validarCamposPreenchidos(['nome_promocao', 'data_inicial', 'data_final', 'valor_diaria', 'valor_diariafds'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        }
        //Validar nome
        else if (!validarString(nomePromocao)) {
            mensagemErro = 'Nome inválido.';
        }
        //Validar se a data não está no passado
        else if (!validarDataPassada(dataInicial)) {
            mensagemErro = 'Você não pode usar uma data no passado';
        }
        //Validar se a data não está mais distante que 10 anos
        else if (!validarDataFutura(dataFinal)) {
            mensagemErro = 'Você não pode usar uma data tão distante';
        }
        //Validar se a data final está pelo menos 1 dia a frente da data inicial
        else if (!validarDistanciaData(dataInicial, dataFinal)) {
            mensagemErro = 'O período precisa ter uma duração de pelo menos um dia';
        }
        // Se houve erro, mostra de forma centralizada
        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_promocao .bloco-modal-geral');
            return;
        }
        //Converter as datas dd/mm/yyyy para yyyy/mm/dd
        dataInicial = converterDataParaISO(dataInicial);
        dataFinal = converterDataParaISO(dataFinal);

        //---Verificar se já não existe uma promoção no mesmo período de tempo informado---
        let dados = { dataInicial, dataFinal };
        const dateCheck = await fetch('../../app/Models/PromocaoModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'verificar_data', dados }),
        });

        const dateCheckJson = await dateCheck.json();

        if (dateCheckJson.existe) {
            error.textContent = 'Já existe uma promoção nesse período';
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_promocao .bloco-modal-geral');
            return;
        }

        //---Passando das validações---
        dados = {
            id,
            nomePromocao,
            dataInicial,
            dataFinal,
            valorDiaria,
            valorDiariaFds,
        };
        const resposta = await fetch('../../app/Models/PromocaoModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'editar_promocao', dados }),
        });
        const json = await resposta.json();

        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_cadalt_promocao');
            alert(json.mensagem);
        } else {
            error.textContent = json.mensagem;
        }
    });
}

async function cadastrarPromocao() {
    document.getElementById('formCadAltPromocao').addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = this;
        const nomePromocao = form.querySelector('[name="nome_promocao"]').value.trim();
        let dataInicial = form.querySelector('[name="data_inicial"]').value.trim();
        let dataFinal = form.querySelector('[name="data_final"]').value.trim();
        const valorDiaria = form.querySelector('[name="valor_diaria"]').value.trim();
        const valorDiariaFds = form.querySelector('[name="valor_diariafds"]').value.trim();

        const error = document.getElementById('cadAltPromocao_error');
        let mensagemErro = '';

        //---Validações local---
        // Verificar campos preenchidos
        const errosPreenchimento = validarCamposPreenchidos(['nome_promocao', 'data_inicial', 'data_final', 'valor_diaria', 'valor_diariafds'], form);
        if (errosPreenchimento.length > 0) {
            mensagemErro = errosPreenchimento[0];
        }
        //Validar nome
        else if (!validarString(nomePromocao)) {
            mensagemErro = 'Nome inválido.';
        }
        //Validar se a data não está no passado
        else if (!validarDataPassada(dataInicial)) {
            mensagemErro = 'Você não pode usar uma data no passado';
        }
        //Validar se a data não está mais distante que 10 anos
        else if (!validarDataFutura(dataFinal)) {
            mensagemErro = 'Você não pode usar uma data tão distante';
        }
        //Validar se a data final está pelo menos 1 dia a frente da data inicial
        else if (!validarDistanciaData(dataInicial, dataFinal)) {
            mensagemErro = 'O período precisa ter uma duração de pelo menos um dia';
        }
        // Se houve erro, mostra de forma centralizada
        if (mensagemErro !== '') {
            error.textContent = mensagemErro;
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_promocao .bloco-modal-geral');
            return;
        }
        //Converter as datas dd/mm/yyyy para yyyy/mm/dd
        dataInicial = converterDataParaISO(dataInicial);
        dataFinal = converterDataParaISO(dataFinal);

        //---Verificar se já não existe uma promoção no mesmo período de tempo informado---
        let dados = { dataInicial, dataFinal };
        const dateCheck = await fetch('../../app/Models/PromocaoModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'verificar_data', dados }),
        });

        const dateCheckJson = await dateCheck.json();

        if (dateCheckJson.existe) {
            error.textContent = 'Já existe uma promoção nesse período';
            error.style.display = 'block';
            scrollModalToTop('#modal_cadalt_promocao .bloco-modal-geral');
            return;
        }

        //---Passando das validações---
        dados = {
            nomePromocao,
            dataInicial,
            dataFinal,
            valorDiaria,
            valorDiariaFds,
        };
        const resposta = await fetch('../../app/Models/PromocaoModel.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ acao: 'cadastrar_promocao', dados }),
        });
        const json = await resposta.json();

        //Limpa os campos após sucesso e mostra um alert com a mensagem de erro ou sucesso
        if (!json.erro) {
            fecharModal('modal_cadalt_promocao');
            alert(json.mensagem);
        } else {
            error.textContent = json.mensagem;
        }
    });
}

window.abrirModalEditarPreco = function (id, preco, precofds) {
    const form = document.getElementById('formAlterarPreco');
    //Atribuindo valor aos campos
    form.querySelector('[name="valor_diaria"]').value = preco.toFixed(2).replace('.', ',');
    form.querySelector('[name="valor_diariafds"]').value = precofds.toFixed(2).replace('.', ',');
    abrirModal('modal_alterar_preco');
    editarPromocao(id);
};
