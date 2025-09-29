import e from "express";
import { postAnimal } from "../controllers/animaisControllers.js";
import { authenticate } from "../middlewares/authentication.js";

const animais = e.Router();

animais.use(authenticate);
animais.post('/', e.json({ limit: '50mb' }), postAnimal);

export default animais;