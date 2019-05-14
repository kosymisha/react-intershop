import React, { Component } from 'react';
import {getProfile, updateProfile} from "../../../util/ProfileRequests";
import {NO_AVATAR_URL} from "../../../constants";
import {deleteFileProfile, uploadFileProfile} from "../../../util/FileRequests";
import Alert from "react-s-alert";
import {Link} from "react-router-dom";

class UserInfoSettings extends Component {

    constructor (props) {
        super (props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            photoURL: '',
            selectedPhotoURL: { name: 'no file selected' },
            previewPhotoURL: ''
        };

        this.loadProfile = this.loadProfile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDeleteSelectedPhoto = this.handleDeleteSelectedPhoto.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
    }

    loadProfile() {
        getProfile(this.props.currentProfileId)
            .then(response => {
                this.setState({
                    id: response.id,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                    photoURL: response.photoURL,
                    previewPhotoURL: response.photoURL,
                    selectedPhotoURL: { name: response.photoURL }
                });
            });
    }

    componentDidMount() {
        this.loadProfile();
    }

    handleInputChange (event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    handleDeleteSelectedPhoto () {
        this.setState({
            selectedPhotoURL: { name: 'no file selected' },
            previewPhotoURL: NO_AVATAR_URL
        });
    }

    handleSubmit () {
        let newProfile = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
        };
        updateProfile(this.state.id, newProfile)
            .then(response => {
                if (this.state.selectedPhotoURL.name === 'no file selected') {
                    deleteFileProfile(this.state.id)
                        .then(() => {
                            Alert.success("Photo updated.");
                        });
                } else if (this.state.photoURL !== this.state.selectedPhotoURL.name) {
                    let data = new FormData();
                    data.append('file', this.state.selectedPhotoURL, this.state.selectedPhotoURL.name);
                    uploadFileProfile(this.state.id, data)
                        .then(() => {
                            Alert.success("Photo updated.");
                        });
                }
                this.setState({
                    id: response.id,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                });
                Alert.success("Profile updated.");
            });
    }

    handleInputFileChange(event) {
        if (event.target.files[0] !== undefined)
            this.setState({
                selectedPhotoURL: event.target.files[0],
                previewPhotoURL: URL.createObjectURL(event.target.files[0]),
            });
    }

    render() {
        return(
            <div className="row mt-3">
                <div className="col">
                    <h5>User info</h5>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>First name</label>
                            <input type="text" name="firstName" maxLength="20" className="form-control"
                                   onChange={this.handleInputChange}
                                   value={this.state.firstName}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Last name</label>
                            <input type="text" name="lastName" maxLength="20" className="form-control"
                                   onChange={this.handleInputChange}
                                   value={this.state.lastName}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label>Photo</label>
                            <div className='row'>
                                <div className='col'>
                                    <img height='100' className='mr-2 mb-1' src={this.state.previewPhotoURL} alt={''}/>
                                </div>
                                <div className='col'>

                                </div>
                            </div>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" id="inputGroupFile02" onChange={this.handleInputFileChange} />
                                    <label className="custom-file-label"  htmlFor="inputGroupFile02"
                                           aria-describedby="inputGroupFileAddon02" >
                                        {this.state.selectedPhotoURL.name}
                                    </label>
                                </div>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-danger" type="button"
                                            id="inputGroupFileAddon04" onClick={this.handleDeleteSelectedPhoto}>Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" maxLength="50"
                                   onChange={this.handleInputChange}
                                   value={this.state.email}
                            />
                        </div>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={this.handleSubmit} className="btn btn-primary">Save</button>
                        <Link to={'/profiles/' + this.props.currentProfileId}  className="btn btn-secondary" >Back</Link>
                    </div><br/>
                </div>
            </div>
        );
    }
}

export default UserInfoSettings;