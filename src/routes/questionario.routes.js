import express from "express";
import verificadorCamposForm from "../middlewares/verificaCamposForm.js";
import { postQuestionario } from "../controllers/questionario.controller.js";
import { authenticate } from "../middlewares/authentication.js";

const questionario = express.Router()

questionario.use(authenticate);
questionario.post('/', verificadorCamposForm, postQuestionario);

export default questionario;