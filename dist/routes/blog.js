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
// LISTING
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
// CREATE
router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let db = req.app.get("database");
    let post = new Post_1.default();
    post.title = req.body.title;
    post.slug = slug(post.title, { lower: true });
    post.body = req.body.body;
    yield db.getRepository(Post_1.default).persist(post);
    res.redirect("/blog/" + post.slug);
}));
exports.default = router;
