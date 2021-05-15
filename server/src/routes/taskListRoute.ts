import { Router } from 'express';
const taskListController = require('../controllers/taskListController');

const router = Router();

//Rotas taskList
router.post('/', taskListController.createTaskList);
router.get('/:email', taskListController.getByUser);
router.put('/task', taskListController.addTask);
router.put('/task/:id', taskListController.updateTask);

module.exports = router;