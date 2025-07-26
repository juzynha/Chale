/**
 * Valida se os campos obrigatórios não estão vazios.
 * 
 * @param {string[]} names - Lista de nomes dos campos obrigatórios (ex: ['nome', 'email', 'senha'])
 * @param {HTMLElement} container - Form ou modal onde estão os campos
 * @returns {string[]} - Lista de mensagens de erro, vazia se todos os campos estão preenchidos
 */
export function validarCamposPreenchidos(names, container = document) {
    for (let name of names) {
        const campo = container.querySelector(`[name="${name}"]`);
        if (campo && campo.value.trim() === '') {
            return ['Todos os campos devem ser preenchidos.'];
        }
    }
    return [];
}

//-------Validar estruturas-------
export function validarNomeProprio(nome) {
  const regex = /^[A-Za-zÀ-ÿ][a-zà-ÿ]+(?: [A-Za-zÀ-ÿ][a-zà-ÿ]+)+$/;
  return regex.test(nome.trim());
}

export function validarString(nome) {
  const regex = /^([A-Za-zÀ-ÿ][a-zà-ÿ]*)( [A-Za-zÀ-ÿ][a-zà-ÿ]*)*$/;
  return regex.test(nome.trim());
}

export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

export function validarSenha(senha) {
  // Mínimo 8 caracteres, pelo menos uma letra, um número e um símbolo
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(senha);
}

export function validarTelefone(numero) {
    const regex = /^(\(?\d{2}\)?\s?)?\d{5}-?\d{4}$/;
    return regex.test(numero);
}   

//-------Validar datas-------
export function validarData(data) {
  // yyyy-mm-dd ou yyyy/mm/dd
  const regex = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
  return regex.test(data);
}

export function validarDataPassada(dataString) {
    // Converte dd/mm/yyyy para Date
    const [dia, mes, ano] = dataString.split('/').map(Number);
    const dataInformada = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Comparação segura (ano, mês, dia)
    return (
        dataInformada.getFullYear() > hoje.getFullYear() ||
        (dataInformada.getFullYear() === hoje.getFullYear() && dataInformada.getMonth() > hoje.getMonth()) ||
        (dataInformada.getFullYear() === hoje.getFullYear() && dataInformada.getMonth() === hoje.getMonth() && dataInformada.getDate() >= hoje.getDate())
    );
}

export function validarDataFutura(dataString) {
    // Converte dd/mm/yyyy para Date
    const [dia, mes, ano] = dataString.split('/').map(Number);
    const dataInformada = new Date(ano, mes - 1, dia);

    // Cria limite de 10 anos à frente
    const hoje = new Date();
    const limite = new Date();
    limite.setFullYear(hoje.getFullYear() + 10);
    limite.setHours(23, 59, 59, 999); // garante comparação completa

    return dataInformada <= limite;
}

export function validarDistanciaData(dataInicialStr, dataFinalStr) {
    // Converte dd/mm/yyyy para Date
    const [diaI, mesI, anoI] = dataInicialStr.split('/').map(Number);
    const [diaF, mesF, anoF] = dataFinalStr.split('/').map(Number);

    const dataInicial = new Date(anoI, mesI - 1, diaI);
    const dataFinal = new Date(anoF, mesF - 1, diaF);

    // Zera as horas para evitar inconsistências de horário
    dataInicial.setHours(0, 0, 0, 0);
    dataFinal.setHours(0, 0, 0, 0);

    // Calcula a diferença em milissegundos e converte para dias
    const diffEmDias = (dataFinal - dataInicial) / (1000 * 60 * 60 * 24);

    return diffEmDias >= 1;
}

export function converterDataParaISO(data) {
    const partes = data.split('/');
    if (partes.length === 3) {
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return data; 
}
