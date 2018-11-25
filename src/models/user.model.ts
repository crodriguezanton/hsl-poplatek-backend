import { Schema, mongoose } from "../utils/mongoose";

const UserSchema = new Schema({
    customerId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mac: {
        type: String,
        required: true,
    },
    station: {
        type: String,
        required: false,
    },
    __v: {
        type: Number,
        select: false,
    },
});

const User = mongoose.model("User", UserSchema);

export default User;
