import {Router} from 'express';
import {Connection} from 'typeorm';
import * as slug from 'slug';
import * as marked from 'marked';
import Post from '../entities/Post';

const router: Router = Router();
const auth  = (req, res, next) => {
    if (req.session.auth) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

router.get("/", async (req, res) => {
    let db: Connection = req.app.get("database");

    let posts = await db.getRepository(Post)
            .createQueryBuilder("posts")
            .orderBy("posts.id", "DESC")
            .getMany();

    for (let post of posts) {
        post.body = marked(post.body);
    }
    res.render("blog/index.html", {posts: posts});
});

router.post("/", auth, async (req, res) => {
    let db: Connection = req.app.get("database");
    let repo = db.getRepository(Post);

    let post = new Post();
    post.title = req.body.title;
    post.slug = slug(post.title, {lower: true});
    post.body = req.body.body;

    let id = 0;
    while (typeof(await repo
                .findOne({ slug: post.slug + (id == 0 ? '' : id)}))
                != 'undefined') {
        id++;
    }
    post.slug = post.slug + (id == 0 ? '' : id);

    await db.getRepository(Post).persist(post);
    res.redirect("/blog/" + post.slug);
});

router.get("/:slug", async (req, res, next) => {
    let db: Connection = req.app.get("database");

    let post = await db.getRepository(Post)
                        .findOne({ slug: req.params.slug });
    if (typeof(post) == 'undefined') {
        next();
        return;
    }

    post.body = marked(post.body);
    res.render("blog/view.html", {post: post});
});

router.get('/:slug/edit', auth, async (req, res, next) => {
    let db: Connection = req.app.get("database");

    let post = await db.getRepository(Post)
                        .findOne({ slug: req.params.slug });
    if (typeof(post) == 'undefined') {
        next();
        return;
    }

    res.render("blog/edit.html", {post: post});
});

router.post('/:slug', auth, async (req, res, next) => {
    let db: Connection = req.app.get("database");
    let repo = db.getRepository(Post);

    let post = await repo.findOne({ slug: req.params.slug });
    if (typeof(post) == 'undefined') {
        next();
        return;
    }

    post.body = req.body['body'];
    repo.persist(post);

    res.redirect('/blog');
});

router.get('/:slug/delete', auth, async (req, res, next) => {
    let db: Connection = req.app.get("database");
    let repo = db.getRepository(Post);

    // TODO: Make this not slow
    let post = await repo.findOne({ slug: req.params.slug });
    if (typeof(post) == 'undefined') {
        next();
        return;
    }
    await db.getRepository(Post).remove(post);

    res.redirect("/blog");

});

router.get("/create", auth, (req, res) => {
    res.render("blog/create.html");
});

export default router;