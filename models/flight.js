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

function addOneYear() {
    //Get the current date
    const today = new Date()

    const futureYear = today.getFullYear() + 1

    today.setFullYear(futureYear)

    return today
}

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
        default: function() {
            //Default value is one year from date created
            //Get the current date
            const today = new Date()

            //Get the current year plus 1
            const futureYear = today.getFullYear() + 1
        
            //Set the year of "today" to be equal to the futureYear
            today.setFullYear(futureYear)
        
            //Return the updated today
            return today
        }
    },
    tickets: [ticketsSchema],
    destinations:[{type: Schema.Types.ObjectId, ref: 'Destination'}],
}, 
{
    timestamps: true
})

//Create a Mongoose model of that flightSchema
const Flight = mongoose.model("Flight", flightSchema)
