import { CART_ADD_ITEM, CART_REMOVE_ITEM , CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADRESS, CART_RESET_ITEMS} from "../constants/cartConstants";


// const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems')) ?
//     JSON.parse(localStorage.getItem('carItems')) : []
    
const initialState ={
    cartItems : [],
    shippingAddress: {}
}

export const cartReducer = (state = initialState, action) => {

    switch (action.type) {

        case CART_ADD_ITEM:

            const item = action.payload
            
            const existItem = state.cartItems.find(x=> x.product === item.product)

            if (existItem) {
                return {...state,
                cartItems : state.cartItems.map(x=> x.product === item.product ? item : x)
                }
            }
            else {
                return {...state, cartItems : [...state.cartItems,item]}
            }
            
            
           
            
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            }
            case CART_SAVE_SHIPPING_ADRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
            case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }

        case CART_RESET_ITEMS :
            return initialState

        default:
            return state ; 
    }

}