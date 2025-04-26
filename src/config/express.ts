import path from "path";
import express, { NextFunction, Request, Response } from "express";
import { router } from "../router";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../../views"));
app.use("/images", express.static(path.join(__dirname, "../../public/images")));
app.use(express.json());
app.use(express.static("/public"));

app.use("/admin", router);
app.get("/", (req, res) => {
  res.send({ message: "api is ok" });
});

export { app };
