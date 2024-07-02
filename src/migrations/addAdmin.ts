import { ROLES } from '../constants';
import { User } from '../schemas/userSchema';
import bcrypt from 'bcrypt';

export const addAdminMigration = async () => {
    const isAdmin = await User.findOne({ username: 'admin' });
    if (isAdmin) return;

    const salt = bcrypt.genSaltSync(Number(process.env.SALT));
    const hash = bcrypt.hashSync('password', salt);
    const admin = new User({
        username: 'admin',
        mobile: '1234567890',
        password: hash,
        role: ROLES.ADMIN,
    });

    await admin.save();
    console.log('admin details migrated ✔️');
};
