import { Router } from 'express';
const userController = require('../controllers/userController');

const router = Router();

// Rotas de usuario
router.post('/', userController.createUser);
router.get('/:email', userController.getUserByEmail);



module.exports = router;
