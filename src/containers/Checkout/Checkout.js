import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css'
import { config } from '../../config/config'
import Aux from '../../hoc/Aux/Aux';

class Checkout extends Component {
    state = {
        showFinalCost: false,
        finalPrice: 0
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // this.props.history.replace( '/checkout/data' );
        const order = {
            products: this.props.products,
            price: this.props.price
        }
        console.log(order);

        const finalComputedPrice = this.computeFinalOrder(order)

        this.setState({showFinalCost: true, finalPrice: finalComputedPrice});
    }

    computeFinalOrder = (orderDetails) => {
        let totalPrice=0;
        let noOfProductsPurchased = orderDetails.products
        if( !config.discountedCompaniesWithRules[config.currentCompany] ){
            Object.keys(noOfProductsPurchased).forEach(productId => {
                totalPrice += (config.productPrices[productId] * noOfProductsPurchased[productId])
            })
        } else{
            Object.keys(noOfProductsPurchased).forEach(productId => {
                //First we check whether current company is valid for any discount
                if(config.discountedCompaniesWithRules[config.currentCompany][productId]) {
                    // If discount is to be applied, then we check whether the defined rule for min qty of product is less than or equal the 
                    // product purchased quantity.
                    if(config.discountedCompaniesWithRules[config.currentCompany][productId].minQty <= noOfProductsPurchased[productId]) {
                        // Then we check whether the rule to be applied is for some products only i.e. for deals like get 3 for 2
                        // then, we compute price for the no. of items falling in the criteria seperately and price for rest of the items seperately 
                        if(config.discountedCompaniesWithRules[config.currentCompany][productId].type === "xfory"){
                            while(true){
                                // Now we check, that if the defined min qty is greater than the purchased product quantity, then no discount applies
                                // and we simply compute the price by direct multiplication with the base price.
                                if(config.discountedCompaniesWithRules[config.currentCompany][productId].minQty > noOfProductsPurchased[productId]){
                                    totalPrice += (config.productPrices[productId] * noOfProductsPurchased[productId]);
                                    break;
                                }
                                else{
                                    // Otherwise, we apply the discount based on the min quantity of products specified and then subtract the remaining items
                                    // from the purchased items, so that these remaining one's are computed on actual cost.
                                    totalPrice += (config.discountedCompaniesWithRules[config.currentCompany][productId].price * config.discountedCompaniesWithRules[config.currentCompany][productId].minQty)
                                    noOfProductsPurchased[productId] = noOfProductsPurchased[productId] - config.discountedCompaniesWithRules[config.currentCompany][productId].minQty;
                                }
                            }
                            return;
                        }
                        else {
                            // We take out the discounted price applicable for that company and charge for the ads based on that price.
                            totalPrice += (config.discountedCompaniesWithRules[config.currentCompany][productId].price * noOfProductsPurchased[productId])
                            return;
                        }
                    }
                }
                // No. of products not valid for any discount are computed on base rate multiplied by the no. of items purchased.
                totalPrice += (config.productPrices[productId] * noOfProductsPurchased[productId])
            })
        }
        return totalPrice;
    }

    render () {
        let summary = <Redirect to="/" />
        const isDiscountedCompany = this.props.location.state.isDiscounted;
        if ( this.props.products ) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    {this.state.showFinalCost === true ? 
                        <div className={classes.CheckoutAmount}>
                            {this.state.finalPrice < this.props.price ? 
                                <Aux>
                                    <h1 className={classes.Discount}>You got a discount !!</h1>
                                    <h2>The final discounted price is: ${this.state.finalPrice.toFixed(2)}</h2>
                                </Aux> : 
                                <Aux>
                                    {isDiscountedCompany ? <h1 className={classes.NoDiscount}>Unfortunately, there was no discount applicable</h1> : null}
                                    <h2>The final price is: ${this.state.finalPrice.toFixed(2)}</h2>
                                </Aux>}
                        </div> : 
                        <CheckoutSummary
                            isDiscounted={isDiscountedCompany}
                            totalPrice={this.props.price}
                            products={this.props.products}
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler} />}
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        products: state.adsBuilder.products,
        purchased: state.order.purchased,
        price: state.adsBuilder.totalPrice
    }
};

export default connect( mapStateToProps )( Checkout );