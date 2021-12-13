
require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const socket = require("socket.io");
const { createServer } = require("http");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMidleware = require("./middlewares/error-middleware");

const router = require("./routes/index");
const { default: axios } = require("axios");

const PORT = process.env.PORT || 3001;

const app = express();

const server = createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api", router);

app.use(errorMidleware);

io.on("connection", (socket) => {
  console.log("Socket connect - ", socket.id, " user");
  socket.on("CLIENT@ROOM:JOIN", async ({ roomId, userId }) => {
    let token = socket.handshake.query.token;
    axios
      .post(
        "http://localhost:3001/api/getChat",
        { roomId, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(function (response) {
        const chat = response.data;
        io.emit("SERVER@ROOM:JOIN", { chat });
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  socket.on("CLIENT@ROOM:NEW_MESSAGE", ({ roomId, message }) => {
    let token = socket.handshake.query.token;
    axios
      .post(
        "http://localhost:3001/api/sendMessage",
        { roomId, message },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(function (response) {
        const chat = response.data;
        io.emit("SERVER@ROOM:NEW_MESSAGE", { chat });
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    server.listen(PORT, () => {
      console.log(`Сервер запущен на ${PORT} порте `);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
