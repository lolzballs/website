import {Router} from 'express';
import * as bcrypt from 'bcrypt';

const router: Router = Router();

router.get('/login', (req, res) => {
    res.render('login.html');
});

router.post('/login', async (req, res) => {
    if (req.body.username == process.env.AUTH_USER
        && await bcrypt.compare(req.body.password, process.env.AUTH_PASS)) {
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