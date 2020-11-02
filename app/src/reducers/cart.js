const cart = (state = [], action) => {
    switch(action.type) {
        case 'GET_CART_INFO':
            return state;
        case 'UPDATE_CART_STATE':
            return action.data;
        default:
            return state;
    }
}

export default cart;