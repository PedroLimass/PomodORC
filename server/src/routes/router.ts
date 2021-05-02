import { Router } from 'express';
const userController= require('../controllers/userController')

const router = Router();

router.post('/user', userController.createUser);


export default router;