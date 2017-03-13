"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require("express-session");
const router = express_1.Router();
router.get('/login', (req, res) => {
    res.render('login.html');
});
router.post('/login', (req, res) => {
    if (req.body.username == process.env.AUTH_USER) {
        req.session['auth'] = true;
        res.redirect('/');
    }
    else {
        req.session.destroy((err) => { });
        res.redirect('/auth/login');
    }
});
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
});
exports.default = router;
