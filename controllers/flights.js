import { Flight } from "../models/flight.js"

export {
    index,
    newFlight as new,
    create,
    show,
    createTicket
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

function show(req, res) {
    //Find and return a flight based on id tag established in the route
    Flight.findById(req.params.id, function(err, flight) {

        //Then render the record found 
        res.render("flights/show", {
            err: err,
            flight: flight,
            title: "Flight Detail"
        }) 
    })
}

function createTicket(req, res) {
    //Find and return a flight based on id tag established in the route
    Flight.findById(req.params.id, function(err, flight) {

        flight.tickets.push(req.body)
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}