const securityService = require('../services/security.service');
const bcrypt = require('bcrypt');
const { parse } = require('dotenv');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY_ENCRYPT;

const login = async(req,res) => {
    const {user_email , user_pass} = req.body;

    const user = await securityService.getUser(user_email);
    
    if(!user){
        return res.status(401).json({ message:'User or pass not valid'});
    }

    const validPassword = await comparePassword(user_pass, user.hash_password);

    if(!validPassword){
        return res.status(401).json({ message:'User or pass not valid'});
    }

    const token = generateToken(user);
    res.json({token});
}

const comparePassword = async(plain_password, hashed_password) => {
    return await bcrypt.compare(plain_password, hashed_password,);
}

const generateToken = (user)=>{
    return jwt.sign({
        id: user.user_id,
        email: user.user_email}, 
        secretKey,
        {expiresIn: '1h'});
}

const register = async(req, res) => {
    const { user_name,user_email, user_pass, agree_terms } = req.body;

    const salt = await bcrypt.genSalt();
    
    const hash_pass = await bcrypt.hash(user_pass, salt);

    console.log(hash_pass);

    var result = await securityService.addUser(user_name,user_email, hash_pass, agree_terms);

    return res.send(result);
}


const getUser = async(req, res) =>{
    const { user_email } = req.query;

    //si gustas puedes agregar validación de token de usuario para evitar consultar por otros usuario del sistema
    const user = req.user;

    if(user.email !== user_email){
        //TODO : here put your logic and change de body logic
        console.log('request not allowed');
    }

    const result = await securityService.getUser(user_email);
    return res.send(result);
}

const getUserProtected = async(req, res) =>{
    //si gustas puedes agregar validación de token de usuario para evitar consultar por otros usuario del sistema
    const user = req.user;

    const result = await securityService.getUser(user.email);
    return res.send(result);
}



module.exports = { login, register , getUser, getUserProtected};


