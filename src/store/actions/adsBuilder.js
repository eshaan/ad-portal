import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addSeekProduct = ( name ) => {
    return {
        type: actionTypes.ADD_SEEK_PRODUCT,
        productName: name
    };
};

export const removeSeekProduct = ( name ) => {
    return {
        type: actionTypes.REMOVE_SEEK_PRODUCT,
        productName: name
    };
};

export const setSeekProducts = ( products ) => {
    return {
        type: actionTypes.SET_SEEK_PRODUCTS,
        products: products
    };
};

export const fetchSeekProductsFailed = () => {
    return {
        type: actionTypes.FETCH_SEEK_PRODUCTS_FAILED
    };
};

export const initSeekProducts = () => {
    return dispatch => {
        axios.get( '/products.json' )
            .then( response => {
               dispatch(setSeekProducts(response.data));
            } )
            .catch( error => {
                dispatch(fetchSeekProductsFailed());
            } );
    };
};