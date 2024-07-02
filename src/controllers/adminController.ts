import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';

export class AdminController {
    adminService: AdminService;
    constructor() {
        this.adminService = new AdminService();
    }
    public listUser = async (req: Request, res: Response) => {
        try {
            const data = await this.adminService.listUsers();
            return res.status(200).send(data);
        } catch (error: any) {
            return res.status(500).send({
                message: 'something went wrong',
                stack: error.message || '',
            });
        }
    };

    public doGetUser = async (req: Request, res: Response) => {
        try {
            const { mobile } = req.query;
            const data = await this.adminService.doGetUser(String(mobile));
            return res.status(200).send(data);
        } catch (error: any) {
            return res.status(500).send({
                message: 'something went wrong',
                stack: error.message || '',
            });
        }
    };
}
