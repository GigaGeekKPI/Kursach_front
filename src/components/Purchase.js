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
            <div>
                <p>{this.state.purchase.customerId}</p>
                <p>{this.state.purchase.total}</p>
                <p>{this.state.purchase.clothesId}</p>

                <p>Name: {this.state.clothes.naming}</p>
                <p>Brand: {this.state.clothes.brand}</p>
                <p>Country: {this.state.clothes.country}</p>
            </div>
        );
    }
}

export default Purchase;