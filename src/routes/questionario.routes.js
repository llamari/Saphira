import { postQuestionario } from "../controllers/qustionarioController.js";
import express from "express";
import verificadorCamposForm from "../middlewares/verificaCamposForm.js";

const questionario = express.Router()

questionario.post('/questionario', verificadorCamposForm, postQuestionario);

export default questionario;