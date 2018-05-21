import React from 'react';

import classes from './SeekAdProduct.css';

const seekAdProduct = ( props ) => {
    let transformedProducts = Object.keys( props.products )
        .map( prodKey => {
            return <div key={prodKey} type={prodKey} className={classes.Capitalize}>{prodKey} Ads: {props.products[prodKey]}</div>;
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    
    return (
        <div className={classes.SeekAdProduct}>
            {transformedProducts}
            <br/>
            Total Price : ${props.totalPrice.toFixed(2)}
        </div>
    );
};

export default seekAdProduct;