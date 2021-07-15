import { Flight } from "../models/flight.js"
import { Destination } from "../models/destination.js"

export {
    index,
    show,
    newFlight as new,
    create,
    createTicket,
    addDestinationToFlight,
    deleteDestinationFromFlight
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

function show(req, res) {
    //Find and return a flight based on id tag established in the route
    Flight.findById(req.params.id)
    //Populate?
    .populate("destinations")
    //Execute?
    .exec(function(err, flight) {
        //Find all of the destinations that are not already attached to the flight found above
        Destination.find({_id: {$nin: flight.destinations}}, function(err, destinationsNotAttached) {

            //Then render the flight and th
            res.render("flights/show", {
                err: err,
                flight: flight,
                title: "Flight Detail",
                destinationsNotAttached: destinationsNotAttached
            }) 
        })
    }) 
}


function newFlight(req, res) {
    // Render 'flights/new'
    res.render('flights/new', {
        title: "Add Flight"
    })
}

function create(req, res) {
    //Clean up the incoming data first
    console.log("req.body")
    console.log(req.body)

    //Remove unused input properties
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }

    //Then create a new document/record
    const flight = new Flight(req.body)

    console.log("flight")
    console.log(flight)

    //And save it to the database
    flight.save(function(err) {
        /* Error handling - If something goes wrong, redirect back to
        '/flights/new' so they can try again */
        if (err) return res.redirect('/flights/new')
        /* Redirect - Otherwise, redirect back to "/flights" */
        res.redirect('/flights')
    })

}

function createTicket(req, res) {
    //Find and return a flight based on id tag established in the route
    Flight.findById(req.params.id, function(err, flight) {

        //Push the full req.body into the flight's tickets array parameter
        flight.tickets.push(req.body)
        
        //Then save the update to the flight
        flight.save(function(err) {

            //Then redirect
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

function addDestinationToFlight(req, res) {
    Flight.findById(req.params.id, function(err, flight) {

        flight.destinations.push(req.body.destinationId)

        flight.save(function(err) {
            
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

function deleteDestinationFromFlight(req, res) {

    console.log(req.params.id)
    console.log(req.params.destinationId)

    Flight.findById(req.params.id, function(err, flight) {

        flight.destinations.remove(req.params.destinationId)

        flight.save(function(err) {
            
            res.redirect(`/flights/${flight._id}`)

        })
    })
}