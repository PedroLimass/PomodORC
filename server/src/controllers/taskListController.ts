const TaskList = require('../models/taskList.ts');
const User = require('../models/user.ts')

import { Request, Response } from 'express';


interface Task {
    content: string,
    status: boolean
}
module.exports = {
    async createTaskList(req: Request, res: Response) {
        const { title, user } = req.body
        try {

            const checkTaskList = await TaskList.findOne({
                title,
                user
            });
            if (checkTaskList) {
                return res.status(400).send({ error: "Titulo ja existente" });
            }

            const taskList = await TaskList.create({
                "title": title,
                "user": user,
                "tasks": <Task[]>([]),
            });

            return res.status(200).send(taskList);

        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    },

    async addTask(req: Request, res: Response) {
        const { title, user, content } = req.body
        try {
            const taskList = await TaskList.findOne(
                {
                    title,
                    user
                });

            if (!taskList) {
                res.status(400).send({ erro: "Lista de tarefas inexistente" });
            }

            const tasks = [...taskList.tasks, { content: content, status: false }];

            const updatedTaskList = await taskList.updateOne({ tasks: tasks });

            return res.status(200).send({ updatedTaskList });



        } catch (err) {
            res.status(400).send({ erro: err.message });
        }

    },

    async getByUser(req: Request, res: Response) {
        const { email } = req.params
        try {
            const GetUser = await User.findOne({ email: email });
            if (!GetUser) {
                res.status(400).send({ erro: 'Usuário não existente' })
            }
            const tasklists = await TaskList.find({ user: GetUser.email });

            return res.status(200).send({ taskList: tasklists });


        } catch (err) {
            res.status(400).send({ error: err.message });

        }

    },
    async updateTask(req: Request, res: Response) {

        const { id } = req.params
        const { index, content } = req.body

        try {
            const taskList = await TaskList.findOne({_id:id});
            if(!taskList){
                return res.status(404).send({error:'Tasklist não encontrada'})
            }
            let tasks = taskList.tasks;
            tasks[index].content = content;
            const result = await taskList.updateOne({tasks:tasks});
             
            return res.status(200).send(result);

        } catch (err) {
            return res.status(400).send({error: err.message});

        }
    }
}