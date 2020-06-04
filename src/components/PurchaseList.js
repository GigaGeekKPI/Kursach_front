import React from 'react';
import Purchase from './Purchase'

class PurchaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchase: [],
        }
    }

    async componentDidMount() {
        this.setState({
            purchase: await fetch('http://localhost:8080/purchase', {
                method: 'GET'
            }).then(res => res.json()).then(res => res.data)
        });
        console.table(this.state);
    }
    render() {

        let customFilter;

        if(this.props.role === 'ROLE_ADMIN') {
            customFilter = this.state.purchase;
        } else {
            customFilter = this.state.purchase.filter(el => el.customerId === this.props.userId);
        }

        return (
            <section className="purchases">
                <h2>Purchase History</h2>
                {customFilter.map((el, index) => <Purchase purchase={el} key={index} userId={this.props.userId}/>)}
            </section>
        );
    }
}

export default PurchaseList;