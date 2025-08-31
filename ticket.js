//espera a pagina carregar inteira antes de rodar o codigo
window.addEventListener("DOMContentLoaded", () => {
     //captura as informações do formulario mandadas pela main
     const data = JSON.parse(localStorage.getItem("ticketData"));
     const name = document.getElementById("name");
     const email = document.getElementById("email");

     console.log(data);

     //caso o usuario não tiver preenchido o formulario redireciona pra pagina inicial
     if (!data) {
          window.location.href = "index.html";
          return;
     }

     name.textContent = data.name
     name.classList.add("gradient")
     email.textContent = data.email
     email.classList.add("error")


     //exibe as informações no ingresso
     document.getElementById("display-name").textContent = data.name;
     document.getElementById("display-github").textContent = data.github;
     document.getElementById("display-image").src = data.photo;
});
