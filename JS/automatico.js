let SH = ['AT???', 'ATSI?', 'ATSP?', 'ATCT?', 'ATIT?', 'ATPT?', 'ALM?', 'ATSR?', 'ATLP!', 'AT', 'AT+HWINFO?', 'AT+PTEMP?', 'AT+CSQ?', 'AT+IMEI?', 'AT+NCCID?', 'AT+LSM?', 'AT+CT?', 'AT+LP'];
let nomes_SH = ['Microcontrolador', 'UUID', 'PAC', 'Contagem dos Contadores', 'Temperatura e Humidade', 'Temperatura e Probes', 'Sensor LSM', 'Zonas Sigfox', 'Baixo Consumo', 'Pré-Produção', 'Quectel', 'Temperatura e Probes', 'Teste de Sinal', 'IMEI', 'NCCID', 'Sensor LSM', 'Contadores', 'Baixo Consumo'];
let log = [];
let value;
const btnLOG = document.getElementById("botaoLOG");
btnLOG.addEventListener("click", downloadArray);

async function EnviarLinhaTesteAutomatico(dado) {
    dataToSend = SH[dado] + "\r";
    console.log(SH[dado]);
    TerminalAutomatico(">" + nomes_SH[dado]);
    await writer.write(dataToSend);
    value = dado;
  }

  let resultadoSerial = document.getElementById("esquerdo-quadro-2");

function TerminalAutomatico (dados) {
   if (dados == "OK") {
     log.push(dados);
     resultadoSerial.innerHTML += "Funcionando" + "\n" + "\n"; 

   } else if (dados == "ERRO" || dados == "+ERROR") {
     log.push(dados);
     resultadoSerial.innerHTML += "ERRO" + "\n" + "\n";
   } else {
     log.push(dados);
     resultadoSerial.innerHTML += dados + "\n";

   }
   
   if (value != 8 && value != 17 && (dados == "OK" || dados == "ERRO" || dados == "+ERROR")) {
     value++;
     EnviarLinhaTesteAutomatico(value);
   } else if ( (value == 8 || value == 17) && (dados == "OK" || dados == "ERRO" || dados == "+ERROR")) {
     testesautomaticos == false;
     console.log(log);
   }
}



function downloadArray() {

  // transforma array com os dados em string 
  const text = log.join("\n");

  // Cria um objeto blob com o texto
  const blob = new Blob([text], {type: "text/plain"});
  
  //objeto URL
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'LOG.txt';

  //clicar no link
  link.click();

}

