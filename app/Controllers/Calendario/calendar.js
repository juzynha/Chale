const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".mes-atual"),
prevNextIcon = document.querySelectorAll(".header-calendario span");

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

renderCalendar();

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

/*
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth', // visualização em mês
      locale: 'pt-br', // idioma em português
      selectable: true, // permite clicar e selecionar dias
      select: function (info) {
        // ação ao selecionar um dia ou intervalo
        const dataInicio = info.startStr;
        const dataFim = info.endStr;
        console.log("Selecionado:", dataInicio, "até", dataFim);
        // aqui você pode abrir um modal para bloquear, por exemplo
      },
      eventClick: function(info) {
        // ação ao clicar em um evento (ex: desbloquear ou ver detalhes)
        console.log("Evento clicado:", info.event.title);
      },
      events: '/meus-eventos.php' // seu script PHP que retorna os bloqueios
    });

    calendar.render();
  });
  */