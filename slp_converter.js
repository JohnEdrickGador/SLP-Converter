const SLPnumber = document.getElementById("SLPcount");
const button = document.getElementById("convert-button");
const resultScreen = document.getElementById("result");
const dropDown = document.getElementById("currency-name");

//currencies
fetch('https://api.frankfurter.app/currencies').then((data) => data.json())
      .then((data) => {
        display(data);
      });

//add options to dropdown
function display(data){
    const entries = Object.entries(data);
    for (let index = 0; index < entries.length; index++) {
        dropDown.innerHTML += `<option value="${entries[index][0]}">${entries[index][0]}</option>`;
    }
}

//websocket for SLP transaction
let ws = new WebSocket('wss://stream.binance.com:9443/ws/slpusdt@trade');
let slpPrice = 0;
ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    slpPrice = stockObject.p;
}

//converter button
button.addEventListener("click",test = () => {
    let converted = convert('USD',dropDown.value,slpPrice);
});

//usd to c2 converter
function convert(c1,c2,value) {
    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest?amount=${value}&from=${c1}&to=${c2}`)
        .then((val) => val.json())
        .then((val) => {
          console.log(Object.values(val.rates)[0]);
          let final = Object.values(val.rates)[0];
          resultScreen.innerHTML = `${SLPnumber.value} SLP = ${final*SLPnumber.value} ${dropDown.value}`;
        });
    }
