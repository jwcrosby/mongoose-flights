import { Flight } from "../models/flight.js"

export {
    index,
    newFlight as new,
    create,
}

function index(req, res) {
    Flight.find({}, function (err, flights) {

        res.render('flights/index', {
            err: err,
            flights: flights,
            title: "All Flights"
        })
    })
}

function newFlight(req, res) {
    
    res.render('flights/new', {
        title: "Add Flight"
    })
}

function create(req, res) {
    console.log("BUTTON PUSHED!")

}