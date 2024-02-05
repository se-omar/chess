# Online Chess
This is a simple chess game implemented using JavaScript, HTML, and CSS for the frontend, and a WebSocket server for the backend. It allows two players to play chess in real-time over the internet. The game follows standard chess rules and supports moves like castling and en passant.
### Features:
* Real-time multiplayer chess game.
* Standard chess rules and moves.
* WebSocket server for real-time communication.

### Prerequisites
Before you begin, ensure you have met the following requirements:
* You have Node.js installed on your machine.
* You have Go installed on your machine.
*  You have a modern web browser that supports WebSocket.

### Getting Started

To get the game up and running, follow these steps:

1.  Clone the repository to your local machine:
``git clone https://github.com/yourusername/chess-game.git``

2. setup and run the server
```
cd server
go run src/main.go
```

3. setup and run the client
```
cd client
npm i && npm run dev
```
