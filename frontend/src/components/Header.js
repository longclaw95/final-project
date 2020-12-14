import React from 'react'
import {Route} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav,Container,NavDropdown} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../JS/actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
    const  userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const  dispatch = useDispatch()
    const LogoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant ='dark'expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Ecommerce</Navbar.Brand>
                    </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Route render={({history})=><SearchBox  history={history}/>} />
                <Nav className="ml-auto">
                    <LinkContainer to='/cart'>
                    <Nav.Link><i className='fas fa-shopping-cart'></i>cart</Nav.Link>
                    </LinkContainer>
                    {userInfo ? (
                        <NavDropdown title={userInfo.name} id="username">
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={LogoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to='/login'>
                    <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
                    </LinkContainer>
                    )}

                    {userInfo && userInfo.isAdmin  && (
                        <NavDropdown title='admin' id="adminmenu">
                        <LinkContainer to='/admin/userList'>
                            <NavDropdown.Item>users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/productList'>
                            <NavDropdown.Item>products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderList'>
                            <NavDropdown.Item>orders</NavDropdown.Item>
                        </LinkContainer>
                        </NavDropdown>
                        )}
                    
                    
                </Nav>
                
                </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header
