import e from "express";
import { deleteAnimal, listAnimals, postAnimal, updateAnimal } from "../controllers/animaisControllers.js";

const animais = e.Router();

animais.post('/animais', postAnimal);
animais.get('/animais/', listAnimals);
animais.patch('/animais/:id', updateAnimal);
animais.delete('/animais/:id', deleteAnimal);

export default animais;