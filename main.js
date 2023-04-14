const http = require("http");
const fs = require("fs");
const path = require('path');
const os = require("os");
const busboy = require('busboy');
const offers = require("./js/data.js");
const getNewOffer = require("./js/addoffer.js");

fs.readFile("data.txt", function(err, data) {
	if (data.length === 0) {
		fs.writeFileSync("data.txt", JSON.stringify(offers));
	} 
});
http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const url = req.url;
    const dataObject = {}
    if (req.method === "GET"){
        if(url === "/offers"){
            const data = fs.readFileSync("data.txt", "utf-8");
            res.write(data);
            res.end();
        }
    }if(req.method === "POST"){
        if(url === "/offer"){
            
            const bb = busboy({ headers: req.headers });
            console.log(bb)
            bb.on('file', (name, file, info) => {
                const filename = info.filename;
                const fileType = filename.split('.').pop();
                
                if(name === 'avatar'){
                    const saveTo = path.join('img/avatars',`${Math.random().toString(36).substr(2, 15)}.${fileType}`);
                    dataObject.avatar = `http://${req.headers.host}/${saveTo}`;
                    file.pipe(fs.createWriteStream(saveTo));
                }else if(name === "house"){
                    const saveTo = path.join('img/house', `${Math.random().toString(36).substr(2, 15)}.${fileType}`);
                    dataObject.house = `http://${req.headers.host}/${saveTo}`;
                    file.pipe(fs.createWriteStream(saveTo));
                }
            
            });
            bb.on('field', (name, val) => {
                dataObject[name] = val;
            });
            
            bb.on('close', () => {
                console.log();
                const dataTxt = JSON.parse(fs.readFileSync("data.txt", "utf-8"));
                dataTxt.push(getNewOffer.getNewOffer(dataObject))
                fs.writeFileSync("data.txt", JSON.stringify(dataTxt));
                res.write(fs.readFileSync("data.txt", "utf-8"));
            res.end();
        });
        req.pipe(bb);
        }
    }

    const filePath = path.join(process.cwd(),url)
    const contentType = 'text/html';

    fs.readFile(filePath, (error, data) => {
        if (error) return
        
        res.writeHead(200, { 'Content-Type':  contentType })
        res.end(data, 'utf8')
    
    })

}).listen(4000, function () {
    console.log("listen port 4000");
});