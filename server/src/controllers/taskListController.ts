const TaskList = require('../models/taskList.js');
const User = require('../models/user.js')

import { Request, Response } from 'express';
import { title } from 'process';


interface Task {
    content: string,
    status: boolean
}
module.exports = {
    async createTaskList(req: Request, res: Response) {
        const { title, user } = req.body;
        try {

            const checkTaskList = await TaskList.findOne({
                title,
                user
            });

            if(checkTaskList) {
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
    async readTaskList(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const taskList = await TaskList.findOne({ _id: id })
            if (!taskList) {
                return res.status(404).send({ error: "Tasklist not found" });
            }
            return res.status(200).send(taskList)
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }

    },

    async addTask(req: Request, res: Response) {
        const { title, user, content } = req.body;
        try {
            const taskList = await TaskList.findOne(
                {
                    title,
                    user
                });

            if (!taskList) {
                res.status(400).send({ erro: "Lista de tarefas inexistente" });
            }

            const tasks = [...taskList.tasks, { content: content, status: false, time: 0 }];

            const updatedTaskList = await taskList.updateOne({ tasks: tasks });

        return res.status(200).send({ updatedTaskList });
        } catch (err) {
            res.status(400).send({ erro: err.message });
        }

    },

    async getByUser(req: Request, res: Response) {

        const { email } = req.params;
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                res.status(400).send({ erro: 'Usuário não existente' })
            }
            const tasklists = await TaskList.find({ user: user.email });

            return res.status(200).send({ taskList: tasklists });

        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    },
    async updateTask(req: Request, res: Response) {

        const { id } = req.params;
        const { index, content } = req.body;

        try {
            const taskList = await TaskList.findOne({ _id: id });
            if (!taskList) {
                return res.status(404).send({ error: 'Tasklist não encontrada' })
            }
            let tasks = taskList.tasks;
            tasks[index].content = content;
            const result = await taskList.updateOne({ tasks: tasks });

            return res.status(200).send(result);

        } catch (err) {
            return res.status(400).send({ error: err.message });

        }
    },
    async updateStatus(req: Request, res: Response) {

        const { id } = req.params;
        const { index } = req.body;

        try {
            const taskList = await TaskList.findOne({ _id: id });
            if (!taskList) {
                return res.status(404).send({ error: 'Tasklist não encontrada' })
            }
            let tasks = taskList.tasks;
            tasks[index].status = !tasks[index].status;
            const result = await taskList.updateOne({ tasks: tasks });

            return res.status(200).send(result);


        } catch (err) {

            return res.status(400).send({ error: err.message });

        }

    },

    async deleteTask(req: Request, res: Response) {

        const { id } = req.params;
        const { index } = req.body;

        try {
            const taskList = await TaskList.findOne({ _id: id });
            if (!taskList) {
                return res.status(404).send({ error: 'Tasklist não encontrada' })
            }
            let tasks = taskList.tasks;
            tasks.splice(index, 1);
            const result = await taskList.updateOne({ tasks: tasks });

            return res.status(200).send(result);


        } catch (err) {

            return res.status(400).send({ error: err.message });

        }
    },

    async editTaskListTitle(req: Request, res: Response) {
        const { id } = req.params;
        const { title } = req.body;
        try {
            const taskList = await TaskList.findOne({ _id: id });
            if (!taskList) {
                return res.status(404).send({ error: 'TaskList not found' });
            }
            const response = await taskList.updateOne({ title });

            return res.status(200).send({ response });
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }

    },
    async addTaskTime(req: Request, res: Response) {
        const { id } = req.params;
        const { index, time } = req.body;
        try {
            const taskList = await TaskList.findOne({ _id: id });

            if (!taskList) {
                return res.status(404).send({ error: 'TaskList not found' });
            }

            let tasks = taskList.tasks;
            tasks[index].time += time;

            const response = await taskList.updateOne({ tasks: tasks });

            return res.status(200).send({ response });

        } catch (err) {
            return res.status(400).send({ error: err.message });
        }

    },
    async deleteTaskList(req: Request, res: Response){
        const { id } = req.params;
        try {
          const taskList = await TaskList.deleteOne({_id: id});
          if(!taskList){
              return res.status(400).send({error:'Tasklist not found' });
          }
          return res.status(200).send({taskList});
        }catch(error) {
            return res.status(400).send({error: error.massage});
        }
    }

}