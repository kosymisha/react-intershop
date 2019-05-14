import React, { Component } from 'react';
import { getProfiles } from "../../util/ProfileRequests";
import { Link } from 'react-router-dom';

class ProfileList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: []
        };
        this.loadProfiles = this.loadProfiles.bind(this);
    }

    loadProfiles() {
        getProfiles()
            .then(response => {
                this.setState({
                    profiles: response
                });
            }).catch(error => {
            this.setState({
                profiles: []
            });
        });
    }

    componentDidMount() {
        this.loadProfiles();
    }

    render() {
        const data = this.state.profiles;
        const listData = data.map((d) =>
            <ProfileOfList
                profileId={d.id}
                key={d.id}
                firstName={d.firstName}
                lastName={d.lastName}
                photoURL = {d.photoURL}
            />);
        return (
            <div className="container mb-2">
                { listData }
            </div>
        )
    }
}

export default ProfileList;

class ProfileOfList extends Component {
    render() {
        return (
            <Link to={"/profiles/" + this.props.profileId}>
                <div className="row mt-2">
                    <div className="col-1">
                        <div className="shop-avatar">
                            {
                                this.props.photoURL ? (
                                    <img src={this.props.photoURL} className="mr-3" alt="..."/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.firstName[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="col" >
                        <p>{this.props.firstName} {this.props.lastName}</p>
                    </div>
                </div>
            </Link>
        )
    }
}