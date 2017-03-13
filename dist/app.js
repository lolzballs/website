"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const nunjucks = require("nunjucks");
const typeorm_1 = require("typeorm");
const routes_1 = require("./routes");
const app = express();
exports.app = app;
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    name: 'dank-memes',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.disable("x-powered-by");
app.use('/', routes_1.default);
app.use(express.static('static'));
app.use((req, res) => {
    res.status(404);
    res.render("errors/404.html", {
        url: req.originalUrl
    });
});
typeorm_1.createConnection({
    driver: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    entities: [
        __dirname + "/entities/*.js"
    ],
}).then(connection => {
    app.set("database", connection);
}).catch(error => console.log(error));
