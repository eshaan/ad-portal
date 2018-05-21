import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import SeekAdControls from '../../components/SeekAdProducts/SeekAdControls/SeekAdControls';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import { config } from '../../config/config';
import classes from './SeekAdPortal.css';

class SeekAdPortal extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitAds();
    }

    updatePurchaseState ( products ) {
        const sum = Object.keys( products )
            .map( prodKey => {
                return products[prodKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        // this.props.history.push('/checkout');
        let isDiscounted = config.discountedCompaniesWithRules[config.currentCompany] ? true : false
        this.props.history.push({
            pathname: '/checkout',
            state: {
                isDiscounted: isDiscounted
            }
        })
    }

    render () {
        const disabledInfo = {
            ...this.props.products
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let adsControlDash = this.props.error ? <p>Ads can't be loaded at this time</p> : <Spinner />;

        if ( this.props.products ) {
            adsControlDash = (
                <SeekAdControls
                    adAdded={this.props.onAdAdded}
                    adRemoved={this.props.onAdRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.products)}
                    ordered={this.purchaseContinueHandler}
                    price={this.props.price} />
            );
        }
        return (
            <Aux>
                <div className={classes.Welcome}>Welcome {config.currentCompany !== 'default' ? config.currentCompany : ''}</div>
                {adsControlDash}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.adsBuilder.products,
        price: state.adsBuilder.totalPrice,
        error: state.adsBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAdAdded: (prodName) => dispatch(actions.addSeekProduct(prodName)),
        onAdRemoved: (prodName) => dispatch(actions.removeSeekProduct(prodName)),
        onInitAds: () => dispatch(actions.initSeekProducts()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( SeekAdPortal, axios ));