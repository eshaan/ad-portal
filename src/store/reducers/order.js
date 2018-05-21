import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    purchased: false
};

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PURCHASE_INIT: return purchaseInit( state, action );
        default: return state;
    }
};

export default reducer;