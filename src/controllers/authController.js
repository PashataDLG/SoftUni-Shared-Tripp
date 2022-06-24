const router = require('express').Router();

const authService = require('../services/authService');
const { SESSION_NAME } = require('../config/constants');

router.get('/register', function (req, res) {
    res.render('auth/register');
});

router.post('/register', async function (req, res) {
    const { email, password } = req.body;
    try {
        await authService.register(req.body);
        const token = await authService.login(email, password);

        if (!token) {
            return res.status(404);
        }

        res.cookie(SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (err) {
        res.status(404).render('auth/register', { error: err.message });
    }
});

router.get('/login', function (req, res) {
    res.render('auth/login');
});

router.post('/login', async function (req, res) {
    const { email, password } = req.body;
    try {
        let token = await authService.login(email, password);

        if (!token) {
            return res.status(404);
        }

        res.cookie(SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (err) {
        res.status(400).render('login', { error: err.message });
    }

});

router.get('/logout', function (req, res) {
    res.clearCookie(SESSION_NAME);
    res.redirect('/');
});

module.exports = router;