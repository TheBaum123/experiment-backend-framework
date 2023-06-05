const framework = require("./framework")

const port = 3000

framework.newRoute("GET", "/test", (req, res) => {
    res.text("test")
})

framework.newRoute("GET", "/json", (req, res) => {
    res.json({
        "key": "value",
        "this": {
            "can": ["handle", "json"]
        }
    })
})

framework.newRoute("GET", "/html", (req, res) => {
    res.html(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>html</title>
    </head>
    <body style="overflow: hidden; background-color: black; color: white;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100dvh; font-size: 2.5rem; font-family: monospace, system-ui; flex-direction: column; padding-left: 10vw; padding-right: 10vw; text-align: center;"><p>this framework can also send html!<p><p>and you can set custom responses with res.writeHead(statusCode, {"Content-Type": "&lt;content-type&gt;"}) and res.write() just like in the http package aswell!</p></div>
    </body>
    </html>`)
})

framework.listen(port, server => console.log("listening on port " + port))