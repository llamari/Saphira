import express from "express";
import { donation } from "../controllers/doacoes.controller.js";

const doacoes = express.Router()

doacoes.post('/doacoes', donation);

export default doacoes;