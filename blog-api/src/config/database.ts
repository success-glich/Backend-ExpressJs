import { Sequelize } from "sequelize-typescript";
import { config } from "./config";
// import { User } from "../users/users";
import { Blog } from "../blog/blog";


class Database {
    public sequelize: Sequelize | undefined;
    private POSTGRES_DB = config.dbName
    private POSTGRES_HOST = config.dbHost;
    private POSTGRES_PORT = config.dbPort
    private POSTGRES_USER = config.dbUser;
    private POSTGRES_PASSWORD = config.dbPassword;

    constructor() {
        this.connectToPostgresSQL().then(() => {
            console.log("✅ Database synced successfully")
        })
    }
    // private POSTGRES_PORT
    private async connectToPostgresSQL() {
        const options = {
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
        };
        this.sequelize = new Sequelize({
            ...options,
            dialect: "postgres",
            logging: false,
            define: {
                underscored: true,
            },
            models: [Blog]
        });
        this.sequelize.authenticate().then(() => {
            console.log(
                "✅ PostgreSQL Connection has been established successfully."
            );
        }).catch(err => {
            console.error("❌ Unable to connect to the PostgreSQL database:");

        });
    }
}

export default Database;