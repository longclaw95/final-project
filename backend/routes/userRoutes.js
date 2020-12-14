const express = require('express')
const router = express.Router()
const {RegisterUser,AuthUser,getUserProfile,updateUserProfile,getUsers, deleteUser, getUserById,updateUser} = require('../controllers/userControllers')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')


router.post('/login',AuthUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/').post(RegisterUser)
router.get('/',protect,admin,getUsers)
router.delete('/:id', protect,admin,deleteUser)
router.get('/:id',protect,admin,getUserById)
router.put('/:id',protect,admin,updateUser)

module.exports = router