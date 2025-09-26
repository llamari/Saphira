import express from 'express';
import { GetUsers, GetUsersId, login, PatchUsersId, PostUsers } from '../controllers/users.controller.js';

const users = express.Router();

users.get('/tutores', GetUsers);
users.get('/tutores/:id', GetUsersId);
users.post('/tutores', PostUsers);
users.patch('/tutores/:id', PatchUsersId);
users.post('/auth', login);

export default users;
