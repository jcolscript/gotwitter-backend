const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config');

module.exports = {
    async index(req, res) {
        try {           

        } catch (error) {
            console.log(error);
        }
    },

    async store(req, res) {
        try {
            const {name, email, username, password} = req.body.userData;

            const hash = bcrypt.hashSync(password, config.SALT_ROUDS);
            const userDataInsert = {
                name,
                email,
                username,
                hash
            }
            const user = await User.create(userDataInsert);
            return res.json({
                sucess: true,
                message: 'user registered'
            });
        } catch (error) {
            console.error(error);
        }
    },
};