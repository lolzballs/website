"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const slug = require("slug");
const marked = require("marked");
const Post_1 = require("../entities/Post");
const router = express_1.Router();
const auth = (req, res, next) => {
    if (req.session.auth) {
        next();
    }
    else {
        res.redirect('/auth/login');
    }
};
router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let db = req.app.get("database");
    let posts = yield db.getRepository(Post_1.default)
        .createQueryBuilder("posts")
        .orderBy("posts.id", "DESC")
        .getMany();
    for (let post of posts) {
        post.body = marked(post.body);
    }
    res.render("blog/index.html", { posts: posts });
}));
router.post("/", auth, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let db = req.app.get("database");
    let repo = db.getRepository(Post_1.default);
    let post = new Post_1.default();
    post.title = req.body.title;
    post.slug = slug(post.title, { lower: true });
    post.body = req.body.body;
    let id = 0;
    while (typeof (yield repo
        .findOne({ slug: post.slug + (id == 0 ? '' : id) }))
        != 'undefined') {
        id++;
    }
    post.slug = post.slug + (id == 0 ? '' : id);
    yield db.getRepository(Post_1.default).persist(post);
    res.redirect("/blog/" + post.slug);
}));
router.get("/:slug", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.app.get("database");
    let post = yield db.getRepository(Post_1.default)
        .findOne({ slug: req.params.slug });
    if (typeof (post) == 'undefined') {
        next();
        return;
    }
    post.body = marked(post.body);
    res.render("blog/view.html", { post: post });
}));
router.get('/:slug/edit', auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.app.get("database");
    let post = yield db.getRepository(Post_1.default)
        .findOne({ slug: req.params.slug });
    if (typeof (post) == 'undefined') {
        next();
        return;
    }
    res.render("blog/edit.html", { post: post });
}));
router.post('/:slug', auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.app.get("database");
    let repo = db.getRepository(Post_1.default);
    let post = yield repo.findOne({ slug: req.params.slug });
    if (typeof (post) == 'undefined') {
        next();
        return;
    }
    post.body = req.body['body'];
    repo.persist(post);
    res.redirect('/blog');
}));
router.get('/:slug/delete', auth, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let db = req.app.get("database");
    let repo = db.getRepository(Post_1.default);
    // TODO: Make this not slow
    let post = yield repo.findOne({ slug: req.params.slug });
    if (typeof (post) == 'undefined') {
        next();
        return;
    }
    yield db.getRepository(Post_1.default).remove(post);
    res.redirect("/blog");
}));
router.get("/create", auth, (req, res) => {
    res.render("blog/create.html");
});
exports.default = router;
