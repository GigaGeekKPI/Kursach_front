import React from 'react'
import Clothes from './Clothes'

class ClothesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: [],
            brand: "",
            custom: []
        }

        this.handleBrandChange = this.handleBrandChange.bind(this);
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

    handleBrandChange(event) {
        this.setState({
            brand: event.target.value,
            custom: this.state.clothes.filter(el => el.brand === event.target.value)
        });
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

        let unique = [...new Set(this.state.clothes.map(el => el.brand))];

        return (
            <>
                <form>
                    {unique.map((el, index) => <label key={index}><input type="radio" name="brand" onChange={this.handleBrandChange} value={el} key={index} /> {el} </label>)}
                </form>
                {addForm}
                {this.state.custom.map((item, index) => <Clothes clothes={item} role={this.props.role} userId={this.props.userId} key={index} />)}
            </>
        );
    }
}

export default ClothesList;