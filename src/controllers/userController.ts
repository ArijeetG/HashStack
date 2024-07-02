import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
    userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const data = await this.userService.addUser(req);
            return res.status(200).send({ data });
        } catch (error: any) {
            return res.status(500).send({
                message: 'something went wrong',
                stack: error.message || '',
            });
        }
    };

    public login = async (req: Request, res: Response) => {
        try {
            const data = await this.userService.login(req);
            return res.status(200).send({ data });
        } catch (error: any) {
            return res.status(500).send({
                message: 'something went wrong',
                stack: error.message || '',
            });
        }
    };

    public getUser = async (req: { [k: string]: any }, res: Response) => {
        try {
            const data = await this.userService.getUser(req.user.mobile);
            return res.status(200).send({ data });
        } catch (error: any) {
            return res.status(500).send({
                message: 'something went wrong',
                stack: error.message || '',
            });
        }
    };
}
