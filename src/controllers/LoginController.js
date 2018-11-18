const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res, next) {
        const {username, password} = req.body.userData

        if(username === undefined || password === undefined){
            res.status(401).json({
                success: false,
                code: 'GOERROR_LNV_ERROR_01',
                message: 'username and/or password invalid'
            });
        }else{
            getUserData = await User.findOne({username});
            if(getUserData === null){
                res.status(401).json({
                    success: false,
                    code: 'GOERROR_LNV_ERROR_02',
                    message: 'username and/or password invalid'
                });
            }else{
                const hashCompare = bcrypt.compareSync(password, getUserData.hash);
                if(hashCompare){
                    let tokenData = {
                        username: getUserData.username,
                        name: getUserData.name
                    }
            
                    let generatedToken = jwt.sign(tokenData, config.JWT_KEY, {expiresIn: '1m'});
            
                    return res.json({
                        success: true,
                        token: generatedToken
                    });
                }else{
                    res.status(401).json({
                        success: false,
                        code: 'GOERROR_LNV_ERROR_02',
                        message: 'username and/or password invalid'
                    });
                }
            }
        }
    }
};