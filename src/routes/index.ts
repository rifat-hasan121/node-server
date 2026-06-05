import { readFile, writeFile } from "../helpers/fileDB";
import parseBody from "../helpers/parseBody";
import addRoute from "../helpers/RouteHendler";
import sendJson from "../helpers/sendJson";

addRoute("GET", "/", (req, res) => {
sendJson(res, 200, {
    message: "this status from addRoute",
    path: req.url,
    data: {
        name: "Rifat",
        age: 25
    }
})
});


addRoute("GET", "/health", (req, res) => {
sendJson(res, 200, {
    message: "health status okey",
    path: req.url,
    data: {
        status: "ok"
    }
})
}); 


addRoute("POST", "/api/users", async (req, res) => {
    const body = await parseBody(req);

    const users= readFile();
    const newUsers={
        ...body 
    };

    users.push(newUsers);

    writeFile(users);
    
    sendJson(res, 200,body)
})
