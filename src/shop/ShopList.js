import React, { Component } from 'react';
import Shop from './Shop';
import { getShopList } from "../util/ShopRequests";
import { Link } from 'react-router-dom';
import ShopOfList from "./ShopOfList";

class ShopList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shops: []
        };
        this.loadContactsByCurrentUser = this.loadContactsByCurrentUser.bind(this);
    }

    loadContactsByCurrentUser() {

        getShopList()
            .then(response => {
                this.setState({
                    shops: response
                });
            }).catch(error => {
            this.setState({
                shops: []
            });
        });
    }

    componentDidMount() {
        this.loadContactsByCurrentUser();
    }

    render() {
        const data = this.state.shops;
        const listData = data.map((d) =>
            <ShopOfList
                shopId={d.id}
                key={d.id}
                nameShop={d.nameShop}
                url={d.url}
                photoURL = {d.photoURL}
                computedMatch= {this.props.match}
            />);
        return (
            <div className="container mb-2">
                {
                    this.props.authenticated && this.props.currentUser.role === 'SELLER' ? (
                        <Link to={"/shops/create"} className={"btn btn-secondary mt-2"}>Create new shop</Link>
                    ) : (<div/>)
                }
                { listData }
            </div>
        )
    }
}

export default ShopList;