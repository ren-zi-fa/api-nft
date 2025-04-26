import express, { NextFunction, Request, Response } from "express";
import { upload } from "../middlewares/upload.middleware";

const router = express.Router();

const contohMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.params.nama === "renzi") {
    res.status(404).send({ message: "invalid name" });
  }
  next();
};
router.use(contohMiddleware);

router.route("/").get((req, res) => {
  res.send("test");
});

router.get("/panggil/:nama", contohMiddleware, (req, res) => {
  const data = req.params.nama;
  res.send(data);
});

router.post("/create", (req, res) => {
  const { nama, umur } = req.body;
  res.status(200).send({
    message: {
      status: "ok",
      data: { nama, umur },
    },
  });
});

router.post("/create-person", upload.single("photo"), (req, res) => {
  const { nama, umur, alamat } = req.body;
  const fotoPath = req.file ? `/images/${req.file.filename}` : null;

  res.send({
    message: "Data received",
    data: { nama, umur, alamat, foto: fotoPath },
  });
});

router.get("/form", (req, res) => {
  res.render("form");
});
router.route("/test").get((req, res, nex) => {
  console.log("hallo");
  res.send({ hallo: "renzi" });
  nex();
});

export { router };
