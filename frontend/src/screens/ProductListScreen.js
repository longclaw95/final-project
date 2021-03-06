import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {listProducts,deleteProduct,createProduct} from '../JS/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Table,Button,Row ,Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {PRODUCT_CREATE_RESET,PRODUCT_DETAILS_RESET} from '../JS/constants/productConstants'


const ProductListScreen = ({history , match}) => {

    const productList = useSelector(state => state.productList)
    const {products , loading , error} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {success : successDelete , loading : loadingDelete , error : errorDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {success : successCreate , loading : loadingCreate , error : errorCreate, product : createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    const dispatch = useDispatch()
    useEffect(() => {
        
        dispatch({type : PRODUCT_CREATE_RESET})

        if (! userInfo.isAdmin) {
            history.push('/login')
        }
        
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
            
        }

        
       
    }, [dispatch,history,userInfo,successDelete,successCreate,createdProduct])

    const deleteHandler =(id)=> {
        if (window.confirm('are you sure you want to delete this product ? ')) {

            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler =()=> {
        

            dispatch(createProduct())
        
    }
    return (
        <>
        <Row className='aligh-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler} ><i className='fas fa-plus'></i> Create Product</Button>
            </Col>
        </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? <Loader /> : error ?  <Message variant = 'danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                     <th>Category</th>
                     <th>Brand</th>
                     <th>Edit</th>
                     <th>Delete</th>
                     
                </tr>
            </thead>
            <tbody>
                    {products.map((product)=>(
            <tr key= {product._id}>
                <td>{product._id}</td>
                
                    <td>{product.name}</td>
                <td>{product.price} </td>
                <td>{product.category} </td>
                <td>{product.brand} </td>

                <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm' onClick={()=>{dispatch({type : PRODUCT_DETAILS_RESET})}}>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  </td>
                  <td>
                  <Button className='btn-sm' onClick={()=>{deleteHandler(product._id)}}>
                    <i className='fas fa-trash'></i>
                  </Button>

                  </td>
                
            </tr>
))

}
            </tbody>
        </Table>
        
            
        
            )}
</>
    )}



export default ProductListScreen
