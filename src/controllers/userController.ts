import {Request, Response} from "express";
import {UserModel} from '../models/userModel';
import jwt from 'jsonwebtoken';

class UserController {
    /* Checks whether the movement is valid or not */
    async login(req: Request, res: Response) {
        const {username, password} = req.body;
        try {
            const user = await UserModel.findOne({username: username, password: password});
            if (user) {
                const userId = {_id: user._id};
                const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
                res.status(200).send({accessToken: accessToken, username:username, message: 'Login successfully'});
            }
            else {
                res.status(401).send({message: 'Username or password is invalid'});
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async register(req: any, res: Response) {
        const {username, password, email} = req.body;
        try {
            const user = new UserModel({username: username, password: password, email: email});
            await user.save();
            res.status(200).send({message: `User '${username}' registered successfully`});
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).send({message: `User '${username}' is already exists`});
            }
            else {
                res.status(500).send(error.message);
            }
        }
    }
}

export default UserController;