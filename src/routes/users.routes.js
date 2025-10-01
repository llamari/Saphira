import express from 'express';
import { GetUsers, GetUsersId, login, PatchUsersId, PostUsers } from '../controllers/users.controller.js';
import { authenticate } from '../middlewares/authentication.js';

// Protected routes
const users_management = express.Router();

users_management.use(authenticate);
users_management.get('/', GetUsers);
users_management.get(':id', GetUsersId);
users_management.post('/', PostUsers);
users_management.patch('/:id', PatchUsersId);

// Users as root
const users = express.Router();
users.post("/autenticacao", login);
users.use("/tutores", users_management) 

export default users;
