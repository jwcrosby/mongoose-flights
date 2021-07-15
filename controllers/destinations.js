import { Destination } from "../models/destination.js"

export {
    newDestination as new,
}

function newDestination(req, res) {
    // Render 'destination/new'
    res.render('destination/new', {
        title: "Add Destination"
    })
}