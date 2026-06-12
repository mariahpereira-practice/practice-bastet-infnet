const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/User');
const {Op} = require('sequelize');

class AuthenticationController {
    static async login(req, res) {
        try {
            const {identifier, password} = req.body;

            if (!identifier || !password) {
                return res.status(400).json({message: 'identifier and password are required'});
            }

            if (password.length < 8){
                return res.status(400).json({message: 'Password must be at least 8 characters long'});
            }

            const user = await Users.findOne({where: {
                [Op.or]: [
                    {username: identifier.trim()},
                    {email: identifier.trim()}
                ]
            }});

            if (!user) {
                return res.status(401).json({message: 'User not found'});
            }

            const compareResult = await bcrypt.compare(password, user.password);

            if (!compareResult) {
                return res.status(401).json({message: 'Invalid password'});
            }

            const token = jwt.sign(
                { id: user.id, username: user.username, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    }
}

module.exports = AuthenticationController;