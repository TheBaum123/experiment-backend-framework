const http = require("http")

let routes = {}

function newRoute(method, route, _callback) {
    method = method.toLowerCase()
    if(routes[route]) {
        routes[route][method] = JSON.stringify(_callback)
    } else {
        routes[route] = {
            [method]: JSON.stringify(_callback)
        }
    }
    routes[route][method] = _callback
}

function listen(port, _callback) {
    const server = http.createServer()

    function notAvailable(method, route, res) {
        res.writeHead(404, {"Content-Type": "text/html"})
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 not available</title>
        </head>
        <body style="overflow: hidden; background-color: black; color: white;">
            <div style="display: flex; align-items: center; justify-content: center; height: 100dvh; font-size: 2.5rem; font-family: monospace, system-ui;">can not ${method} "${route}"</div>
        </body>
        </html>`)
        res.end()
    }

    server.on("request", (req, res) => {
        const route = req.url
        const method = req.method.toLowerCase()
        if(routes[route]) {
            if(routes[route][method]) {
                res["json"] = function(json) {
                    res.writeHead(200, {"Content-Type": "application/json"})
                    res.write(JSON.stringify(json))
                }
                res["html"] = function(html) {
                    res.writeHead(200, {"Content-Type": "text/html"})
                    res.write(html)
                }
                res["text"] = function(text) {
                    res.writeHead(200, {"Content-Type": "text/plain"})
                    res.write(text)
                }
                res["send"] = function() {
                    res.end()
                }
                routes[route][method](req, res)
                res.end()
            } else {
                notAvailable(method, route, res)
            }
        } else {
            notAvailable(method, route, res)
        }
    })

    server.listen(port, _callback(server))
}

module.exports = { newRoute, listen }