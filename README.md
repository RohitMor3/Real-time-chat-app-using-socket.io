# Real-Time Chat App using Socket.IO
Basic MERN project to learn socket.io integration 

An extremely simple real-time chat application built using **React**, **Vite**, **Node.js**, **Express**, and **Socket.IO**.  
Basically users can enter a username, join the chat, and send messages that appear instantly in real time. altho more features are going to be added but for now I am just learning integartion of websockets


---

## Tech Stack

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## Features

- Real-time messaging using Socket.IO
- Username setup before entering chat
- Messages displayed with username
- React frontend with Vite
- Express backend server
- Socket.IO client-server communication
- CORS enabled for frontend-backend connection
- Simple responsive UI using Tailwind CSS

---

## Project Structure

```bash
Real-time-chat-App/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-link>
```

```bash
cd Real-time-chat-App
```

---

## Backend Setup

### 1. Go to the backend folder

```bash
cd backend
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Start the backend server

```bash
npm run dev
```

Or, if you are not using nodemon:

```bash
node server.js
```

The backend server will run on:

```bash
http://localhost:3000
```

---

## Frontend Setup

Open a new terminal.

### 1. Go to the frontend folder

```bash
cd frontend
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the frontend development server

```bash
npm run dev
```

The frontend will run on:

```bash
http://localhost:5173
```

---

## Usage

1. Start the backend server.
2. Start the frontend server.
3. Open the frontend URL in your browser.
4. Enter your username.
5. Click on **Start Chatting**.
6. Type a message and click **Send**.
7. The message will appear instantly in the chat window.

---

## Socket.IO Events Used

### Client to Server

#### `setUsername`

Used to send the username from frontend to backend.

```js
socket.emit("setUsername", username);
```

#### `sendMessage`

Used to send a chat message from frontend to backend.

```js
socket.emit("sendMessage", message);
```

---

### Server to Client

#### `receiveMessage`

Used to receive messages from the backend and display them on the frontend.

```js
socket.on("receiveMessage", (data) => {
  setMessages((prevMessages) => [...prevMessages, data]);
});
```

---

## Backend Socket.IO Logic

```js
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("setUsername", (username) => {
    socket.username = username;
  });

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", {
      username: socket.username,
      message: message,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
```

---

## Frontend Socket.IO Logic

```js
const socket = io("http://localhost:3000");

useEffect(() => {
  socket.on("receiveMessage", (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  });

  return () => {
    socket.off("receiveMessage");
  };
}, []);
```

---

## Important Notes

Make sure both the frontend and backend servers are running at the same time.

Backend:

```bash
http://localhost:3000
```

Frontend:

```bash
http://localhost:5173
```

Also make sure the event names are spelled exactly the same on frontend and backend.

Correct:

```js
receiveMessage
```

Incorrect:

```js
recieveMessage
```

A spelling mismatch will stop messages from appearing in the UI.

---

## Future Improvements

- Add MongoDB for storing chat messages
- Add user authentication
- Add private messaging
- Add chat rooms
- Show online users
- Add typing indicator
- Add timestamps for messages
- Improve UI design
- Add profile pictures

---

## Author

Created by **Rohit More**

---

## License

This project is open-source and free to use.
