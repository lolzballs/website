"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const blog_1 = require("./blog");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.render('index.html');
});
router.get('/about', (req, res) => {
    res.render('about.html');
});
router.get('/contact', (req, res) => {
    res.render('contact.html');
});
router.get('/projects', (req, res) => {
    res.render('projects.html');
});
router.use('/auth', auth_1.default);
router.use('/blog', blog_1.default);
exports.default = router;
