import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { verifySession } from '../middleware/verifySession';

const userRouter = Router();
const controller = new UserController();

userRouter.post('/createUser', controller.createUser);
userRouter.post('/login', controller.login);
userRouter.get('/getUser', verifySession, controller.getUser);

export default userRouter;
