import e from "express";
import { postAnimal } from "../controllers/animaisControllers.js";

const animais = e.Router();

animais.post('/animais', postAnimal);

export default animais;