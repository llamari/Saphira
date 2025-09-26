import express from 'express';
import { GetAnimals, GetAnimalsId } from '../controllers/animalsControllers.js';

const animals = express.Router();

animals.get('/getAnimais', GetAnimals);
animals.get('/getAnimais/:id', GetAnimalsId);

export default animals;