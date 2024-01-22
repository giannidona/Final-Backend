import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import sessionsRouter from "./routes/sessionsRouter.js";
import homeRouter from "./routes/homeRouter.js";
import profileRouter from "./routes/profileRouter.js";
import productManagerRouter from "./routes/productManagerRouter.js";
import cartRouter from "./routes/cartRouter.js";
import ticketRouter from "./routes/ticketRouter.js";
import usersManagerRouter from "./routes/usersManagerRouter.js";
import chatRouter from "./routes/chatRouter.js";
import recoverPasswordRouter from "./routes/recoverPasswordRouter.js";

import init from "./socket/server.js";
import { logger } from "./utils.js/logger.js";
import { errors } from "./middlewares/errors.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET;
const ENVIROMENT = process.env.ENVIROMENT;

const app = express();
const httpServer = app.listen(PORT || 2020, () =>
  console.log(`http://localhost:${PORT}/login`)
);

const socketServer = new Server(httpServer);
init(socketServer);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",

    info: {
      title: "Documentación E-commerce",
      description: "Documentación",
    },
  },

  apis: [`./src/docs/**/**.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);

mongoose.connect(MONGO_URL);

app.use("/static", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      ttl: 2 * 60,
    }),
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(errors);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(sessionsRouter);
app.use(homeRouter);
app.use(profileRouter);
app.use("/api", productManagerRouter);
app.use(cartRouter);
app.use(ticketRouter);
app.use("/api", usersManagerRouter);
app.use(chatRouter);
app.use(recoverPasswordRouter);
