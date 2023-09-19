const home = (res) => {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<head><title>Hello</title></head>`);
    res.write(`
            <body>
                <h1>Hello!</h1>
                <h2>Enter your name</h2>
                <form action="/create-user" method="POST">
                    <input type="text" name="name"/>
                    <button type="submit">Submit</button>
                </form>
            </body>
        `);
    res.write(`</html>`);
    res.end();
}

module.exports = home;
