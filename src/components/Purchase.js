import React from 'react'

class Purchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchase: props.purchase,
            clothes: ""
        }
    }

    async componentDidMount() {
        this.setState({
            clothes: await fetch(`http://localhost:8080/clothes/${this.state.purchase.clothesId}`, {
                method: 'GET'
            }).then(res => res.json()).then(res => res.data)
        });
    }

    render() {
        return (
            <div className="clothes history">
                <div>
                    <p class="id">UserID: {this.state.purchase.customerId}</p>
                    <p class="id">ClothesID {this.state.purchase.clothesId}</p>
                    <p>Total: {this.state.purchase.total}</p>
                    <p>Name: {this.state.clothes.naming}</p>
                    <p>Brand: {this.state.clothes.brand}</p>
                    <p>Country: {this.state.clothes.country}</p>
                </div>
                <img src="https://via.placeholder.com/200.png/09f/fff" alt='placeholder' />
            </div>
        );
    }
}

export default Purchase;