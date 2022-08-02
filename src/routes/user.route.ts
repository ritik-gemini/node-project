import express from 'express';
import { createUser, deleteUser, getUser, updateUser, getAllUsers, sendMail } from './user.controller';

const router = express.Router();

//CREATE
router.post('/user', createUser);

//GET USER
router.get('/user/:id', getUser);

//DELETE USER
router.delete('/user/:id', deleteUser);

//UPDATE USER
router.put('/user/:id', updateUser);

//Send mail
router.post('/sendmail', sendMail);

//GET ALL USERS
router.get('/users/all', getAllUsers);

export default router;