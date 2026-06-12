const Users = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addUser = async (req, res) => {
    try {
        const { username, password, name, email, age, phoneNumber, country } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        if (username.trim() === '') {
            return res.status(400).json({ message: 'Username cannot be empty' });
        }

        const usersWithSameUsername = await Users.findAll({ where: { username: username.trim() } });
        if (usersWithSameUsername.length > 0) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const userswithSameEmail = await Users.findAll({ where: { email } });
        if (userswithSameEmail.length > 0) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        if (!checkPassword(password)) {
            return res.status(400).json({ message: 'Password is invalid' });
        }
        
        const user = await Users.create({ 
            username: username.trim(), 
            password, 
            name, 
            email, 
            age, 
            phoneNumber, 
            country 
        });
        res.status(201).json(
            user
        );
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
};

function checkPassword(password) {
    const minimumLength = password.length >= 8;
    const numberCheck = /\d/.test(password);
    const letterCheck = /[a-zA-Z]/.test(password);

    return minimumLength && numberCheck && letterCheck;
}

module.exports = {
    getUsers,
    addUser
};