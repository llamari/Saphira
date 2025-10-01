import e from "express";
import { postAdocoes } from "../controllers/adocoes.controller.js";
import { authenticate } from "../middlewares/authentication.js";

const adocoes = e.Router();

adocoes.use(authenticate);
adocoes.post('/', postAdocoes);

export default adocoes;