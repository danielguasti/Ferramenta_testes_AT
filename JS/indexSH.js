
let port, textEncoder, writableStreamClosed, writer, valor;
let check = false;
let testes = [];



const checkBoxes = document.querySelectorAll(".checkbox");
let selecionados;
document.querySelector(".todos").onclick = function (e) {
  
  let marcar = e.target.checked;
  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].checked = marcar;
  }
};

function verificarTestes() {
  testes = [];
  checkBoxes.forEach(function (el) {
    if (el.checked) {
      selecionados = testes.push(el.value);
    }
  });
  console.log(testes);
  console.log(selecionados);
  sendSerialLine(0);
}

async function sendSerialLine(dado) {
  dataToSend = testes[dado] + "\r";
  console.log(testes[dado]);
  appendToTerminal(">" + dataToSend);
  await writer.write(dataToSend);
  valor = dado;
  check = true;
}

async function enviarTexto() {
  dataToSend = document.getElementById("linha-para-enviar").value + "\r";
  console.log(dataToSend);
  appendToTerminal(">" + dataToSend);
  await writer.write(dataToSend);
  check = false;
}

const serialResultsDiv = document.getElementById("esquerdo");

function appendToTerminal(newStuff) {
  if (testesautomaticos == false) {
  if (check == true) {
    if (newStuff == "OK" || newStuff == "ERRO" || newStuff == "+ERROR" || "+UNKOWN_AT") {
      serialResultsDiv.innerHTML += newStuff + "\n" + "\n";
    } else {
      serialResultsDiv.innerHTML += newStuff + "\n";
    }
    if (
      valor < selecionados - 1 &&
      (newStuff == "OK" || newStuff == "ERRO" || newStuff == "+ERROR" || "+UNKOWN_AT")
    ) {
      valor++;
      sendSerialLine(valor);
    } else if (
      valor == selecionados - 1 &&
      (newStuff == "OK" || newStuff == "ERRO" || newStuff == "+ERROR" || "+UNKOWN_AT")
    ) {
      testes = [];
      check == false;
    }
  }

  if (check == false) {
    if (newStuff == "OK") {
      serialResultsDiv.innerHTML += newStuff + "\n" + "\n";
    } else {
      serialResultsDiv.innerHTML += newStuff + "\n";
    }
  }
}
}


