import http, { Server, IncomingMessage, ServerResponse } from "http";
import path from "path";

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




server.listen(5000, ()=>{
    console.log(`server is running on port ${5000}`)
})