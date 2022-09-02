const { Router } = require('express');
const router = Router();
const passport = require('passport');
const path = require('path');

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        res.status(200).json({ user, status: 'ok' });
    } else {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    }
});

router.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/faillogin' }),
    (req, res) => {
        const user = req.user;
        res.redirect('/');
    }
);

router.get('/faillogin', (req, res) => {
    res.send('<div style="color: white; background-color: #f76e5c; margin: 10%; padding: 2%; text-align: center"><h2>USER ERROR LOGIN</h2></div>');
});

module.exports = router;