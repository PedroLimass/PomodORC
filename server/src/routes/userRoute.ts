import { Router } from 'express';
const userController = require('../controllers/userController');

const router = Router();

// Rotas de usuario
router.post('/', userController.createUser);
router.get('/:email', userController.getUserByEmail);
//Rota para verificar/adicionar o usuario padrão


module.exports = router;
