import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updatePassword } from "../../../util/ProfileRequests";
import Alert from "react-s-alert";

class PasswordSettings extends Component {

    constructor (props) {
        super (props);
        this.state = {
            currentPassword: '',
            confirmPassword: '',
            newPassword: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSavePassword = this.handleSavePassword.bind(this);
    }

    handleInputChange (event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    handleSavePassword() {
        let newPassword = {
            userId: this.props.currentProfileId,
            currentPassword: this.state.currentPassword,
            confirmPassword: this.state.confirmPassword,
            newPassword: this.state.newPassword
        };
        updatePassword(this.props.currentProfileId, newPassword)
            .then(response => {
                Alert.success(response);
            })
            .catch(error => {
                Alert.success(error);
            });
    }

    render() {
        return (
            <div className="row mt-3">
                <div className="col">
                    <h5>Password changing</h5>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label id="labelCurrentPass">Current password</label>
                            <input type="password" name="currentPassword" maxLength="20"
                                   className="form-control form-control-sm"
                                   value={this.state.currentPassword}
                                   onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label id="labelPass" >New password</label>
                            <input type="password" name="newPassword" maxLength="20"
                                   className="form-control form-control-sm"
                                   placeholder="6-20"
                                   value={this.state.newPassword}
                                   onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label id="labelConfirmPass">Confirm new
                                password</label>
                            <input type="password" name="confirmPassword" maxLength="20"
                                   className="form-control form-control-sm"
                                   value={this.state.confirmPassword}
                                   onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button  className="btn btn-primary" onClick={this.handleSavePassword}>Save</button>
                        <Link to={'/profiles/' + this.props.currentProfileId}  className="btn btn-secondary">Back</Link>
                    </div>
                    <br/>
                </div>
            </div>
        );
    }
}

export default PasswordSettings;