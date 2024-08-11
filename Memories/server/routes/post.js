import express from "express";
import { getPosts } from "../controllers/posts.js";
const router = express.Router();

router.route("/").get(getPosts);

export default router;
