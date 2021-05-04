const TaskList = require('../models/taskList.js');

import { Request, Response } from 'express';


interface Task {
    content: string,
    status: boolean
}
module.exports = {
    async createTaskList(req: Request, res: Response) {
        try {

            const checkTaskList = await TaskList.findOne({ title: req.body.title });
            if (checkTaskList) {
                // console.log({titulo:checkTaskList.title});
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
    },

    async addTask(req: Request, res: Response) {
        try {
            const taskList = await TaskList.findOne({ title: req.body.title });
            if (!taskList) {
                res.status(400).send({ erro: "Lista de tarefas inexistente" });
            }

            const tasks = [...taskList.tasks, { content: req.body.content, status: false }];

            const updatedTaskList = await taskList.update({ tasks: tasks });

            return res.status(200).send(updatedTaskList);



        } catch (err) {
            res.status(400).send({ erro: err.message });
        }



    }
}