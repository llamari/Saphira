import express from "express";
import { donation } from "../controllers/doacoes.controller.js";
import { authenticate } from "../middlewares/authentication.js";

const doacoes = express.Router()

doacoes.use(authenticate);
doacoes.post('/', donation);

export default doacoes;