import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";
import { Server } from "socket.io";
import init from "./socket/server.js";

import jwtRouter from "./routes/jwtRouter.js";
import homeRouter from "./routes/homeRouter.js";
import productsRouter from "./routes/productsRouter.js";
import chatRouter from "./routes/chatRouter.js";
import cartRouter from "./routes/cartRouter.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();
const httpServer = app.listen(PORT || 2020, () =>
  console.log(`http://localhost:${PORT}/login`)
);
const socketServer = new Server(httpServer);
init(socketServer);

mongoose.connect(MONGODB_URL);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGODB_URL,
      ttl: 100,
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

app.use("/static", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(jwtRouter);
app.use(homeRouter);
app.use(productsRouter);
app.use(chatRouter);
app.use(cartRouter);
