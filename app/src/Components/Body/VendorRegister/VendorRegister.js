import React from 'react';
import './VendorRegister.css';


const VendorRegister = () => {

    return(
        <div id="vendor-register">
            <h2>Register Account</h2>
            <p>If you already have an account with us, please login at the login page.</p>
            <fieldset id="account">
                <legend>Your Personal Details</legend>
                <div className="form-group">
                    <label className="control-label">Vendor Name</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="Vendor Name   "></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">Bla</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="Bla"></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">BlaBlaBla</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="BlaBlaBla"></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">BlaBla</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="BlaBla"></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">First Name</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="First Name"></input>
                    </div>
                </div>
            </fieldset>
            <fieldset id="account">
                <legend>Your Address</legend>
                <div className="form-group">
                    <label className="control-label">Vendor Name</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="Vendor Name   "></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">Bla</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="Bla"></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">BlaBlaBla</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="BlaBlaBla"></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">BlaBla</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="BlaBla"></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">First Name</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="First Name"></input>
                    </div>
                </div>
            </fieldset>
            <fieldset id="account">
                <legend>Your Password</legend>
                <div className="form-group">
                    <label className="control-label">Password</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="Password"></input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">Password Confirm</label>
                    <div className="form-text-input">
                        <input className="form-control" type="text" name="firstname" placeholder="Password Confirm"></input>
                    </div>
                </div>
            </fieldset>
            <div className="form-btn-container">
                <div className="form-btn btn">Continue</div>
            </div>
        </div>
    )
}

export default VendorRegister;