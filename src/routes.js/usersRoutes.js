import express from 'express';
import { GetUsers, GetUsersId, PatchUsersId, PostUsers } from '../controllers/userControllers';

const router = express.Router();

router.get('/tutores', GetUsers);
router.get('/tutores/:id', GetUsersId);
router.post('/tutores', PostUsers);
router.patch('/tutores/:id', PatchUsersId);