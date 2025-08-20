import { postQuestionario } from "../controllers/qustionarioController";
import express from "express";

const questionario = express.Router()

questionario.post('/questionario', postQuestionario);

export default questionario;