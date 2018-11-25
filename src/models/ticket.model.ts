import { Schema, mongoose } from "../utils/mongoose";

const TicketSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    valid: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
    zone: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    charge: {
        type: String,
        required: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
    __v: {
        type: Number,
        select: false,
    },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;
