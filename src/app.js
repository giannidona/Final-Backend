import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";

import sessionsRouter from "./routes/sessionsRouter.js";
import homeRouter from "./routes/homeRouter.js";
import productManagerRouter from "./routes/productManagerRouter.js";
import cartRouter from "./routes/cartRouter.js";
import ticketRouter from "./routes/ticketRouter.js";
import usersManagerRouter from "./routes/usersManagerRouter.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET;

const app = express();
const httpServer = app.listen(PORT || 2020, () =>
  console.log(`http://localhost:${PORT}/login`)
);

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
    resave: false,
    saveUninitialized: false,
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(sessionsRouter);
app.use(homeRouter);
app.use("/api", productManagerRouter);
app.use(cartRouter);
app.use(ticketRouter);
app.use("/api", usersManagerRouter);
