import React,{ useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
import {listProducts}  from '../JS/actions/productActions'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'






const HomeScreen = ({match}) => {
    const keyword =  match.params.keyword
    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(listProducts(keyword))
     } ,[dispatch,keyword])

     

    return (

        <>
        <h1>latest products</h1>

        {loading ? (<Loader></Loader>) : error ? (<Message variant='danger' >{error}</Message>) : (
        <Row>
            {products.map((product) => (
                <Col key={product._id} sm={12} md={12} lg={6} xl ={4}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
         ) } 
        
        
        </>
    )
}

export default HomeScreen
