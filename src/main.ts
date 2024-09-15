import './style.css'
import { connectToServer, } from './socket-client';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client </h2>
    <input id="jwt-token" placeholder="JSON Web Token" />
    <button id="btn-connect">Connect</button>

    <br/>
    <span id="serverStatus">offline</span>

    <ul id="clients-ul"></ul>

    <form submit="" id="messageForm">
      <input placeholder="message" id="messageInput" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// connectToServer();


const inputJwt = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {

  const inputJwtFormatted = inputJwt.value.trim();
  if (inputJwtFormatted.length <= 0) return alert('Enter a valid JWT token');
  connectToServer(inputJwtFormatted);
})