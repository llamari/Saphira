import e from "express";
import { postAdocoes } from "../controllers/adocoesControllers.js";

const adocoes = e.Router();

adocoes.post('/adocoes', postAdocoes);

export default adocoes;