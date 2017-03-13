import {Router} from 'express';
import 'express-session';

const router: Router = Router();

router.get('/login', (req, res) => {
    res.render('login.html');
});

router.post('/login', (req, res) => {
    if (req.body.username == process.env.AUTH_USER) {
        req.session['auth'] = true;
        res.redirect('/');
    } else {
        req.session.destroy((err) => {});
        res.redirect('/auth/login');
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
})

export default router;