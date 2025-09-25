import { postQuestionario } from "../controllers/questionarioController.js";
import express from "express";
import verificadorCamposForm from "../middlewares/verificaCamposForm.js";

const questionario = express.Router()

questionario.post('/questionario', verificadorCamposForm, postQuestionario);

export default questionario;