import e from "express";
import {GetAnimals, GetAnimalsId, postAnimal } from "../controllers/animais.controller.js";

const animais = e.Router();

animais.post('/', e.json({ limit: '50mb' }), postAnimal);
animais.get('/', GetAnimals);
animais.get('/:id', GetAnimalsId);

export default animais;