import React from 'react';

import classes from './SeekAdControl.css';

const buildControl = (props) => (
    <div className={classes.SeekAdControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.Remove} 
            onClick={props.removed} 
            disabled={props.disabled}>Remove</button>
        <button 
            className={classes.Add} 
            onClick={props.added}>Add</button>
    </div>
);

export default buildControl;