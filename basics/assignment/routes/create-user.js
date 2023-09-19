const createUser = (req, res) => {
    const body = [];

    req.on("data", (chunk) => {
        body.push(chunk);
    });

    return req.on("end", () =>  {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split("=")[1];

        console.log(message);

        res.statusCode = 302;
        res.setHeader("Location", "/users")

        return res.end();
    })
}

module.exports = createUser;
