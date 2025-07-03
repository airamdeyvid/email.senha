document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  const emailError = document.getElementById("emailError");
  const senhaError = document.getElementById("senhaError");

  // Validação de e-mail
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Validação de senha (mínimo de complexidade)
  function validarSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(senha);
  }

  // Função auxiliar de validação
  function validarCampo(input, erroElemento, funcaoValidacao) {
    const valor = input.value.trim();
    if (funcaoValidacao(valor)) {
      input.classList.remove("invalid");
      input.classList.add("valid");
      erroElemento.style.display = "none";
    } else {
      input.classList.remove("valid");
      input.classList.add("invalid");
      erroElemento.style.display = "block";
    }
  }

  // Eventos em tempo real
  emailInput.addEventListener("input", () => {
    validarCampo(emailInput, emailError, validarEmail);
  });

  senhaInput.addEventListener("input", () => {
    validarCampo(senhaInput, senhaError, validarSenha);
  });

  // Validação final no envio
  document.getElementById("cadastroForm").addEventListener("submit", function (e) {
    let isValid = true;

    if (!validarEmail(emailInput.value.trim())) {
      validarCampo(emailInput, emailError, () => false);
      isValid = false;
    }

    if (!validarSenha(senhaInput.value.trim())) {
      validarCampo(senhaInput, senhaError, () => false);
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      alert("Por favor, corrija os erros antes de enviar.");
    }
  });
});