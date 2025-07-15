// valida_nome.js
export function validarNome(nome) {
  // Começa com maiúscula, depois letras minúsculas, aceita acentos, espaço obrigatório
  const regex = /^[A-ZÀ-Ÿ][a-zà-ÿ]+(?: [A-ZÀ-Ÿ][a-zà-ÿ]+)+$/;
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

export function validarData(data) {
  // yyyy-mm-dd ou yyyy/mm/dd
  const regex = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
  return regex.test(data);
}

export function validarCampos(regras, container = document) {
  const erros = [];
  for (let name in regras) {
    const campo = container.querySelector(`[name="${name}"]`);
    if (campo && !regras[name](campo.value)) {
      erros.push(`Campo ${name} inválido`);
    }
  }
  return erros;
}