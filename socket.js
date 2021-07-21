let ws = new WebSocket('wss://stream.binance.com:9443/ws/slpusdt@trade');
ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    console.log(stockObject.p);
}