const users = (res) => {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>`);
    res.write(`<head><title>Users</title></head>`);
    res.write(`
            <body>
                <h1>Users</h1>
                <ul>
                    <li>John Dope</li>
                    <li>Some User</li>
                    <li>Another User</li>
                    <li>Another User</li>
                </ul>
            </body>
        `);
    res.write(`</html>`);
    res.end();
}

module.exports = users;
