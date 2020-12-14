const express = require('express')
const router = express.Router()

const {getProductById,getProducts, deleteProduct, updateProduct, createProduct, updateProductReview} =require('../controllers/productControllers')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')


router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
router.route('/:id/reviews').put(protect,updateProductReview)



module.exports = router