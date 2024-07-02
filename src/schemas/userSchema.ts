import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        unique: true,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        reuired: true,
    },

    activeSession: {
        sessionKey: {
            type: String,
        },
        userAgent: {
            type: String,
        },
        ipAddress: {
            type: String,
        },
        loggedInAt: {
            type: Number,
        },
    },

    role: {
        type: Number,
        required: true,
    },

    sessions: [
        {
            sessionKey: {
                type: String,
                required: true,
            },
            userAgent: {
                type: String,
                required: true,
            },
            ipAddress: {
                type: String,
                required: true,
            },
            loggedInAt: {
                type: Number,
                required: true,
            },
        },
    ],
});

export const User = mongoose.model('users', userSchema);
