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