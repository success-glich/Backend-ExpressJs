
import { join } from "path";
import { Blog, IBlog } from "./blog";

class BlogServices {
    private Blog;
    constructor() {
        this.Blog = Blog
    }
    async getAllBlogs() {
        try {
            const blogs = await this.Blog.findAll();
            console.log(blogs);
            return blogs;
        } catch (err) {
            throw err
        }
    }
    async findById(id: number) {
        try {
            const blog = await this.Blog.findByPk(id);
            return blog;
        } catch (err) {
            throw err
        }
    }
    async saveBlog(data: IBlog) {
        try {
            console.log("blog", data);
            const blog = await this.Blog.create(data);
            delete blog.dataValues.createdAt;
            delete blog.dataValues.updatedAt;
            return blog;
        } catch (err) {
            throw err
        }
    }
    async updateBlog(id: number, data: Partial<IBlog>) {
        try {
            const blog = await this.Blog.update(data, { where: { id: id } });
            return blog;
        } catch (err) {
            throw err;
        }
    }
    async deleteBlog(id: number) {
        try {
            const blog = await this.Blog.destroy({ where: { id: id } });
            return blog;
        } catch (err) {
            throw err;
        }
    }
}

export default BlogServices;