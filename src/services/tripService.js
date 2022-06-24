const Trip = require('../models/Trip');

exports.createTrip = (tripData) => Trip.create(tripData);

exports.getAll = () => Trip.find();

exports.getOneDetailed = (tripId) => Trip.findOne({ _id: tripId }).populate('creator');