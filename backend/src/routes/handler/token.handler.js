const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY_ENCRYPT;

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
      } catch (error) {
        return null;
    }
}

const verifyTokenHadler = async(req, res, next) =>{
    const token = req.headers.authorization.split(' ')[1];
    
    const decoded = verifyToken(token);

    if(!decoded){
        return res.status(401).json({message:'token invalid'});
    }

    req.user = decoded;
    next();
}


module.exports = { verifyTokenHadler } ;