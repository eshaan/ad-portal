import React from 'react';

import classes from './SeekAdControls.css';
import SeekAdControl from './SeekAdControl/SeekAdControl';

const controls = [
    { label: 'Classic Ad', type: 'classic' },
    { label: 'Standout Ad', type: 'standout' },
    { label: 'Premium Ad', type: 'premium' }
];

const seekAdControls = (props) => (
    <div className={classes.SeekAdControls}>
        <p className={classes.WelcomeText}>You can use this portal to purchase ad packages from Seek.</p>
        {controls.map(ctrl => (
            <SeekAdControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.adAdded(ctrl.type)}
            removed={() => props.adRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]} />
        ))}
        {props.price > 0 ? <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p> : null}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>CHECKOUT</button>
    </div>
);

export default seekAdControls;