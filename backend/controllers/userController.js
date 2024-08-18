const asyncHandler = require('express-async-handler');
const User = require('../models/userMode');
const generateToken = require('../config/generateToken');


const registerUser = asyncHandler( async(req, res) => {
    const { name, email, password, pic } = req.body
    
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please enter all required fields")
    }

    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error("User already exists")
    }
    const user = await User.create({
        name, email, password, pic
    })

    if (user ) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token : generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email})

    if (user && (await user.matchpassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid username or password")
    }

})

module.exports = {registerUser, authUser}