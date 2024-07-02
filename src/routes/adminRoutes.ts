import { Router } from 'express';
import { verifyAdmin, verifySession } from '../middleware/verifySession';
import { AdminController } from '../controllers/adminController';

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.get('/users', verifySession, verifyAdmin, adminController.listUser);
adminRouter.get(
    '/doGetUser',
    verifySession,
    verifyAdmin,
    adminController.doGetUser
);

export default adminRouter;
