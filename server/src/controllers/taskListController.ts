const TaskList = require('../models/taskList.js');
const User = require('../models/user.js')

import { Request, Response } from 'express';


interface Task {
    content: string,
    status: boolean
}

async function createTaskList(req: Request, res: Response) {
    try {

        const checkTaskList = await TaskList.findOne({
            title: req.body.title,
            user: req.body.user
        });
        if (checkTaskList) {
            return res.status(400).send({ error: "Titulo ja existente" });
        }
        const newTaskList = {
            "title": req.body.title,
            "user": req.body.user,
            "tasks": <Task[]>([]),
        }
        const taskList = await TaskList.create(newTaskList);

        return res.status(200).send(taskList);

    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
}

async function addTask(req: Request, res: Response) {
    try {
        const taskList = await TaskList.findOne({ title: req.body.title });
        if (!taskList) {
            res.status(400).send({ erro: "Lista de tarefas inexistente" });
        }

        const tasks = [...taskList.tasks, { content: req.body.content, status: false }];

        const updatedTaskList = await taskList.update({ tasks: tasks });

        return res.status(200).send({ updatedTaskList });



    } catch (err) {
        res.status(400).send({ erro: err.message });
    }

}
async function getByUser(req: Request, res: Response) {

    try {
     /*    const GetUser = await User.findOne({ email: req.params.email });
        if (!GetUser) {
            res.status(400).send({ erro: 'Usuário não existente' })
        } */
        const tasklists = await TaskList.find({ user: req.params.email });

        return res.status(200).send({ tasklists });


    } catch (err) {
        res.status(400).send({ erroGetUser: err.message });

    }
}
async function deleteTaskList(req: Request, res: Response){
    const {id} = req.params
    try {
      const taskList = await TaskList.findByIdAndRemove({_id:id})  
        if(!taskList){
            res.status(400).send({erro: 'Lista não encontrada' });
        }
        res.status(200).send({taskList})
    } catch (error) {
            res.status(400).send({error});    
    }
}

module.exports = {
   createTaskList,
   addTask,
   getByUser,
   deleteTaskList
}