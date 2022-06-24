const router = require('express').Router();

const tripService = require('../services/tripService');

router.get('/create', function (req, res) {
    res.render('trip/trip-create')
});

router.post('/create', async function (req, res) {
    let tripData = req.body;

    tripData.creator = req.user._id;

    try {
        await tripService.createTrip(req.body);

        res.redirect('/trip/shared-trips');
    } catch (err) {
        res.render('trip/trip-create', { error: err.message });
    }
});

router.get('/shared-trips', async function (req, res) {
    const trips = await tripService.getAll().lean();

    res.render('trip/shared-trips', { trips });
});

router.get('/:tripId/details', async function (req, res) {
    const trip = await tripService.getOneDetailed(req.params.tripId).lean();

    const isOwner = trip.creator._id == req.user?._id;

    res.render('trip/trip-details', { trip, isOwner });
});

module.exports = router;