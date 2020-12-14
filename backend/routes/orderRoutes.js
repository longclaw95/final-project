const express = require('express')
const router = express.Router()
const {addOrderItems,getOrderById,getMyorders, getOrders, updateOrderToDelivered, updateOrderToPaid} = require('../controllers/orderControllers')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')



router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyorders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)
router.route('/:id/pay').put(protect,updateOrderToPaid)

module.exports = router