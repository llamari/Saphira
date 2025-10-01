import e from "express";
import {GetAnimals, GetAnimalsId, postAnimal } from "../controllers/animais.controller.js";
import { authenticate, authenticate_admin } from "../middlewares/authentication.js";
const animais = e.Router();

animais.use(authenticate)
animais.post('/', e.json({ limit: '50mb' }), postAnimal);
animais.get('/', GetAnimals);

export default animais;