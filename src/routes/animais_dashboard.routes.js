import e from "express";
import { deleteAnimal, listAnimals, updateAnimal } from "../controllers/animais.controller.js";
import { authenticate_admin } from "../middlewares/authentication.js"

const animais_admin = e.Router();

// Protected Routes
animais_admin.use(authenticate_admin);
animais_admin.get('/', listAnimals);
animais_admin.patch('/:id', updateAnimal);
animais_admin.delete('/:id', deleteAnimal);

export default animais_admin;