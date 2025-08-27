import { postQuestionario } from "../controllers/qustionarioController";
import express from "express";
import verificadorCamposForm from "../middlewares/verificaCamposForm";

const questionario = express.Router()

questionario.post('/questionario', verificadorCamposForm, postQuestionario);

export default questionario;