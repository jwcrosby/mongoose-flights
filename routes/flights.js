import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'All Flights' })
})

router.get('/new', flightsCtrl.new)

export { 
  router
}
