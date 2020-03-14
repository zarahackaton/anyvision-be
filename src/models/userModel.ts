import mongoose from 'mongoose';

/* Defines the DB schema for User entity */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: String
}, {collection: 'Users'});

export const UserModel = mongoose.model('Users', UserSchema);