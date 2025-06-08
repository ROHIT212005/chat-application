const socket = io();

let currentRoom = '';
let username = '';
let lastMessage = '';
let lastMessageTime = 0;
let originalTitle = document.title;
let messageNotificationInterval;

function joinChat() {
    const input = document.getElementById('username');
    const selectedRoom = document.getElementById('roomSelect').value;

    if (!input.value.trim()) {
        alert("Please enter a username");
        return;
    }

    username = input.value;
    currentRoom = selectedRoom;

    localStorage.setItem('username', username);
    localStorage.setItem('currentRoom', currentRoom);

    window.location.href = 'chat.html';
}

function createRoom() {
    const newRoom = prompt("Enter new room name:");
    if (newRoom && !document.querySelector(`#roomSelect option[value="${newRoom}"]`)) {
        socket.emit('createRoom', newRoom);
    }
}

// Only run on chat.html
if (window.location.pathname.endsWith('chat.html')) {
    username = localStorage.getItem('username');
    currentRoom = localStorage.getItem('currentRoom');

    document.getElementById('chatHeader').innerText = `Chat Room: ${currentRoom}`;
    socket.emit('join', { username, room: currentRoom });

    socket.on('message', msg => {
        const messagesDiv = document.getElementById('messages');
        const msgEl = document.createElement('div');
        let className = 'message';

        if (msg.sender === 'System') className += ' system';
        else if (msg.sender === username) className += ' user';
        else className += ' other';

        // Sanitize both sender and message
        msgEl.innerHTML = `<strong>${sanitizeHTML(msg.sender)}</strong>: ${formatMessage(sanitizeHTML(msg.text))} <span class="time">${msg.time}</span>`;
        msgEl.className = className;

        messagesDiv.appendChild(msgEl);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        // Notification if tab is not active
        if (!document.hasFocus()) {
            startTitleFlash();
        }
    });

    socket.on('updateUsers', users => {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        users.forEach(u => {
            const li = document.createElement('li');
            li.innerText = u.username;
            userList.appendChild(li);
        });
    });

    socket.on('updateRooms', rooms => {
        const roomList = document.getElementById('roomList');
        roomList.innerHTML = '';
        rooms.forEach(r => {
            const li = document.createElement('li');
            li.innerText = r;
            li.onclick = () => {
                if (r !== currentRoom) {
                    localStorage.setItem('currentRoom', r);
                    window.location.reload();
                }
            };
            roomList.appendChild(li);
        });
    });

    document.getElementById('chatForm').addEventListener('submit', e => {
        e.preventDefault();
        const input = document.getElementById('messageInput');
        let message = input.value.trim();

        if (!message) {
            alert("Cannot send an empty message.");
            return;
        }

        // Prevent spamming same message too fast
        if (lastMessage === message && Date.now() - lastMessageTime < 1000) {
            alert("Please don't spam.");
            return;
        }

        socket.emit('sendMessage', { message, username, room: currentRoom });
        input.value = '';
        lastMessage = message;
        lastMessageTime = Date.now();
    });
}

// Format message with basic Markdown support
function formatMessage(text) {
    return text.replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/_(.*?)_/g, '<em>$1</em>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// Prevent XSS by escaping HTML in user input
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Flash browser tab title when new message arrives
function startTitleFlash() {
    if (messageNotificationInterval) return;

    messageNotificationInterval = setInterval(() => {
        document.title = document.title === originalTitle ? "🔔 New Message!" : originalTitle;
    }, 1000);
}

window.onfocus = () => {
    clearInterval(messageNotificationInterval);
    document.title = originalTitle;
};

function createRoomPrompt() {
    const newRoom = prompt("Enter new room name:");
    if (newRoom) socket.emit('createRoom', newRoom);
}