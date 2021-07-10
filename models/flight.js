import mongoose from 'mongoose'

export {
    Flight
}

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const flightSchema = new Schema({
    airline: {
        type: String, 
        enum: ["American", "Southwest", "United"]
    },

    airport: {
        type: String, 
        enum: ["AUS", "DEN", "DFW", "LAX", "SAN"],
        default: "DEN"
    },

    flightNo: {
        type: Number, 
        min: 10, 
        max: 9999
    },
    departs: {
        type: Date, 
        required: false, 
        // default: one year from created
    }
}, 
{
    timestamps: true
})

const Flight = mongoose.model("Flight", flightSchema)
