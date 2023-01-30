const jwt = require('jsonwebtoken');
const config = require('config');

const authChecking = (req, res, next) => {

    // Get token from header
    const token = req.header('x-auth-token');

    if(token){

        try {

            jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
                if (error) {
                    return res.status(401).json({ msg: 'Token is not valid' });
                } else {
                    req.user = decoded.user;
                    next();
                }
            });

        } catch(err){
            console.error(err);
            res.status(500).json({ msg: 'Server Error' });
        }

    } else {
        return res.status(401).json({ msg: 'Access denied! No auth token given' });
    }

}

module.exports = authChecking;