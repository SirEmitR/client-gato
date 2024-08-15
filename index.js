import net from 'net';

function callRpcPeer(host, port, method, params, callback) {
    const client = new net.Socket();
    client.connect(port, host, () => {
        client.write(JSON.stringify({ method, params }));
    });

    client.on('data', (data) => {
        const response = JSON.parse(data);
        callback(response.result);
        client.destroy();
    });
}

const peerHost = '127.0.0.1';
const peerPort = 8000;

callRpcPeer(peerHost, peerPort, 'makeMove', [4], (result) => {
    console.log('Nuevo estado del juego:', result);
});
