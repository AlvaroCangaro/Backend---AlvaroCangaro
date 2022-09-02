const { Router } = require('express');
const router = Router();
const passport = require('passport');
const path = require('path');

router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
    } else {
        res.sendFile(path.join(__dirname, '../public/register.html'));
    }
});

router.post(
    '/register',
    passport.authenticate('register', { failureRedirect: '/failregister' }),
    (req, res) => {
        const user = req.user;
        res.redirect('/');
    }
);

router.get('/failregister', (req, res) => {
    res.send('<div style="color: white; background-color: #f76e5c; margin: 10%; padding: 2%; text-align: center"><h2>ERROR REGISTER</h2></div>');
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    res.json({ status: 'ok' });
});

module.exports = router;