const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: [true, "Username is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        avatar: {
            type: String
        },
        role: {
            type: String,
            enum: ['admin', 'consumer'],
            default: 'consumer'
        },
        password: {
            type: String,
            required: true,
        },
        last_updated: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('user', UserSchema);