const homePage = require("./home");
const usersPage = require("./users");
const createUserRequestHandler = require("./create-user");

const routeHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        return homePage(res);
    }

    if (url === "/users") {
        return usersPage(res);
    }

    if (url === "/create-user" && method === "POST") {
        return createUserRequestHandler(req, res);
    }
}

module.exports = routeHandler;
