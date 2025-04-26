"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const router_1 = require("../router");
const app = (0, express_1.default)();
exports.app = app;
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "../../views"));
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../public/images")));
app.use(express_1.default.json());
app.use(express_1.default.static("/public"));
app.use("/admin", router_1.router);
app.get("/", (req, res) => {
    res.send({ message: "api is ok" });
});
//# sourceMappingURL=express.js.map