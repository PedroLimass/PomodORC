const User = require('../models/user');
// const router = express.Router();

import { Request, Response, NextFunction } from 'express';



module.exports = {
    async createUser(req: Request, res: Response) {
        try {
            const checkUser = await User.findOne({ "email": req.body.email })
            if (checkUser) {
                return res.status(400).send({ error: "email ja cadastrado" })
            }

            const newUser = {
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password
            }

            const user = await User.create(newUser);

            return res.send({ user });

        } catch (err) {
            // console.log(err.message);
            return res.status(400).send({ error: err.message })
        }



    },

    async getUserByEmail(req: Request, res: Response) {
        try {
            // console.log({email:req.params.email})
            const user = await User.findOne({ "email": req.params.email });
            if (!user) {
                return res.status(400).send({ error: "Email não cadastrado" });
            }
            // console.log(getUserEmail)
            return res.status(200).send({ user });
        } catch (err) {
            return res.status(400).send({ error: err.message });

        }

    }





}

