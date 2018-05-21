import React from 'react';

import SeekAdProduct from '../SeekAdProducts/SeekAdProduct';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    let discountedText = 'Hey, it seems we could offer you a discount. Click CONTINUE to check your final price.';
        
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Here's a review of what you ordered</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <SeekAdProduct products={props.products} totalPrice={props.totalPrice}/>
            </div>
            {props.isDiscounted ? <p>{discountedText}</p> : null}
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>{props.isDiscounted ? 'CONTINUE' : 'ORDER NOW'}</Button>
        </div>
    );
}

export default checkoutSummary;