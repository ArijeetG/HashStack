import { User } from '../schemas/userSchema';

export class AdminService {
    public async listUsers() {
        const users = await User.find({
            username: { $ne: 'admin' },
        }).select('username mobile activeSession sessions');

        return users;
    }

    public async doGetUser(mobile: string) {
        const users = await User.find({
            mobile,
        }).select('username mobile activeSession sessions');

        return users;
    }
}
