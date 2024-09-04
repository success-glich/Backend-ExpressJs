// import { AuthController } from './auth.controller';
import express from "express";
import { BlogController } from "./blog.controller";

export class BlogRoutes {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    public routes() {
        // this.router.get("/", (_, res) => {
        //     return res.status(200).json({
        //         message: "Blog Api is working fine"
        //     })
        // });
        this.router.post('/', BlogController.createBlog);
        this.router.get('/', BlogController.getAllBlogs);
        this.router.route("/:id").get(BlogController.getBlogById).delete(BlogController.deleteBlogById).put(BlogController.updateById)
    }
}