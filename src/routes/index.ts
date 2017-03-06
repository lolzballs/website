import {Router} from 'express';
import blog from './blog';

const router: Router = Router();

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

router.use('/blog', blog);

export default router;