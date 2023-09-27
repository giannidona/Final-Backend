import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";

import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";

const app = express();
const httpServer = app.listen(8080, () => console.log("live on 8080"));
const socketServer = new Server(httpServer);

mongoose.connect(
  "mongodb+srv://giannidona:CDGMumNfWtUrJTPW@cluster0.zs6fmab.mongodb.net/?retryWrites=true&w=majority"
);

app.use("/static", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", viewsRouter);
