import http, { Server, IncomingMessage, ServerResponse } from "http";
import path from "path";
import config from "./config";
import addRoute, { RequestHandler, routes } from "./helpers/RouteHendler";


addRoute("GET", "/", (req, res) => {
   res.writeHead(200, {"content-type": "application/json"})
   res.end(JSON.stringify({
    message: "this status from addRoute",
    path: req.url,
    data: {
        name: "Rifat",
        age: 25
    }
   }))
});





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

    // root route
    // if (req.url == "/" && req.method == "GET") {
    //     res.writeHead(200, { "content-type": "application/json" });
    //     res.end(JSON.stringify({
    //         message: "success",
    //         path: req.url,
    //         data: {
    //             name: "Rifat",
    //             age: 25
    //         }
    //     }));

    // }

    // health route
    // if (req.url == "/health" && req.method == "GET") {
    //     res.writeHead(200, { "content-type": "application/json" });
    //     res.end(JSON.stringify({
    //         message: "health status okey",
    //         path: req.url,
    //     }));
    // }

    // post route
    // if (req.url == "/api/users" && req.method == "POST") {

        //     const user = {
        //         id: 1,
        //         name: "Rifat",
        //         email: "[EMAIL_ADDRESS]"
        //     }

        //     res.writeHead(200, { "content-type": "application/json" });
        //     res.end(JSON.stringify(user));


        // let body = "";

        // req.on("data", (chunk) => {
        //     body += chunk;
        // })

        // req.on("end", () => {
        //     try {
        //         const parseBody = JSON.parse(body);
        //         console.log(parseBody)
        //         res.end(JSON.stringify(parseBody));

        //     } catch (error: any) {
        //         console.log(error.message)
        //         res.writeHead(400, { "content-type": "application/json" });
        //         res.end(JSON.stringify({
        //             message: "Invalid JSON"
        //         }));
        //     }
        // })



    // }
});




server.listen(config.port, () => {
    console.log(`server is running on port ${config.port} in ${config.env} mode`);
})