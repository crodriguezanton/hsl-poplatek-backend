import { Schema, mongoose } from "../utils/mongoose";

const UserSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    MAC: {
        type: String,
        required: true,
    },
    __v: {
        type: Number,
        select: false,
    },
});

const User = mongoose.model("User", UserSchema);

export default User;
