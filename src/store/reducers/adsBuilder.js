import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { config } from '../../config/config';

const initialState = {
    products: null,
    totalPrice: 4,
    error: false
};

const addSeekProduct = ( state, action ) => {
    const updatedProduct = { [action.productName]: state.products[action.productName] + 1 }
    const updatedProducts = updateObject( state.products, updatedProduct );
    const updatedState = {
        products: updatedProducts,
        totalPrice: state.totalPrice + config.productPrices[action.productName]
    }
    return updateObject( state, updatedState );
};

const removeSeekProduct = (state, action) => {
    const updatedProd = { [action.productName]: state.products[action.productName] - 1 }
    const updatedProds = updateObject( state.products, updatedProd );
    const updatedSt = {
        products: updatedProds,
        totalPrice: state.totalPrice - config.productPrices[action.productName]
    }
    return updateObject( state, updatedSt );
};

const setSeekProducts = (state, action) => {
    return updateObject( state, {
        products: {
            classic: action.products.classic,
            standout: action.products.standout,
            premium: action.products.premium
        },
        totalPrice: 0,
        error: false
    } );
};

const fetchSeekProductsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_SEEK_PRODUCT: return addSeekProduct( state, action );
        case actionTypes.REMOVE_SEEK_PRODUCT: return removeSeekProduct(state, action);
        case actionTypes.SET_SEEK_PRODUCTS: return setSeekProducts(state, action);    
        case actionTypes.FETCH_SEEK_PRODUCTS_FAILED: return fetchSeekProductsFailed(state, action);
        default: return state;
    }
};

export default reducer;