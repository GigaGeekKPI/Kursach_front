import React from 'react'
import Clothes from './Clothes'

class ClothesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: []
        }
    }

    async componentDidMount() {
        this.setState({
            clothes: await fetch('http://localhost:8080/clothes', {
                method: 'GET'
            }).then(res => res.json()).then(res => res.data)
        });
        console.table(this.state);
    }

    render() {
        return (
            <>
                {this.state.clothes.map((el, index) => <Clothes clothes={el} key={index} role={this.props.role}/>)}
            </>
        );
    }
}

export default ClothesList;