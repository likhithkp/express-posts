const jwt = require('jsonwebtoken');

function isLoggenIn(req, res, next) {
    if (req.cookies.jwtToken === "") return res.send("You must be logged in to view this page");

    try {
        const token = jwt.verify(req.cookies.jwtToken, "secretKey");
        req.user = token;
        next();
    } catch (error) {
        return res.status(401).send("Invalid or expired token");
    }
}

module.exports = isLoggenIn;


