import { Manager, Socket } from 'socket.io-client'

let socket: Socket

export const connectToServer = (jwtToken: string) => {

    const manager = new Manager('localhost:3557/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            authentication: jwtToken
        }
    });
    socket?.removeAllListeners();
    socket = manager.socket('/');
    
    
    addListener();

    // localhost:3557/socket.io/socket.io.js
}

export const addListener = () => {

    const serverStatusLabel = document.querySelector('#serverStatus')!;
    const clientsConnectedList = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#messageForm')!;
    const messageInput = document.querySelector<HTMLInputElement>('#messageInput')!;
    const messagesList = document.querySelector<HTMLUListElement>('#messages-ul')!;
  
    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Connected';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Disconnected';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `
                <li>${clientId}</li>
            `
        });

        clientsConnectedList.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (messageInput.value.trim().length <= 0) return;

        socket.emit('message-from-client', { 
            id: "YO",
            message: messageInput.value 
        });
        messageInput.value = '';
        
    });

    socket.on('messages-from-server', (payload: { fullName: string, message: string}) => {
        console.log("payload from server", payload);
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
            `
        
            const li = document.createElement('li');
            li.innerHTML = newMessage;
            messagesList.append(li);
    });
  
  }