import {Router} from 'express';
import {Connection} from 'typeorm';
import * as slug from 'slug';
import * as marked from 'marked';
import Post from '../entities/Post';

const router: Router = Router();

// LISTING
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
})

// CREATE
router.post("/", async (req, res) => {
    let db: Connection = req.app.get("database");

    let post = new Post();
    post.title = req.body.title;
    post.slug = slug(post.title, {lower: true});
    post.body = req.body.body;

    await db.getRepository(Post).persist(post);
    res.redirect("/blog/" + post.slug);
});

export default router;