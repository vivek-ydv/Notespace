var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/keys');

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token - No token found" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; // sending user info(payload) in 'request'
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token - Wrong token" });
    }
}

module.exports = fetchuser;