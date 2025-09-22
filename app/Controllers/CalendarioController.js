import {converterDataParaBR} from './Utils.js';

document.querySelectorAll(".calendario-box").forEach(container => {
    const daysTag = container.querySelector(".days");
    const currentDate = container.querySelector(".currentMonth");
    const prevNextIcon = container.querySelectorAll("header img");

    let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    let blockedDays = [];

    // Função para buscar dias bloqueados do PHP (só do banco)
    async function fetchBlockedDays() {
        try {
            const response = await fetch("/chale/app/Models/CalendarioModel.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ acao: "listar_bloqueados", ano: currYear, mes: currMonth + 1 })
            });
            blockedDays = await response.json(); // apenas dias do banco do mês atual
        } catch (err) {
            console.error("Erro ao buscar dias bloqueados:", err);
            blockedDays = [];
        }
    }

    // Função para renderizar o calendário
    async function renderCalendar() {
        await fetchBlockedDays(); // garante que blockedDays está atualizado

        const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
        const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
        const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
        const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

        const today = new Date();
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        let allDays = [];

        // dias do mês anterior
        for (let i = firstDayOfMonth; i > 0; i--) {
            allDays.push(`<div class="day"><li class="inactive">${lastDateOfLastMonth - i + 1}</li></div>`);
        }

        // dias do mês atual
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const dateObj = new Date(currYear, currMonth, i);
            const dateStr = `${currYear}-${String(currMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
            let classes = "";

            // marca hoje
            if (i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear()) {
                classes += "active";
            }

            // dias passados
            if (dateObj < todayDate) {
                classes += (classes ? " " : "") + "inactive";
            }
            // dias bloqueados do banco (somente do mês atual)
            else if (blockedDays.includes(dateStr)) {
                classes += (classes ? " " : "") + "blocked";
            }

            allDays.push(`<div class="day"><li class="${classes}" data-date="${dateStr}">${i}</li></div>`);
        }

        // dias do próximo mês
        for (let i = lastDayOfMonth; i < 6; i++) {
            allDays.push(`<div class="day"><li class="inactive">${i - lastDayOfMonth + 1}</li></div>`);
        }

        // montar linhas com divisores
        let liTag = "";
        const totalLines = Math.ceil(allDays.length / 7);
        for (let line = 0; line < totalLines; line++) {
            liTag += `<div class="days-line">`;
            for (let day = 0; day < 7; day++) {
                const index = line * 7 + day;
                if (index >= allDays.length) break;
                liTag += allDays[index];
                if (day < 6 && index < allDays.length - 1) {
                    liTag += `<hr class="divider-vertical-cal">`;
                }
            }
            liTag += `</div>`;
            if (line < totalLines - 1) {
                liTag += `<hr class="divider-horizontal-cal">`;
            }
        }

        currentDate.innerText = months[currMonth];
        daysTag.innerHTML = liTag;
    }

    // eventos de navegação de mês
    prevNextIcon.forEach(icon => {
        icon.addEventListener("click", async () => {
            currMonth = icon.classList.contains("prev") ? currMonth - 1 : currMonth + 1;

            if (currMonth < 0 || currMonth > 11) {
                date = new Date(currYear, currMonth, new Date().getDate());
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            } else {
                date = new Date();
            }

            await renderCalendar();
        });
    });

    renderCalendar();
});


// chama a function quando clicar no input de data
document.addEventListener("focusin", (e) => {
  if (e.target.matches("input.input-date")) {
    showMiniCalendar(e.target);
  }
});

function showMiniCalendar(input) {
    // remover calendário anterior se já existir
    document.querySelectorAll(".mini-calendario-box").forEach(cal => cal.remove());

    // criar container
    const calendarDiv = document.createElement("div");
    calendarDiv.classList.add("mini-calendario-box");
    // verificar se tem atributo data-blocked
    let type = input.hasAttribute("data-blocked") ? "blocked" : "common";
    calendarDiv.dataset.type = type;

    // posição do input
    const rect = input.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // checar espaço disponível (pra cima ou pra baixo)
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow > 250) { // tem espaço pra baixo
        calendarDiv.style.top = `${rect.bottom + scrollY}px`;
    } else { // coloca pra cima
        calendarDiv.style.top = `${rect.top + scrollY - 250}px`;
    }

    calendarDiv.style.left = `${rect.left + scrollX}px`;
    calendarDiv.style.position = "absolute";
    calendarDiv.style.zIndex = 9999;

    // estrutura inicial do calendário
    calendarDiv.innerHTML = `
        <header>
            <img src="/chale/public/assets/icons/icon-seta-left(branco).svg" class="icon prev">
            <span class="currentMonth"></span>
            <img src="/chale/public/assets/icons/icon-seta-right(branco).svg" class="icon next">
        </header>
        <div class="mini-calendario-content">
            <hr class="divider-horizontal-cal">
            <ul class="weeks">
                <li>Dom</li>
                <hr class="divider-vertical-cal">
                <li>Seg</li>
                <hr class="divider-vertical-cal">
                <li>Ter</li>
                <hr class="divider-vertical-cal">
                <li>Qua</li>
                <hr class="divider-vertical-cal">
                <li>Qui</li>
                <hr class="divider-vertical-cal">
                <li>Sex</li>
                <hr class="divider-vertical-cal">
                <li>Sab</li>
            </ul>
            <hr class="divider-horizontal-cal">
            <ul class="days"></ul>
        </div>
    `;

    // adicionar ao body
    document.body.appendChild(calendarDiv);

    // chamar renderização do calendário
    buildMiniCalendar(calendarDiv, type, (selectedDate) => {
        input.value = converterDataParaBR(selectedDate); 
        calendarDiv.remove(); // fecha ao selecionar
    });

    // --- FECHAR QUANDO CLICAR FORA ---
    function outsideClickHandler(e) {
        if (!calendarDiv.contains(e.target) && e.target !== input) {
            calendarDiv.remove();
            document.removeEventListener("click", outsideClickHandler);
        }
    }

    setTimeout(() => { // evita fechar imediatamente ao abrir
        document.addEventListener("click", outsideClickHandler);
    }, 0);
}

async function buildMiniCalendar(container, type, onSelect) {
    const daysTag = container.querySelector(".days");
    const currentDate = container.querySelector(".currentMonth");
    const prevNextIcon = container.querySelectorAll("header img");

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();

    let blockedDays = [];

    // Função para buscar os dias bloqueados do PHP e adicionar dias passados
    async function fetchBlockedDays() {
        blockedDays = [];
        if (type === "blocked") {
            try {
                const response = await fetch("/chale/app/Models/CalendarioModel.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ acao: "listar_bloqueados", ano: currYear, mes: currMonth + 1 })
                });
                blockedDays = await response.json(); // ex.: ["2025-09-12", "2025-09-20"]
            } catch (err) {
                console.error("Erro ao buscar dias bloqueados:", err);
            }

            // adiciona dias passados do mês atual
            const today = new Date();
            const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
            for (let i = 1; i <= lastDateOfMonth; i++) {
                const thisDay = new Date(currYear, currMonth, i);
                if (thisDay < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                    const dateStr = `${currYear}-${String(currMonth + 1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;
                    if (!blockedDays.includes(dateStr)) blockedDays.push(dateStr);
                }
            }
        }
    }

    // Função que monta o calendário
    function renderCalendar() {
        const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
        const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
        const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
        const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

        let allDays = [];

        // dias do mês anterior
        for (let i = firstDayOfMonth; i > 0; i--) {
            allDays.push(`<div class="day"><li class="inactive">${lastDateOfLastMonth - i + 1}</li></div>`);
        }

        // dias do mês atual
        for (let i = 1; i <= lastDateOfMonth; i++) {
            let isToday = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear() ? "active" : "";
            let dateStr = `${currYear}-${String(currMonth + 1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;
            let isBlocked = blockedDays.includes(dateStr) ? "blocked inactive" : ""; // <-- aqui adicionamos inactive

            allDays.push(`<div class="day"><li class="${isToday} ${isBlocked}" data-date="${dateStr}">${i}</li></div>`);
        }

        // dias do próximo mês
        for (let i = lastDayOfMonth; i < 6; i++) {
            allDays.push(`<div class="day"><li class="inactive">${i - lastDayOfMonth + 1}</li></div>`);
        }

        // montar linhas com divisores
        let liTag = "";
        const totalLines = Math.ceil(allDays.length / 7);

        for (let line = 0; line < totalLines; line++) {
            liTag += `<div class="days-line">`;
            for (let day = 0; day < 7; day++) {
                const index = line * 7 + day;
                if (index >= allDays.length) break;
                liTag += allDays[index];
                if (day < 6 && index < allDays.length - 1) {
                    liTag += `<hr class="divider-vertical-cal">`;
                }
            }
            liTag += `</div>`;
            if (line < totalLines - 1) {
                liTag += `<hr class="divider-horizontal-cal">`;
            }
        }

        currentDate.innerText = `${months[currMonth]} ${currYear}`;
        daysTag.innerHTML = liTag;

        // clique nos dias ativos
        daysTag.querySelectorAll("li").forEach(day => {
            if (!day.classList.contains("inactive") && !day.classList.contains("blocked")) {
                day.addEventListener("click", () => {
                    onSelect(day.dataset.date);
                });
            }
        });
    }

    // inicializa calendário
    await fetchBlockedDays();
    renderCalendar();

    // mudar mês
    prevNextIcon.forEach(icon => {
        icon.addEventListener("click", async () => {
            currMonth = icon.classList.contains("prev") ? currMonth - 1 : currMonth + 1;
            if (currMonth < 0) {
                currMonth = 11;
                currYear--;
            } else if (currMonth > 11) {
                currMonth = 0;
                currYear++;
            }

            await fetchBlockedDays();
            renderCalendar();
        });
    });
}


/*
const daysTag = document.getElementById("days"),
currentDate = document.getElementById("currentMonth"),
prevNextIcon = document.querySelectorAll(".calendario-box header img");

// obtendo nova data, ano atual e mês atual
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// armazenando o nome completo de todos os meses em um array
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
              "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let allDays = []; // irá armazenar cada dia já dentro de <div class="day"><li></li></div>

    // dias do mês anterior
    for (let i = firstDayofMonth; i > 0; i--) {
        allDays.push(`<div class="day"><li class="inactive">${lastDateofLastMonth - i + 1}</li></div>`);
    }

    // dias do mês atual
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        allDays.push(`<div class="day"><li class="${isToday}">${i}</li></div>`);
    }

    // dias do próximo mês para completar a última semana
    for (let i = lastDayofMonth; i < 6; i++) {
        allDays.push(`<div class="day"><li class="inactive">${i - lastDayofMonth + 1}</li></div>`);
    }

    // Montagem final:
    let liTag = "";
    let totalLines = Math.ceil(allDays.length / 7);

    for (let line = 0; line < totalLines; line++) {
        liTag += `<div class="days-line">`;
        for (let day = 0; day < 7; day++) {
            let index = line * 7 + day;
            if (index >= allDays.length) break;
            liTag += allDays[index];
            // adiciona <hr> vertical se NÃO for o último dia da linha
            if (day < 6 && index < allDays.length - 1) {
                liTag += `<hr class="divider-vertical-cal">`;
            }
        }
        liTag += `</div>`;
        // adiciona <hr> horizontal se NÃO for a última linha
        if (line < totalLines - 1) {
            liTag += `<hr class="divider-horizontal-cal">`;
        }
    }

    currentDate.innerText = `${months[currMonth]}`;
    daysTag.innerHTML = liTag;
};

const pagina = document.body.dataset.page;

if (pagina === 'reservas' || pagina === 'faca_sua_reserva') {
    renderCalendar();
}

prevNextIcon.forEach(icon => { // pegando os ícones de anterior e próximo
    icon.addEventListener("click", () => { // adicionando evento de clique
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});
*/