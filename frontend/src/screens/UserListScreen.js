import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {listUsers, deleteUser} from '../JS/actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Table,Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const UserListScreen = ({history}) => {
    const userList = useSelector(state => state.userList)
    const userLogin = useSelector(state => state.userLogin)
    const userDelete = useSelector(state=>state.userDelete)
    const {loading : loadingDelete , error : errorDelete, success : successDelete} = userDelete
    const {userInfo} = userLogin
    const {users , loading , error} = userList
    const dispatch = useDispatch()
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

        
       
    }, [dispatch,history,successDelete,userInfo])

    const deleteHandler =(id)=> {
        if (window.confirm('are you sure you want to delete this user ? ')) {

            dispatch(deleteUser(id))
        }
    }
    return (
        <>
        <h1>Users</h1>
            {loading ? <Loader /> : error ?  <Message variant = 'danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>email</th>
                    <th>Name</th>
                     <th>Admin</th>
                     <th>Edit</th>
                     <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                    {users.map((user)=>(
            <tr key= {user._id}>
                <td>{user._id}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td>{user.name}</td>
                <td>{user.isAdmin ? (<i className='fas fa-check' style={{color : 'green'}}></i>) : (
                    <i className='fas fa-times' style={{color : 'red'}}></i>
                ) }</td>
                <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  </td>
                  <td>
                  <Button className='btn-sm' onClick={()=>{deleteHandler(user._id)}}>
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



export default UserListScreen
