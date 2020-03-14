import {Application} from 'express';
import UserController from '../controllers/userController';

class UserRoutes {
    public userController: UserController;
    constructor() {
        this.userController = new UserController();
    }

    public routes(app: Application): void {
        app.route('/login')
            .post(this.userController.login);
        app.route('/register')
            .post(this.userController.register);
    }
}

export default UserRoutes;