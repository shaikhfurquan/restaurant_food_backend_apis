import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "user name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    address: {
        type: Array,

    },
    phone: {
        type: String,
        required: [true, "phone number is required"]
    },
    userType: {
        type: String,
        required: [true, "user type is required"],
        default: 'client',
        emun: ['client', 'admin', 'vendor', 'driver'],
    },
    profile: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/01/06/92/47/360_F_106924759_7qPPu6bZNN2O4al1ExdEWBdHUcpKMwuJ.jpg'
    }
}, { timestamps: true })


const UserModel = mongoose.model('User', userSchema)

export default UserModel