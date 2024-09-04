import express, { NextFunction, Request, Response } from "express";
import { Application } from "express";
import { Sequelize } from "sequelize";
import cors from "cors";
import helmet from "helmet";
import { ApiResponse } from "./utils/ApiResponse";
import Database from "./config/database";
import { BlogRoutes } from "./blog/blog.routes";
import AppError from "./utils/AppError";

class App {
    public app: Application;
    public db: Sequelize | undefined;
    public blogRoutes: BlogRoutes;

    constructor() {
        this.app = express();
        this.plugins();
        this.databaseSync();

        this.blogRoutes = new BlogRoutes();
        this.routes();
        this.globalErrorHandler();
    }

    protected plugins(): void {
        // this.app[Symbol]
        this.app.use(cors())
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use((req, res, next) => {
            console.log("Api is hit:", req.originalUrl);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,x-access-token,Accept,Origin');
            res.setHeader('Cache-Control', 'no-cache="Set-Cookie, Set-Cookie2"');
            next();
        });
    }
    protected routes(): void {
        this.app.get('/api/v1/health-check', (_: Request, res: Response) => {
            res.status(200);
            return res.json({
                message: "Welcome to blog api."
            })
        });
        this.app.use('/api/v1/blogs', this.blogRoutes.router);

        this.app.use('*', (req: Request, res: Response, next: NextFunction) => {
            next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
        })

    }
    protected databaseSync(): void {
        this.db = new Database().sequelize;

        this.db?.sync({
            // force: true,
            // alter: {
            //     drop: false,

            // }
            alter: true,

        });
    }
    protected globalErrorHandler(): void {
        this.app.use(
            (err: AppError, req: Request, res: Response, next: NextFunction) => {
                console.log("error caught ::", err);
                // const errorRes: ErrorRequestHandler = handleGlobalException(error, process.env.NODE_ENV === "production");
                err.statusCode = err.statusCode || 500;

                res.status(err.statusCode)
                return res.json(new ApiResponse(err.statusCode, err.status, err.message, false));
            }
        );
    }
};
const app = new App();
export default app;