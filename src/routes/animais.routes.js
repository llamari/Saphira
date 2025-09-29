import e from "express";
import { deleteAnimal, GetAnimals, GetAnimalsId, listAnimals, postAnimal, updateAnimal } from "../controllers/animais.controller";

const animais = e.Router();

animais.get('/animais/', listAnimals);
animais.patch('/animais/:id', updateAnimal);
animais.delete('/animais/:id', deleteAnimal);
animais.post('/animais', e.json({ limit: '50mb' }), postAnimal);
animais.get('/getAnimais', GetAnimals);
animais.get('/getAnimais/:id', GetAnimalsId);

export default animais;