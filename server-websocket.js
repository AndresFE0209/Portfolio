const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3002 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    // Mensaje inicial de conexión
    ws.send(JSON.stringify({
        type: 'connection',
        payload: {
        mensaje: 'Conexión establecida correctamente'
        }
    }));

    ws.on('message', (data) => {
        try {
            const msg = JSON.parse(data.toString());
            console.log('Mensaje recibido:', msg);

            // Si el mensaje es un feedback, reenviarlo a todos los admin conectados
            if (msg.type === 'feedback') {
                wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                    type: 'feedback-nuevo',
                    payload: msg.payload
                    }));
                }
                });
            }

        } catch (error) {
            console.error('Error parseando mensaje:', error);
            
            ws.send(JSON.stringify({
                type: 'error',
                payload: {
                mensaje: 'Mensaje inválido: no se pudo procesar el JSON',
                timestamp: Date.now()
                }
            }));
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server en ws://localhost:3002');