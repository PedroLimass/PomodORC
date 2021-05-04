import { Router } from 'express';
const userController = require('../controllers/userController');
const taskListController = require('../controllers/taskListController');


const router = Router();

// Rotas de usuario
router.post('/user', userController.createUser);

//Rotas taskList
router.post('/taskList', taskListController.createTaskList);
router.put('/task', taskListController.addTask);



export default router;