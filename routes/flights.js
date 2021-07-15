import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'

router.get('/', flightsCtrl.index) 

router.get('/new', flightsCtrl.new)

router.get('/:id', flightsCtrl.show)

router.post('/', flightsCtrl.create)

router.post('/:id/tickets', flightsCtrl.createTicket)

router.post("/:id/destinations", flightsCtrl.addDestinationToFlight)

router.post("/:id/destinations/:id", flightsCtrl.deleteDestinationFromFlight)

export { 
  router
}
