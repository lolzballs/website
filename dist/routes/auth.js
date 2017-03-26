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
const bcrypt = require("bcrypt");
const router = express_1.Router();
router.get('/login', (req, res) => {
    res.render('login.html');
});
router.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.body.username == process.env.AUTH_USER
        && (yield bcrypt.compare(req.body.password, process.env.AUTH_PASS))) {
        req.session['auth'] = true;
        res.redirect('/');
    }
    else {
        req.session.destroy((err) => { });
        res.redirect('/auth/login');
    }
}));
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
});
exports.default = router;
