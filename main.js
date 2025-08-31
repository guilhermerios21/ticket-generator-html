const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("photo");
const uploadBtn = document.getElementById("upload-btn");
const previewImg = document.getElementById("photo-preview");
const uploadText = document.querySelector(".upload-text");
const actionBtns = document.querySelectorAll(".action-btn");
const uploadNote = document.getElementById("upload-note");

// isso aqui impede o comportamento padrão de abrir a imagem no navegador
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, e => {
    e.preventDefault();
    e.stopPropagation();
  });
});

//abre o explorador de arquivos do usuario
uploadBtn.addEventListener("click", () => {
  fileInput.click();
});


//esses dois mudam o estilo da area de upload quando o arquivo entra e sai dela (respectivamente)
dropArea.addEventListener("dragenter", () => {
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});


//pega o arquivo na area de drag e drop e chama a função handlefile pra validar e exibir a imagem
dropArea.addEventListener("drop", (e) => {
  const file = e.dataTransfer.files[0];
  dropArea.classList.remove("dragover");
  handleFile(file);
});

//mesma coisa da de cima mas funciona quando o usuario clica pra selecionar o arquivo
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  handleFile(file);
});


//função pra fazer verificações do arquivo, relacionadas ao tamanho e tipo da imagem
function handleFile(file) {
  //verifica o tipo do arquivo
  if (!file || !file.type.match(/^image\/(jpeg|png)$/)) {
    uploadNote.innerHTML = "Tipo de arquivo invalido!";
    uploadNote.classList.add("error");
    return;
  }
  //verifica o tamanho do arquivo
  if (file.size > 500 * 1024) {
    uploadNote.innerHTML = "Arquivo muito grande. Por favor, envie uma foto com menos de 500KB.";
    uploadNote.classList.add("error");
    return;
  }
  //exibe a preview da imagem antes de submeter o ingresso
  const reader = new FileReader();
  reader.onload = () => {
    previewImg.src = reader.result;
    previewImg.classList.remove("hidden");
    uploadBtn.classList.add("hidden");
    uploadText.classList.add("hidden");
    actionBtns.forEach(btn => btn.classList.remove("hidden"));
  };
  reader.readAsDataURL(file);
}

//funções dos botões de ação (remover e trocar imagem)
function removeImage(e) {
  e.preventDefault();
  previewImg.src = "";
  previewImg.classList.add("hidden");
  uploadBtn.classList.remove("hidden");
  uploadText.classList.remove("hidden");
  actionBtns.forEach(btn => btn.classList.add("hidden"));
  fileInput.value = "";
}

function changeImage(e) {
  e.preventDefault();
  fileInput.click();
}

//botão de submeter formulario
const submitBtn = document.querySelector(".submit-btn");

//função chamada pelo botão de submeter
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // captura os as informações do formulario
  const photo = document.getElementById("photo-preview").src;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const github = document.getElementById("github-username").value.trim();

  const nameInfo = document.getElementById("name-info");
  const emailInfo = document.getElementById("email-info");
  const githubInfo = document.getElementById("github-info");

  // reseta as mensagens de erro
  nameInfo.innerHTML = '';
  nameInfo.classList.remove("error");

  // apresenta mensagem de erro se o nome/email/github não forem fornecidos
  if (!name) {
    nameInfo.innerHTML = '<img src="assets/images/icon-info.svg" alt="Info Icon" /> Please provide full name!';
    nameInfo.classList.add("error");
    return;
  }

  if (!email) {
    emailInfo.innerHTML = '<img src="assets/images/icon-info.svg" alt="Info Icon" /> Por favor, insira um email!';
    emailInfo.classList.add("error");
    return;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailInfo.innerHTML = '<img src="assets/images/icon-info.svg" alt="Info Icon" /> Por favor insira um email válido!';
    emailInfo.classList.add("error");
    return;
  }

  if (!github) {
    githubInfo.innerHTML = '<img src="assets/images/icon-info.svg" alt="Info Icon" /> Por favor, insira seu nome de usuário do GitHub!';
    githubInfo.classList.add("error");
    return;
  } else if (!github.startsWith("@")) {
    githubInfo.innerHTML = '<img src="assets/images/icon-info.svg" alt="Info Icon" /> O nome de usuário do GitHub deve começar com "@"!';
    githubInfo.classList.add("error");
    return;
  }

  // Valida imagem
  if (!photo) {
    uploadNote.innerHTML = "Please upload a jpg or png file!";
    uploadNote.classList.add("error")
    return
  }

  // Se der tudo certo, salva no localStorage pra mostrar no ticket depois
  const formData = {
    name,
    email,
    github,
    photo
  };

  localStorage.setItem("ticketData", JSON.stringify(formData));
  window.location.href = "ticket.html";
});


/*
const partes = nome.trim().split(" ");
if (partes.length > 1) {
  nameInfo.textContent = "Digite apenas o primeiro nome";
  nameInfo.classList.add("error");
  return false;
}

const partes = nome.trim().split(" ");
if (partes.length < 2) {
  nameInfo.textContent = "Digite nome e sobrenome";
  nameInfo.classList.add("error");
  return false;
}

alert("Mensagem de erro");

Toastify({
  text: "Mensagem de erro",
  duration: 3000,
  gravity: "top",
  position: "right",
  backgroundColor: "red"
}).showToast();

if (!github.startsWith("@")) {
  githubInfo.textContent = "Inclua o @ no início do usuário";
  githubInfo.classList.add("error");
  return false;
}

if (!github.startsWith("@")) {
  github = "@" + github;
}

github = github.replace(/^@+/, "");
github = "@" + github;

if (file.size > 500 * 1024) {
  uploadNote.textContent = "A imagem deve ter no máximo 500KB";
  uploadNote.classList.add("error");
  return false;
}

if (email.endsWith("@gmail.com")) {
  emailInfo.textContent = "Não aceitamos e-mails do Gmail";
  emailInfo.classList.add("error");
  return false;
}
  */