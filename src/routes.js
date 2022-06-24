const express = require('express');

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const tripController = require('./controllers/tripController');

const router = express.Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/trip', tripController);

router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;