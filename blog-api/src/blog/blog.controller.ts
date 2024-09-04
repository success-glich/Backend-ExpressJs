import { NextFunction, Request, Response } from "express";
import { blogSchema } from "./blog.validation";
import { ApiResponse } from "../utils/ApiResponse";
import { ZodError } from "zod";
import { formatError } from "../utils/helper";
import { blogServices } from "./index";
import AppError from "../utils/AppError";

export const BlogController = {

    createBlog: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            const validatedData = blogSchema.parse(req.body);
            console.log(validatedData);
            const blog = await blogServices.saveBlog(validatedData)
            res.status(201);
            return res.json(new ApiResponse(201, blog, "Blog created successfully.", true));
        } catch (err: any) {
            if (err instanceof ZodError) {
                return res.status(422).json({
                    message: "Invalid data",
                    errors: formatError(err)
                });
            }
            next(err)
        }

    },
    getAllBlogs: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const blogs = await blogServices.getAllBlogs();
            res.status(200);
            return res.json(new ApiResponse(200, blogs, "Blogs fetched successfully.", true));
        } catch (err: any) {
            next(err);
        }
    },
    deleteBlogById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const isBlogExists = await blogServices.findById(id);

            if (!isBlogExists) {
                return next(new AppError("Blog not found.", 404));
            }

            const blog = await blogServices.deleteBlog(id);
            res.status(200);
            return res.json(new ApiResponse(200, null, "Blog deleted successfully.", true));
        } catch (err: any) {
            next(err);
        }
    },
    getBlogById: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const id = Number(req.params.id);
            const isBlogExists = await blogServices.findById(id);

            if (!isBlogExists) {
                return next(new AppError("Blog not found.", 404));
            }

            const blog = await blogServices.findById(id);
            res.status(200);
            return res.json(new ApiResponse(200, blog, "Blog fetched successfully.", true));
        } catch (err: any) {
            next(err);
        }
    },
    updateById: async (req: Request, res: Response, next: NextFunction) => {

        try {
            const id = Number(req.params.id);
            const isBlogExists = await blogServices.findById(id);

            if (!isBlogExists) {
                return next(new AppError("Blog not found.", 404));
            }
            const validatedData = blogSchema.parse(req.body);

            const blog = await blogServices.updateBlog(id, validatedData);
            res.status(200);
            return res.json(new ApiResponse(200, null, "Blog updated successfully.", true));
        } catch (err: any) {
            next(err);
        }
    }


}