import { NextFunction, Response } from 'express';
import { User } from '../schemas/userSchema';
import { ROLES } from '../constants';

export async function verifySession(
    req: { [k: string]: any },
    res: Response,
    next: NextFunction
) {
    try {
        const session = req.headers['session_key'];
        if (!session) {
            return res.status(403).send({
                message: 'session_key_missing',
            });
        }

        const user = await User.findOne({ 'sessions.sessionKey': session });
        if (!user) {
            return res.status(403).send({
                message: 'invalid_session_key',
            });
        }

        if (user.activeSession?.sessionKey !== session) {
            return res.status(403).send({
                message:
                    'There is already session up and running, please logout and login again',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send({
            message: 'something went wrong',
        });
    }
}

export async function verifyAdmin(
    req: { [k: string]: any },
    res: Response,
    next: NextFunction
) {
    const { user } = req;
    if (!user) {
        return res.status(403).send({
            message: 'unauthorised',
        });
    }

    if (user.role === ROLES.USER) {
        return res.status(403).send({
            message: 'unauthorised',
        });
    }

    next();
}
