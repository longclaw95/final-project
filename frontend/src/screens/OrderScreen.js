import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails,deliverOrder, PayOrder } from '../JS/actions/orderActions'
import {ORDER_DELIVER_RESET, ORDER_PAY_RESET} from '../JS/constants/orderConstants'

const OrderScreen = ({ match }) => {

 const orderId = match.params.id 
 const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  
  const  dispatch = useDispatch()

  const orderDetails = useSelector(state=>state.orderDetails)
  const {error, loading , order} = orderDetails

  const orderDeliver = useSelector(state=>state.orderDeliver)
  const {error : errorDeliver, loading : loadingDeliver , success:successDeliver} = orderDeliver

  const orderPay = useSelector(state=>state.orderPay)
  const {error : errorPay, loading : loadingPay , success:successPay} = orderPay

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  
if (! loading) {
    order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
}

  

  useEffect(()=>{
      if(!order || successDeliver || successPay || order._id !== orderId) {
        dispatch({type : ORDER_DELIVER_RESET})
        dispatch({type : ORDER_PAY_RESET})
        dispatch(getOrderDetails(orderId))
      }
      
  }, [dispatch,orderId,order,successDeliver,successPay])

  const deliverHandler=()=>{
    dispatch(deliverOrder(order))
  }

  const PayHandler=()=> {
    dispatch(PayOrder(order))
  }

  return(
    loading ? <Loader/> : error ? (<Message variant='danger'>{error}</Message>) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>{order.user.name} 
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address}{' '}
                    {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode}{' '}
                    {order.shippingAddress.country}{' '}
                    
    <p>{order.isDelivered ? (<Message variant='success'>delivered at {order.deliveredAt}</Message>) : (<Message variant='danger'>not delivered</Message>)}</p>
                  </p>
                  
                </ListGroup.Item>
    
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
    <p>{order.isPaid ?(<Message variant='success'> paid at {order.paidAt}</Message>) :(<Message variant='danger'>not paid</Message>)}</p>
                </ListGroup.Item>
    
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {loadingPay && <Loader />}  
                  {userInfo &&
                !userInfo.isAdmin &&
                
                !order.isPaid&& (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={PayHandler}
                    >
                      Pay
                    </Button>
                {errorPay && <Message variant='danger'>{errorPay}</Message>}
                  </ListGroup.Item>
                )}
               {loadingDeliver && <Loader />}   
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                {errorDeliver && <Message variant='danger'>{errorDeliver}</Message>}
                  </ListGroup.Item>
                )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
       </>
      )
  )
    }



export default OrderScreen