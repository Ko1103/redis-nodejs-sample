wsButton.onclick = function () {
    wsSendButton.disabled = false;

    ws = new WebSocket(`ws://${location.host}`);
    ws.onopen = function () {
        showMessage('WebSocket connection established');
    };
    ws.onmessage = function (message) {
        let data = JSON.parse(message.data)
        showMessage(JSON.stringify(data.message));
    };
     -- 省略 --
};
