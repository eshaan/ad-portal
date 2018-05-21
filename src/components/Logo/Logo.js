import React from 'react';
import { Link } from 'react-router-dom';

import seekLogo from '../../assets/images/seek-logo.png';
import classes from './Logo.css';

const logo = (props) => {
    const routePathVal = props && props.route !== undefined ? props.route : "/";
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <Link to={routePathVal}>
                <img src={seekLogo} alt="SeekAdPortal" />
            </Link>
        </div>
    )
};

export default logo;