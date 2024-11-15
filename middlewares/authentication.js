const jwt = require('jsonwebtoken');

function isLoggenIn(req, res, next) {
    if(req.cookies.jwtToken === "") return res.send("You must be logged in to view this page");
    let token = jwt.verify(req.cookies.jwtToken, "secretKey");
    req.user = token;
    next();
}

module.exports = isLoggenIn;
