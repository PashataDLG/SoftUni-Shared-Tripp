const Trip = require('../models/Trip');

exports.createTrip = (tripData) => Trip.create(tripData);