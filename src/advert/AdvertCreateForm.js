import React, { Component } from 'react';
import { createShop } from "../util/ShopRequests";
import { uploadFileShop } from '../util/FileRequests'
import {Link} from "react-router-dom";
import Alert from 'react-s-alert';
import './AdvertCreateForm.css';
import {NO_AVATAR_URL} from "../constants";

class AdvertCreateForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            title: '',
            price: '',
            photoURL: NO_AVATAR_URL,
            description: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
    }

    handleDeletePhoto () {
        this.setState({
            photoURL: NO_AVATAR_URL,
            photoPath: null
        });
    }

    handleInputChange (event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    handleInputFileChange(event) {
        if (event.target.files[0] !== undefined)
            this.setState({
                photoURL: URL.createObjectURL(event.target.files[0]),
                photoPath: event.target.files[0]
            });
    }

    handleSubmit (event) {
        event.preventDefault();
        const newShop = {
            title: this.state.title,
            price: this.state.price,
            photoURL: this.state.photoURL,
            description: this.state.description,
            user: this.props.currentUser
        };
        console.log(newShop);
        let data = new FormData();
        data.append('file', this.state.photoPath);
        createShop(newShop).then(shop => {

            uploadFileShop(shop.id, data)
                .then(() => {
                    Alert.success("Shop was created successfully!");
                    this.props.history.push('/shops/' + shop.id);
                });
        });
    }

    render () {
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center mt-3 ml-3">
                    <div className="col col-md-6">
                        <h5 align="center">New shop</h5>
                        <div className={'row justify-content-between'}>
                            <div className='col'>
                                <div className="shop-avatar-create mb-2">
                                    <img src={this.state.photoURL} alt="..."/>
                                </div>
                            </div>
                        </div>
                        <label className={"mt-4"}>Photo</label>
                        <div className="input-group">
                            <div className="custom-file">
                                <input type="file"  id="inputGroupFile02" onChange={this.handleInputFileChange} />
                                <label className="custom-file-label" htmlFor="inputGroupFile02"
                                       aria-describedby="inputGroupFileAddon02" >
                                    {this.state.photoURL.substr(0, 45) + '...'}
                                </label>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-outline-danger" type="button"
                                        id="inputGroupFileAddon04" onClick={this.handleDeletePhoto}>Delete
                                </button>
                            </div>
                        </div>
                        <label className={"mt-4"}>Name</label>
                        <input type="text" name="nameShop"
                               className="form-control"
                               id="InputNameShop"
                               placeholder="Name"
                               value={this.state.nameShop}
                               onChange={this.handleInputChange}
                        />
                        <label className={"mt-4"}>URL</label>
                        <input type="text" name="url"
                               className="form-control"
                               id="InputUrl"
                               placeholder="www.example.com"
                               value={this.state.url}
                               onChange={this.handleInputChange}
                        />
                        <label className={"mt-4"}>Description</label>
                        <textarea type="text" name="description"
                                  className="form-control"
                                  id="InputCompany"
                                  placeholder="Description"
                                  value={this.state.description}
                                  onChange={this.handleInputChange }
                        >f</textarea>
                        <div className="btn-group mt-3">
                            <Link to={"/shops"} className="btn btn-secondary">Back</Link>
                            <button className="btn btn-success" onClick={this.handleSubmit}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdvertCreateForm;