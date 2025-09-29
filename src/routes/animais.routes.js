import e from "express";
import { deleteAnimal, GetAnimals, GetAnimalsId, listAnimals, postAnimal, updateAnimal } from "../controllers/animais.controller.js";

const animais = e.Router();

animais.get('/admin/animais', listAnimals);
animais.patch('/admin/animais/:id', updateAnimal);
animais.delete('/admin/animais/:id', deleteAnimal);

animais.post('/animais', e.json({ limit: '50mb' }), postAnimal);
animais.get('/getAnimais', GetAnimals);
animais.get('/getAnimais/:id', GetAnimalsId);

export default animais;