import React from 'react';
import './SelectUserType.css';
import { Link } from 'react-router-dom';

const SelectUserType = () => {

    return(
        <div className="usertype-container">
            <div className="utb-container">
                <Link to="/cregister">
                    <div className="u-box type-box">Customer</div>
                </Link>
                <Link to="/vregister">
                    <div className="v-b ox type-box">Vendor</div>
                </Link>
            </div>
        </div>
    )
}

export default SelectUserType;