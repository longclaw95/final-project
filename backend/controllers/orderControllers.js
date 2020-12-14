const asyncHandler = require('express-async-handler')
const { populate } = require('../models/orderModel')
const Order = require('../models/orderModel')

const addOrderItems = asyncHandler(async(req,res)=>{

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length ===0) {
        res.status(400)
        throw new Error('no Order Items')
        return 
    } else {
        const order = new Order({
            orderItems,
            user : req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})


const getOrderById = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('order not found')
    }
})

const getMyorders = asyncHandler(async (req,res)=>{
    const orders = await Order.find({user : req.user._id})
    res.json(orders)
    
})

const getOrders = asyncHandler(async (req,res)=>{
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
    
})

const updateOrderToDelivered = asyncHandler(async(req,res)=> {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

    
})

const updateOrderToPaid = asyncHandler(async(req,res)=> {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

    
})

module.exports = {addOrderItems,getOrderById, getMyorders, getOrders, updateOrderToDelivered,updateOrderToPaid}