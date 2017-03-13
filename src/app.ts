import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as nunjucks from 'nunjucks';
import {createConnection} from 'typeorm';
import routes from './routes';

const app: express.Application = express();

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    name: 'dank-memes',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.disable("x-powered-by");

app.use('/', routes);
app.use(express.static('static'));
app.use((req, res) => {
    res.status(404);
    res.render("errors/404.html", {
        url: req.originalUrl
    });
});

createConnection({
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

export {app};
