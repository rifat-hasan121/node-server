import http, { Server, IncomingMessage, ServerResponse } from "http";
import path from "path";
import config from "./config";

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

    console.log("server is running ...");

    if (req.url == "/" && req.method=="GET") {
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({
            message: "success",
            path:req.url,
            data: {
                name: "Rifat",
                age: 25
            }
        }));
        
    }
    
});




server.listen(config.port, ()=>{
    console.log(`server is running on port ${config.port} in ${config.env} mode`);
})