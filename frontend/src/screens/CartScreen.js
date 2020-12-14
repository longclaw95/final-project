import React,{useEffect} from 'react'
import {Row,Col,ListGroup,Image,Form, Button,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {addToCart,removeFromCart} from '../JS/actions/cartActions'
import Message from '../components/Message'

const CartScreen = ({match, history , location}) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addToCart(productId,qty))
    }, [dispatch, productId, qty])

    

    

    const removeFromCartHandler=(id)=> {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler=()=> {
        history.push(`/login?redirect=shipping`)
    }

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
      

    return (
        <>
        
        <h1>My Cart </h1>
        <Row>
            
            <Col md={9}>
                
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key = {item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>
                                <Form.Control as='select' value={item.qty}
                                onChange={(e)=> {dispatch(addToCart(item.product,Number(e.target.value)))}}>
                                {

                                [...Array(item.countInStock).keys()].map(x=>(
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                ))
                                
                                }
                            </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button variant='light' type ='button'
                                    onClick={()=> removeFromCartHandler(item.product)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                    
            </Col>
            <Col md ={3}>
                <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>subtotal ({cartItems.reduce((acc,item)=> acc + item.qty, 0)}) of Items</h2>
                        $ ({cartItems.reduce((acc,item)=> acc + item.price *item.qty, 0).toFixed(3)})
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className='btn-block' type ='button'
                            disabled = {cartItems.length ===0}
                            onClick={checkoutHandler}
                        >
                            Proceed to shipping
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
                </Card>
            </Col>
            
        </Row>
        </>
    )
}


export default CartScreen
