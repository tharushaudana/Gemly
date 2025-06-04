const jwt = require('jsonwebtoken');

function authMiddleware(type) {
    return function (req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ error: 'No token provided' });

        const token = authHeader.split(' ')[1]; // "Bearer <token>"
        if (!token) return res.status(401).json({ error: 'Token missing' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (type !== 'any' && type !== decoded.type) {
                return res.status(403).json({ error: 'Forbidden: Invalid token type' });
            }

            req.user = decoded; // attach user info if needed
            next();
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }
}

module.exports = authMiddleware;