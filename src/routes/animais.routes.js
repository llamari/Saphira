import e from "express";
import { postAnimal } from "../controllers/animaisControllers.js";

const animais = e.Router();

animais.post('/animais', e.json({ limit: '50mb' }), postAnimal);

export default animais;