const jwt = require('jsonwebtoken');

function isLoggenIn(req, res, next) {
    if (req.cookies.jwtToken === "") return res.redirect("/login");

    try {
        const token = jwt.verify(req.cookies.jwtToken, "secretKey");
        req.user = token;
        next();
    } catch (error) {
        return res.status(401).send("Invalid or expired token");
    }
}

module.exports = isLoggenIn;


