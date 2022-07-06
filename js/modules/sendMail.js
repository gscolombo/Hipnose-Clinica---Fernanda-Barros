export default function send() {
  const form = document.querySelector(".contact form");
  const inputs = form.querySelectorAll(
    ".inputContainer input, .inputContainer textarea"
  );
  const sendButton = document.querySelector(".contact .buttonContainer");

  function toggleInputStatus(e) {
    const input = e.currentTarget;
    const label = input.nextElementSibling;
    input.value !== ""
      ? label.classList.add("active")
      : label.classList.remove("active");

    sendButton.classList.remove("error");
    sendButton.style = "";
    sendButton.querySelector("button").innerText = "ENVIAR";

    input.classList.remove("error");
    if (input.parentElement.nextElementSibling instanceof HTMLSpanElement) {
      input.parentElement.nextElementSibling.remove();
    }
  }

  async function sendEmail(event) {
    const container = event.currentTarget;
    const button = event.currentTarget.querySelector("button");
    const formData = new FormData(form);
    const body = Object.fromEntries(formData);
    const span = document.createElement("span");
    const noEmptyField =
      body.name !== "" && body.email !== "" && body.message !== "";

    if (noEmptyField) {
      button.innerText = " ";
      container.classList.add("clicked", "loading");

      const res = await fetch("sendEmail.php", {
        method: "POST",
        body: JSON.stringify(body),
      });
      container.classList.remove("loading");

      if (res.ok) {
        container.classList.add("success");
        button.innerText = "ENVIADO";
        span.innerText = "Obrigado! Em breve entraremos em contato!";
        container.removeEventListener("click", sendEmail);
      } else {
        container.classList.add("error");
        container.style.pointerEvents = "none";
        button.innerText = "ERRO";
        if (res.status === 500) {
          span.innerText =
            "Erro ao enviar o e-mail. Por favor, mande uma mensagem diretamente para nanda.oliveira009@gmail.com";
          container.removeEventListener("click", sendEmail);
          container.insertAdjacentElement("afterend", span);
        } else {
          const emailField = form.querySelector("input[type='email']");
          emailField.classList.add("error");
          emailField.parentElement.insertAdjacentElement("afterend", span);
          span.innerText = "Digite um e-mail válido";
        }
      }
    } else {
      form.querySelectorAll("textarea, input").forEach((field) => {
        const span = document.createElement("span");

        if (field.parentElement.nextElementSibling instanceof HTMLSpanElement) {
          field.parentElement.nextElementSibling.remove();
        }

        if (field.value === "") {
          field.classList.add("error");
          span.textContent = "*Campo obrigatório";
          field.parentElement.insertAdjacentElement("afterend", span);
        } else {
          field.classList.remove("error");
        }
      });
    }
  }

  sendButton.addEventListener("click", sendEmail);
  inputs.forEach((input) => input.addEventListener("input", toggleInputStatus));
}
