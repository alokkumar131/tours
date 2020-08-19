const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tourController');

// router.param('id', tourController.checkId)

//Alias Routing
router.get('/top-5-tours', tourController.aliasTours, tourController.getAllTours);
//Routes
router.get('/api/tours', tourController.getAllTours);
router.get('/api/tours/:id', tourController.getTour);
router.post('/api/tours', tourController.ckeckBody, tourController.createTour);
router.patch('/api/tours/:id', tourController.updateTour);
router.delete('/api/tours/:id', tourController.deleteTour);

module.exports = router;

