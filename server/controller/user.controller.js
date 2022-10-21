const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
console.log('SECRET', SECRET);

const register = async (req, res) => {
    try {
        const user = new User(req.body);
        const newUser = await user.save();
        console.log('USER CREATED', newUser);
        const userToken = jwt.sign(
        { _id: newUser._id, email: newUser.email, username: newUser.username },
        SECRET,
        );
        console.log('JWT:', userToken);
        res
        .status(201)
        .cookie('userToken', userToken, { expires: new Date(Date.now() + 900000) })
        .json({ successMessage: 'user created', user: newUser });
    } catch (error) {
        console.log('Register ERROR', error);
        res.status(400).json(error);
    }
    };

const login = async (req, res) => {
    const userDocument = await User.findOne({ email: req.body.email });
    console.log('USERDOC', userDocument);
    if (!userDocument) {
        res.status(400).json({ error: 'invalid email/password' });
    } else {
        try {
        const isPasswordValid = await bcrypt.compare(req.body.password, userDocument.password);
        if (!isPasswordValid) {
            res.status(400).json({ error: 'invalid email/password' });
        } else {
            const userToken = jwt.sign(
            { _id: userDocument._id, email: userDocument.email, username: userDocument.username },
            SECRET,
            );
            console.log('JWT:', userToken);
            res
            .status(201)
            .cookie('userToken', userToken, { expires: new Date(Date.now() + 900000) })
            .json({ successMessage: 'user loggedin', user: userDocument });
        }
        } catch (error) {
        console.log('LOGIN ERROR', error);
        res.status(400).json({ error: 'invalid email/password' });
        }
    }
    };

const logout = (req, res) => {
    res.clearCookie('userToken');
    res.json({ successMessage: 'User logged out' });
    };

const getLoggedInUser = async (req, res) => {
    try {
        const user = jwt.verify(req.cookies.userToken, SECRET);
        const currentUser = await User.findOne({ _id: user._id });
        res.json(currentUser);
    } catch (error) {
        res.status(401).json({ error });
    }
};

module.exports = {
    register,
    login,
    logout,
    getLoggedInUser,
};