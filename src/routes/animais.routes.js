import e from "express";
import { postAnimal } from "../controllers/animaisControllers.js";

const animais = e.Router();

animais.post('/animais', e.json({ limit: '50mb' }), postAnimal);

// Animal dashboard routes
animais.get('/admin/animais/', listAnimals);
animais.patch('/admin/animais/:id', updateAnimal);
animais.delete('/admin/animais/:id', deleteAnimal);

export default animais;