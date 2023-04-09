const http = require("http");
const fs = require("fs");
const path = require('path');
const offers = require("./js/data.js");
const getNewOffer = require("./js/addoffer.js");

fs.readFile("data.txt", function(err, data) {
	if (data.length === 0) {
		fs.writeFileSync("data.txt", JSON.stringify(offers));
	} 
});
http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control_Methods", "GET, POST, UPDATE");
    res.writeHead(200, {"Content-Type": "application/json"});
    const url = req.url;
    console.log(req.url);
    if (req.method === "GET"){
        if(url === "/offers"){
            const data = fs.readFileSync("data.txt", "utf-8");
            res.write(data);
            res.end();
        }
    }if(req.method === "POST"){
        if(url === "/offer"){
            
            req.on('data', function (data) {
                const dataTxt = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
                dataTxt.push(getNewOffer.getNewOffer(JSON.parse(data)))
                fs.writeFileSync("data.txt", JSON.stringify(dataTxt));
            });
            req.on("end", () => {
                res.write(fs.readFileSync("data.txt", "utf-8"));
                res.end();
            });
            
        }
    }
}).listen(4000, function () {
    console.log("listen port 4000");
});