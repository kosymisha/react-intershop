import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ShopOfList.css';

class CommentOfList extends Component {
    render() {
        return (
            <div className="row mt-2">
                <div className="col-10">
                    <div className="media">
                        <img width="65" src={this.props.author.photoURL} className="mr-3" />
                        <div className="media-body">
                            <b className="mt-0">{this.props.author.firstName} {this.props.author.lastName}</b>
                            <div>{this.props.message}</div>
                        </div>
                    </div>
                </div>

                <div className="col-2">
                    { this.props.currentUser !== null && this.props.currentUser.id === this.props.author.id &&
                        this.props.currentUser.role !== 'ADMIN' ?
                        (
                            <button
                                className="btn btn-danger"
                                onClick={this.props.onDelete}
                            >DELETE</button>
                        ) : ( <div/> )
                    }
                    { this.props.currentUser !== null && this.props.currentUser.role === 'ADMIN' ?
                        (
                            <button
                                className="btn btn-danger"
                                onClick={this.props.onDelete}
                            >DELETE</button>
                        ) : ( <div/> )
                    }
                </div>
            </div>
        )
    }
}

export default CommentOfList;