import e from "express";
import {GetAnimals, GetAnimalsId, postAnimal } from "../controllers/animais.controller.js";
import { authenticate, authenticate_admin } from "../middlewares/authentication.js";
const animais = e.Router();

animais.post('/', authenticate, e.json({ limit: '50mb' }), postAnimal);
animais.get('/', authenticate, GetAnimals);
animais.get('/:id', authenticate_admin, GetAnimalsId);

export default animais;