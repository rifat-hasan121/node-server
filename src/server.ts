import http, { Server, IncomingMessage, ServerResponse } from "http";
import path from "path";
import config from "./config";
import { RequestHandler, routes } from "./helpers/RouteHendler";
import "./routes";



const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

    console.log("server is running ...");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = routes.get(method);
    const handler: RequestHandler | undefined = methodMap?.get(path);

    if (handler) {
        handler(req, res);
    } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            statusCode: 404,
            message: "Route Not Found",
            path: path,
        }));
    }
});




server.listen(config.port, () => {
    console.log(`server is running on port ${config.port} in ${config.env} mode`);
})