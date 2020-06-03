import React from 'react';

class Clothes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: props.clothes,
            role: props.role
        }
    }

    render() {

        let editButton;
        let deleteButton;
        let purchaseButton;
        if (this.props.role === 'ROLE_ADMIN') {
            editButton = <button>Edit</button>
            deleteButton = <button>Delete</button>
        } else if(this.props.role === 'ROLE_CLIENT') {
            purchaseButton = <button>Purchase</button>
        }

        return (
            <div style={{ display: "inline-block", margin: "20px" }}>
                <img src="https://via.placeholder.com/300.png/09f/fff" alt='placeholder' />
                <p>Name: {this.state.clothes.naming}</p>
                <p>Brand: {this.state.clothes.brand}</p>
                <p>Country: {this.state.clothes.country}</p>
                <p>Price: {this.state.clothes.price} $</p>
                <p>Rate: {this.state.clothes.rate}</p>
                {editButton}
                {deleteButton}
                {purchaseButton}
            </div>
        );
    }
}

export default Clothes;