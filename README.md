 💬 RealTime Chat Application

A realtime, multiuser chat application built using HTML, CSS, and JavaScript, with WebSocket communication powered by Socket.IO. Users can join or create chat rooms, send messages instantly, and see who sent each message along with timestamps.

 🎯 Objective

The goal of this assignment was to design and build a webbased chat platform that allows users to:

 Join chat rooms  
 Exchange messages in realtime  
 Choose a username before joining  
 Prevent impersonation and duplicate usernames  
 Send text messages with sender name and timestamp  
 Support basic text formatting (e.g., bold, italics)  
 Create new chat rooms and join existing ones  
 Display online users and room list  
 Ensure smooth user experience and responsive design  

This project fully meets all the specified requirements.
 ✅ Features Implemented

 Feature  Description 

 🧑‍🤝‍🧑 MultiUser Chat  Users can join or create chat rooms and exchange messages 
 🛡️ Username Authentication  Each user must choose a unique username before entering chat 
 🗣️ Send/Receive Messages  Messages appear instantly across all clients in the same room 
 📬 Message Timestamps  Every message includes the time it was sent 
 🔠 Text Formatting  Supports `italic`, `_italic_`, and `bold` 
 🧩 Create New Rooms  Users can create new chat rooms dynamically 
 👁️ Online User List  Displays list of current users in selected room 
 📢 System Notifications  Shows when users join or leave a room 
 🔔 Title Flash Notification  Browser tab title flashes when new message arrives and tab is inactive 
 📱 Responsive Design  Works on desktop, tablet, and mobile 
 🧪 Input Validation  Prevents sending empty messages 

 🧰 Technologies Used

 Technology  Purpose 

 HTML5  Structure and layout of login/chat UI 
 CSS3  Styling with animations, transitions, flexbox, grid 
 JavaScript  Clientside logic and DOM manipulation 
 Socket.IO  Realtime messaging via WebSockets 
 Node.js + Express  Backend server to serve static files and manage WebSocket connections 

⚠️ Note: While the backend uses Node.js and Express, the frontend is built entirely with vanilla HTML, CSS, and JavaScript, as required.

 🚀 How to Run the Application

 1. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/)  installed, then run:

npm install express socket.io

2. Start the Server
Run the backend server:
node server.js
3. Open in Your Browser
Go to:
http://localhost:3000
You can open multiple tabs/windows to simulate different users chatting in realtime.
📁 Folder Structure
chatapp/
│
├── index.html         ← Login screen (choose username and room)
├── chat.html          ← Main chat interface
├── style.css          ← Modern, animated, and responsive styling
├── client.js          ← Clientside logic using Socket.IO
├── server.js          ← Node.js + Express + Socket.IO backend
└── README.md          ← You are here!
🧾 Requirements Met
Intuitive and visually appealing UI ✅
Uses modern design with glassmorphism, shadows, and transitions
Chat room interface ✅
Includes room list, message area, input field
Responsive design✅
Works perfectly on mobile, tablet, and desktop
Realtime communication✅
Powered by WebSocket using Socket.IO
Join specific chat room✅
Users can select or create a room
Messages appear in realtime✅
DOM updated dynamically via events
Username selection✅
Enforced before entering chat
No impersonation/same username✅
Basic enforcement on frontend
Send text messages✅
Input box allows sending messages
Show sender & timestamp✅
Each message displays username and local time
Basic text formatting  ✅
Supportsitalic,_italic_,bold
Create/join chat rooms✅
Room management included
Online users list✅
Shows who's currently in the room
Smooth scrolling & notifications✅
Autoscrolls on new message; browser tab flashes on new message
Input validation✅
Prevents empty messages
Local storage / persistence
⚠️ Optional
Not implemented (can be added later)
Security considerations✅
Sanitizes output to prevent XSS
Edge cases handled✅
Handles disconnects, empty messages, room switching


