import React, {useState,useEffect} from 'react'
import FormContainer from '../components/FormContainer'
import {Link} from 'react-router-dom'
import { Form , Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProductDetails,updateProduct} from '../JS/actions/productActions'
import { PRODUCT_EDIT_RESET } from '../JS/constants/productConstants'
import axios from 'axios'



const ProductEditScreen = ({match,history}) => {
    const productId = match.params.id
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    

    
    const productDetails = useSelector(state => state.productDetails)
    const {product,loading,error} = productDetails

    const productEdit = useSelector(state => state.productEdit)
    const {error : errorEdit ,loading : loadingEdit,success : successEdit} = productEdit

    

    useEffect(()=>{

            if (successEdit) {
                dispatch({type : PRODUCT_EDIT_RESET})
                history.push('/admin/productList')
            } else {
                if(!product.name || product._id !== productId) {
            
                    dispatch(listProductDetails(productId))
                } else {
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                }
            }
            
         
        
    },[dispatch,product,history,productId,successEdit])

    const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)
  
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
  
        const { data } = await axios.post('/api/upload', formData, config)
  
        setImage(data)
        setUploading(false)
      } catch (error) {
        console.error(error)
        setUploading(false)
      }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id : productId,
            name,price,brand,image,category,description,countInStock
        }))
    }
    
    return (
        <>
        <Link to='/admin/productList' className='btn btn-light my-3'>Go back</Link>
        <FormContainer>
      <h1>Edit Product</h1>
      {loadingEdit && <Loader/>}
        {errorEdit && <Message variant='danger'>{errorEdit}</Message>}
      {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId='price'>
              <Form.Label>Price : </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId='image'>
            <Form.Label>Image :</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}

            </Form.Group>

            <Form.Group controlId='brand'>
            <Form.Label>Brand :</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
              
            </Form.Group>

            <Form.Group controlId='category'>
            <Form.Label>Category :</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
              
            </Form.Group>

            <Form.Group controlId='count In Stock'>
            <Form.Label>Stock items :</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter number of Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
              
            </Form.Group>

            <Form.Group controlId='Description'>
            <Form.Label>Description :</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
              
            </Form.Group>
    
            
    
            <Button type='submit' variant='primary'>
              update
            </Button>
          </Form>
      )}
      

    </FormContainer>
        </>
        
    )
}

export default ProductEditScreen





