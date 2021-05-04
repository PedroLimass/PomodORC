const express = require('express');
const User = require('../models/user');
// const router = express.Router();

import { Request, Response, NextFunction } from 'express';



module.exports = {
    async createUser(req: Request, res: Response) {
        try {
            const checkUser = await User.findOne({"email": req.body.email})
            if(checkUser){
                return res.status(400).send({ error:"email ja cadastrado" })
            }

            const newUser = {
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password
            }

            const user = await User.create(newUser);

            return res.send({ user });

        } catch (err) {
            console.log(err.message);
            return res.status(400).send({ error: err.message })
        }



    }
}

// async function createUser(req: Request, res: Response) {
//     try {

//         const user = await User.create(req.body);

//         return res.send({ user });

//     } catch (err) {
//         return res.status(400).send({ error: 'Registration failed' })
//     }



// }

