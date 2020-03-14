import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: String
}, {collection: 'Users'});

export const UserModel = mongoose.model('Users', UserSchema);