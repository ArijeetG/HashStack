import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../schemas/userSchema';
import requestIp from 'request-ip';
import bcrypt from 'bcrypt';
import { ROLES } from '../constants';

export class UserService {
    public async addUser(req: Request) {
        const { mobile, username, password } = req.body;

        const userAgent: string = String(req.headers['user-agent']);
        const ipAddress: string = requestIp.getClientIp(req) || 'unknown';

        const sessionKey: string = uuidv4();
        const current: number = Math.floor(Date.now() / 1000);

        const salt = bcrypt.genSaltSync(Number(process.env.SALT));
        const hash = bcrypt.hashSync(password, salt);
        try {
            let user = await User.findOne({ mobile });

            if (user) {
                throw {
                    message: 'user_exists',
                };
            } else {
                user = new User({
                    mobile,
                    username,
                    activeSession: {
                        userAgent,
                        ipAddress,
                        sessionKey,
                        loggedInAt: current,
                    },
                    password: hash,
                    role: ROLES.USER,
                    sessions: [
                        {
                            userAgent,
                            ipAddress,
                            sessionKey,
                            loggedInAt: current,
                        },
                    ],
                });
            }

            await user.save();

            return {
                message: 'user inserted',
                mobile,
                username,
                sessionKey,
            };
        } catch (error) {
            throw {
                message: 'user_create_failed',
                stack: error,
            };
        }
    }

    public async getUser(mobile: string) {
        const user = await User.findOne({ mobile });
        if (!user) {
            throw {
                message: 'user_not_found',
            };
        }

        return user;
    }

    public async login(req: Request) {
        const { mobile, password } = req.body;
        let user = await User.findOne({ mobile });
        if (!user) {
            throw {
                message: 'user_not_found',
            };
        }

        const comparePassword = bcrypt.compareSync(
            password,
            String(user.password)
        );

        if (!comparePassword) {
            throw {
                message: 'invalid mobile/password',
            };
        }

        const userAgent: string = String(req.headers['user-agent']);
        const ipAddress: string = requestIp.getClientIp(req) || 'unknown';

        const sessionKey: string = uuidv4();
        const current: number = Math.floor(Date.now() / 1000);

        user.sessions.push({
            userAgent,
            ipAddress,
            sessionKey,
            loggedInAt: current,
        });

        user.activeSession = {
            userAgent,
            ipAddress,
            sessionKey,
            loggedInAt: current,
        };

        await user.save();

        return {
            mobile,
            username: user.username,
            sessionKey,
        };
    }
}
