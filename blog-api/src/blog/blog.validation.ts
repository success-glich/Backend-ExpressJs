import { z } from "zod";

export const blogSchema = z.object({
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters long." })
        .max(100, { message: "Title must be at most 100 characters long." }),
    content: z.string()
        .min(10, { message: "Content must be at least 10 characters long." })
        .max(5000, { message: "Content must be at most 5000 characters long." }),
});
