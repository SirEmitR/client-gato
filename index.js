import net from 'net';

function callRpcPeer(host, port, method, params, callback) {
    const client = new net.Socket();
    client.connect(port, host, () => {
        client.write(JSON.stringify({ method, params }));
    });

    client.on('data', (data) => {
        const response = JSON.parse(data);
        callback(response.result);
    });
}

const peerHost = '191.168.1.2';
const peerPort = 41200;

callRpcPeer(peerHost, peerPort, 'makeMove', [4], (result) => {
    console.log('Nuevo estado del juego:', result);
});


process.stdin.on('data', (data) => {
    const move = parseInt(data.toString().trim());
    callRpcPeer(peerHost, peerPort, 'makeMove', [move], (result) => {
        console.log('Nuevo estado del juego:', result);
    });
})