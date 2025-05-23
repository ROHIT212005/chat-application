// script.js

let currentUser = null;
let currentRoom = 'General';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();

auth.onAuthStateChanged((user) => {
  if (user) {
    const userRef = database.ref('users/' + user.uid);
    userRef.once('value').then((snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.username) {
        currentUser = { id: user.uid, name: userData.username };
        startChat();
      } else {
        showUsernameForm();
      }
    });
  } else {
    firebase.auth().signInAnonymously()
      .catch((error) => console.error("Anonymous sign-in failed:", error));
  }
});

function showUsernameForm() {
  document.getElementById('loginScreen').innerHTML = `
    <h2>Welcome to Chat App</h2>
    <input type="text" id="usernameInput" placeholder="Choose a username" />
    <button onclick="saveUsername()">Join Chat</button>
  `;
}

function saveUsername() {
  const username = document.getElementById('usernameInput').value.trim();
  if (!username) return;

  const user = firebase.auth().currentUser;
  if (!user) return;

  const userRef = database.ref('users/' + user.uid);
  userRef.set({ username });

  currentUser = { id: user.uid, name: username };

  startChat();
}

function startChat() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('chatScreen').classList.remove('hidden');
  loadMessages(currentRoom);
}
function createRoom() {
  const newRoom = document.getElementById('newRoom').value.trim();
  if (!newRoom) return;

  const roomList = document.getElementById('roomList');
  const li = document.createElement('li');
  li.textContent = newRoom;
  li.onclick = () => joinRoom(newRoom);
  roomList.appendChild(li);
}

function joinRoom(room) {
  currentRoom = room;
  document.getElementById('messages').innerHTML = '';
  loadMessages(room);
}

function sendMessage() {
  const message = document.getElementById('messageInput').value.trim();
  if (!message || !currentUser) return;

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const roomRef = database.ref('rooms/' + currentRoom);
  roomRef.push({
    userId: currentUser.id,
    userName: currentUser.name,
    message,
    time: timestamp
  });

  document.getElementById('messageInput').value = '';
}

function loadMessages(room) {
  const messagesRef = database.ref('rooms/' + room);
  messagesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    const container = document.getElementById('messages');
    container.innerHTML = '';

    if (data) {
      Object.keys(data).forEach((key) => {
        const msg = data[key];
        const wrapper = document.createElement('div');
        wrapper.className = msg.userId === currentUser?.id ? 'message sent' : 'message received';
        wrapper.innerHTML = `
          <strong>${msg.userName}</strong><br/>
          ${formatMessage(msg.message)}<br/>
          <small>${msg.time}</small>
        `;
        container.appendChild(wrapper);
      });
    }

    container.scrollTop = container.scrollHeight;
  });
}

function formatMessage(text) {
  return text
    .replace(/\*(.+?)\*/g, '<i>$1</i>')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
}

document.addEventListener('DOMContentLoaded', () => {
  const picker = new EmojiButton();
  const emojiButton = document.getElementById('emojiButton');

  picker.on('emoji', (emoji) => {
    const input = document.getElementById('messageInput');
    input.value += emoji;
  });

  emojiButton.addEventListener('click', () => picker.togglePicker(emojiButton));
});