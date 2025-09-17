import express from 'express';
import { GetUsers, GetUsersId, PatchUsersId, PostUsers } from '../controllers/userControllers.js';

const userRoutes = express.Router();

userRoutes.get('/tutores', GetUsers);
userRoutes.get('/tutores/:id', GetUsersId);
userRoutes.post('/tutores', PostUsers);
userRoutes.patch('/tutores/:id', PatchUsersId);

export default userRoutes;
