import mongoose from 'mongoose';

interface userInterface extends mongoose.Document {
    username: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            lowercase: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const User = mongoose.model<userInterface>('User', userSchema);

export default User;