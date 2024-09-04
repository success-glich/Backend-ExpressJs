
import { IncomingMessage, Server, ServerResponse } from "http";
import app from "./app";
import { config } from "./config/config";
const port = config.port;

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

(async () => {
    server = app.app.listen(port, () => {
        console.log(
            `✅ Server listening on port ${port} with process id ${process.pid} on Date :: ` +
            new Date()
        );
    });
})();
