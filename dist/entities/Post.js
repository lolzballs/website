"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Post = class Post {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Post.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("string")
], Post.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "string", unique: true })
], Post.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column("text")
], Post.prototype, "body", void 0);
__decorate([
    typeorm_1.CreateDateColumn()
], Post.prototype, "created_at", void 0);
Post = __decorate([
    typeorm_1.Entity("posts")
], Post);
exports.default = Post;
