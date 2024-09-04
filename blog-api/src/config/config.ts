import * as dotenv from "dotenv";
dotenv.config();

const _config = {
    port: Number(process.env.PORT),
    dbName: String(process.env.POSTGRES_DB),
    dbPort: Number(process.env.POSTGRES_PORT),
    dbHost: String(process.env.POSTGRES_HOST),
    dbUser: String(process.env.POSTGRES_USER),
    dbPassword: String(process.env.POSTGRES_PASSWORD),
    smtpHost: String(process.env.SMTP_HOST),
    smtpUser: String(process.env.SMTP_USER),
    smtpPassword: String(process.env.SMTP_PASSWORD),
    smtpPort: Number(process.env.SMTP_PORT),
    fromEmail: String(process.env.FROM_EMAIL),
    jwtSecret: String(process.env.JWT_SECRET),
    jwtTokenExpireTime: String(process.env.TOKEN_EXPIRES_TIME)

}

export const config = Object.freeze(_config);