import { Router } from 'express';
const userController = require('../controllers/userController');
const taskListController = require('../controllers/taskListController');


const router = Router();

// Rotas de usuario
router.post('/user', userController.createUser);
router.get('/user/:email', userController.getUserByEmail);
//Rota para verificar/adicionar o usuario padrão
router.post('/defaulto',userController.defaultoUser)



//Rotas taskList
router.post('/taskList', taskListController.createTaskList);
router.put('/task', taskListController.addTask);
router.get('/taskLists/:email', taskListController.getByUser);
router.delete('/tasklist/delete/:id', taskListController.deleteTaskList);

export default router;