const TaskList = require('../models/taskList.js');
const User = require('../models/user.js')

import { Request, Response } from 'express';


interface Task {
    content: string,
    status: boolean
}
module.exports = {
    async createTaskList(req: Request, res: Response) {
        try {

            const checkTaskList = await TaskList.findOne({
                title: req.body.title,
                user: req.body.user
            });
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

    },
    async getByUser(req: Request, res: Response) {

        try {
            const GetUser = await User.findOne({ email: req.params.email });
            if (!GetUser) {
                res.status(400).send({ erro: 'Usuário não existente' })
            }
            const tasklists = await TaskList.find({ user: GetUser.email });
            // console.log({ tasklists });
            return res.status(200).send({tasklists});


        } catch (err) {
            res.status(400).send({ erroGetUser: err.message });

        }
    }
}