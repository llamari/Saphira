import express from 'express';
import { GetAnimals, GetAnimalsId } from '../controllers/animalsControllers';

const router = express.Router();

router.get('/getAnimais', GetAnimals);
router.get('/getAnimais/:id', GetAnimalsId);