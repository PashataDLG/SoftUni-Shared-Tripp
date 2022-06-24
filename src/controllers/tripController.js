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

        res.redirect('/');
    } catch (err) {
        res.render('trip/trip-create', { error: err.message });
    }
});

module.exports = router;