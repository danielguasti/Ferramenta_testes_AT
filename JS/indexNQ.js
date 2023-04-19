let testesNQ = [];
const checkbox = document.querySelectorAll(".checkbox-NQ");
let selecionado;

document.querySelector(".tudo").onclick = function (e) {
  let marcar = e.target.checked;
  for (let i = 0; i < checkbox.length; i++) {  
      checkbox[i].checked = marcar;
  }
};

function verificarTestesNQ() {
  testes = [];
  checkbox.forEach(function (el) {
    if (el.checked) {
      selecionados = testes.push(el.value);
    }
  });
  console.log(testes);
  console.log(selecionados);
  sendSerialLine(0);
}
