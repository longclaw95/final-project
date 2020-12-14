import React, {useState,useEffect} from 'react'
import FormContainer from '../components/FormContainer'
import {Link} from 'react-router-dom'
import {Row, Col , Form , Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, updateUser} from '../JS/actions/userActions'
import {USER_UPDATE_RESET} from '../JS/constants/userConstants'

const UserEditScreen = ({match,history}) => {
    const userId = match.params.id
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    

    
    const userDetails = useSelector(state => state.userDetails)
    const {user,loading,error} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {success : successUpdate,loading : loadingUpdate,error : errorUpdate} = userUpdate

    useEffect(()=>{
         if (successUpdate) {
             dispatch({type : USER_UPDATE_RESET })
            history.push('/admin/userList')
         } else {
            if(!user.name || user._id !== userId) {
            
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
         }
        
    },[dispatch,user,history,userId,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id : userId , name , email, isAdmin}))
    }
    
    return (
        <>
        <Link to='/admin/userList' className='btn btn-light my-3'>Go back</Link>
        <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
    
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId='isAdmin'>
              
              <Form.Check
                type='checkbox'
                label = 'is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen





