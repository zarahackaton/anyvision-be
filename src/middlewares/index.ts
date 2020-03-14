import {NextFunction, Response} from "express";
import jwt from 'jsonwebtoken';

/* Checks the token sent within headers to verify the user credentials */
export function authenticateToken(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === "null") {
        return res.status(401).send({message: 'Please login first'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(403).send({message: 'Action is forbidden for this user'});
        }
        req.user = user;
        next();
    })
}