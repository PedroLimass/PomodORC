import { Router } from 'express';
const taskListController = require('../controllers/taskListController');
const userRoute = require('./userRoute');
const userController = require('../controllers/userController');
const taskListRoute = require('./taskListRoute')


const router = Router();

// Rotas de usuario
router.use('/user', userRoute)
router.post('/defaulto',userController.defaultoUser)


//Rotas taskList
router.use('/taskList', taskListRoute)



export default router;