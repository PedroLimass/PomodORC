const User = require('../models/user');
// const router = express.Router();

import { Request, Response, NextFunction } from 'express';



module.exports = {
    async createUser(req: Request, res: Response) {
        const {email, name, password} = req.body
        try {
            const checkUser = await User.findOne({ "email": email })
            if (checkUser) {
                return res.status(400).send({ error: "email ja cadastrado" })
            }



            const user = await User.create(
                {
                    "name": name,
                    "email": email,
                    "password": password
                });

            return res.send({ user });

        } catch (err) {
            return res.status(400).send({ error: err.message })
        }



    },

    async getUserByEmail(req: Request, res: Response) {
        const {email} = req.params
        try {
            const user = await User.findOne({ "email": email });
            if (!user) {
                return res.status(400).send({ error: "Email não cadastrado" });
            }
            return res.status(200).send({ user });
        } catch (err) {
            return res.status(400).send({ error: err.message });

        }

    },
    async defaultoUser(req: Request, res: Response) {
        try {
            var user = await User.findOne({ "email": "defaulto@user.com" });
            if (!user) {
                user = await User.create({
                    'name': 'Defaulto',
                    'email': "defaulto@user.com",
                    "password": 'passwordo'
                })
            }
            return res.status(200).send({ user });

        } catch (err) {
            console.error({ error: err.message })
            return res.status(400).send({ error: err.message });


        }
    }





}

