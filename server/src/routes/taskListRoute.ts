import { Router } from 'express';
const taskListController = require('../controllers/taskListController');

const router = Router();

//Rotas taskList
router.post('/', taskListController.createTaskList);
router.get('read/:id', taskListController.readTaskList);
router.get('/:email', taskListController.getByUser);
router.put('/task', taskListController.addTask);
router.put('/task/:id', taskListController.updateTask);
router.put('/status/:id', taskListController.updateStatus);
router.put('/task/delete/:id', taskListController.deleteTask);

module.exports = router;