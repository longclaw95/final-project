const User = require('../models/userModel')
const asyncHander = require('express-async-handler')
const generateToken = require('../utils/generateToken')

const AuthUser = asyncHander(async (req,res,next)=>{
    const {email , password} = req.body 
    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password)))
        { 
            
                res.json({
                _id : user._id,
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                token : generateToken(user._id)
            })
        }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


const RegisterUser = asyncHander(async (req,res,next)=>{
    const {name, email , password} = req.body 
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('user already exists')
    }

    const user = await User.create(req.body)

    if(user) {
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            password : user.password,
            token : generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid user Data')
    }
    
})


const getUserProfile = asyncHander(async (req,res)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('not found')
    }
    
})


const updateUserProfile = asyncHander(async (req,res)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
    
    const updatedUser = await user.save()
    res.json({
        _id : updatedUser._id,
        name : updatedUser.name,
        email : updatedUser.email,
        isAdmin : updatedUser.isAdmin,
        token : generateToken(updatedUser._id),
    })
    } else {
        res.status(404)
        throw new Error('not found')
    }
    
})

const getUsers = asyncHander(async (req,res)=>{
    const users = await User.find()
    res.json(users)
})


const deleteUser = asyncHander(async (req,res)=>{
    const user = await User.findById(req.params.id)
    if (user) {
        user.remove()
        res.json({message : 'user removed'})
    } else {
        res.status(404)
        throw new Error('user not found')
    }
})

const updateUser = asyncHander(async(req,res)=>{

    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin 
    
    const updatedUser = await user.save()
    res.json({
        _id : updatedUser._id,
        name : updatedUser.name,
        email : updatedUser.email,
        isAdmin : updatedUser.isAdmin,
        
    })
    } else {
        res.status(404)
        throw new Error('not found')
    }
})

const getUserById = asyncHander(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('user not found')
    }
})

module.exports = {RegisterUser,AuthUser,getUserProfile,updateUserProfile,getUsers,deleteUser,getUserById,updateUser}