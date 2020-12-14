import React, {useState} from 'react'
import FormContainer from '../components/FormContainer'
import { Form , Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {saveShippingAddress} from '../JS/actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


const ShippingScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart
    const [address, setAdress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
    return (
        
        <FormContainer>
            <h1>Shipping</h1>
            <CheckoutSteps step1 step2 />
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='Adress'>
                    <Form.Label>Adress</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        onChange={(e) => setAdress(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='City'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='PostalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Postal Code'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    

                    <Form.Group controlId='Country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Confirm password'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                    Continue
                    </Button>
                </Form>

      
        </FormContainer>
    )
}

export default ShippingScreen
