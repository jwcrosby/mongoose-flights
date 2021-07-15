import { Destination } from "../models/destination.js"

export {
    newDestination as new,
    create,
}

function newDestination(req, res) { 
    Destination.find({}, function(err, destinations) {
        res.render("destinations/new", {
            title: "Add Destination",
            destinations: destinations,
        })
    })
}

function create(req, res) {
    Destination.create(req.body, function(err, destination){
        res.redirect('/destinations/new')
    })
}