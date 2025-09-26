import e from "express";
import { postAdocoes } from "../controllers/adocoes.controller";

const adocoes = e.Router();

adocoes.post('/adocoes', postAdocoes);

export default adocoes;