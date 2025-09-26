import express from "express";
import verificadorCamposForm from "../middlewares/verificaCamposForm.js";
import { postQuestionario } from "../controllers/questionario.controller.js";

const questionario = express.Router()

questionario.post('/questionario', verificadorCamposForm, postQuestionario);

export default questionario;