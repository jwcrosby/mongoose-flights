import mongoose from 'mongoose'

export {
    Flight
}

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

// Define the schema/blueprint for a "ticket"
const ticketsSchema = new Schema({
    seat: {
        type: String, 
        match: /[A-F][1-9]\d?/
    },
    price: {
        type: Number, min: 0}
},  {
    timestamps: true
})


// Define the schema/blueprint for a "flight"
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
    },
    tickets: [ticketsSchema]
}, 
{
    timestamps: true
})

//Create a Mongoose model of that flightSchema
const Flight = mongoose.model("Flight", flightSchema)
