import React from 'react'
import Clothes from './Clothes'

class ClothesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: [],
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

    async handleAdd(event) {
        event.preventDefault();
        let test = new FormData(event.target);
        fetch(`http://localhost:8080/clothes?naming=${test.get("naming")}&brand=${test.get("brand")}&country=${test.get("country")}&price=${test.get("price")}&rate=${test.get("rate")}`, {
            method: 'POST'
        }).then(res => res.json()).then(res => alert(res.data));
        window.location.reload();
    }

    render() {
        let addForm;
        if (this.props.role === 'ROLE_ADMIN') {
            addForm =
                <form onSubmit={this.handleAdd} style={{ display: "inline-block", margin: "20px" }}>
                    <label>Name:
                        <input type="text" name="naming" required />
                    </label>
                    <label>Brand:
                        <input type="text" name="brand" required />
                    </label>
                    <label>Country:
                        <input type="text" name="country" required />
                    </label>
                    <label>Price:
                        <input type="text" name="price" required />
                    </label>
                    <label>Rate:
                        <input type="text" name="rate" required />
                    </label>
                    <input type="submit" value="Add" />
                </form>
        }

        return (
            <>
                {addForm}
                {this.state.clothes.map((el, index) => <Clothes clothes={el} key={index} role={this.props.role} userId={this.props.userId}/>)}
            </>
        );
    }
}

export default ClothesList;