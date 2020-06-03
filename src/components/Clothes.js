import React from 'react';

class Clothes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: props.clothes,
            role: props.role,
            isEditing: false,
            isCommenting: false
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleComment = this.toggleComment.bind(this);
    }

    async handleDelete() {
        fetch(`http://localhost:8080/clothes/${this.state.clothes.id}`, {
            method: 'DELETE'
        }).then(res => res.json()).then(res => alert(res.data));
        window.location.reload();
    }

    async handleEdit(event) {
        event.preventDefault();
        let test = new FormData(event.target);
        fetch(`http://localhost:8080/clothes/${this.state.clothes.id}?naming=${test.get("naming")}&brand=${test.get("brand")}&country=${test.get("country")}&price=${test.get("price")}&rate=${test.get("rate")}`, {
            method: 'PUT'
        }).then(res => res.json()).then(res => alert(res.data));
        window.location.reload();
    }

    async handlePurchase(event) {
        event.preventDefault();
        console.table(this.state);
        fetch(`http://localhost:8080/purchase?customerId=${this.props.userId}&total=${this.state.clothes.price}&clothesId=${this.state.clothes.id}`, {
            method: 'POST'
        }).then(res => res.json()).then(res => alert(res.data));
        window.location.reload();
    }

    async handleComment(event) {
        event.preventDefault();
        let test = new FormData(event.target);
        console.table(this.state);
        fetch(`http://localhost:8080/comment?customerId=${this.props.userId}&content=${test.get("content")}&clothesId=${this.state.clothes.id}`, {
            method: 'POST'
        }).then(res => res.json()).then(res => alert(res.data));
        window.location.reload();
    }

    toggleEdit () {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    toggleComment () {
        this.setState({
            isCommenting: !this.state.isCommenting,
        });
    }

    render() {
        let editButton;
        let deleteButton;
        let purchaseButton;
        let commentButton;

        if (this.props.role === 'ROLE_ADMIN') {
           this.state.isEditing ? editButton = <div style={{display: "none"}}/> : editButton = <button onClick={this.toggleEdit}>Edit</button>
            deleteButton = <button onClick={this.handleDelete}>Delete</button>
        } else if (this.props.role === 'ROLE_CLIENT') {
            purchaseButton = <button onClick={this.handlePurchase}>Purchase</button>
            this.state.isCommenting ? commentButton = <div style={{display: "none"}}/> : commentButton = <button onClick={this.toggleComment}>Comment</button>
        }

        let content;
        let commentForm;
        if (this.state.isEditing) {
            content =
                <form onSubmit={this.handleEdit} style={{ display: "inline-block", margin: "20px" }}>
                    <label>Name:
                        <input type="text" name="naming" required defaultValue={this.state.clothes.naming}/>
                    </label>
                    <label>Brand:
                        <input type="text" name="brand" required defaultValue={this.state.clothes.brand}/>
                    </label>
                    <label>Country:
                        <input type="text" name="country" required defaultValue={this.state.clothes.country}/>
                    </label>
                    <label>Price:
                        <input type="text" name="price" required defaultValue={this.state.clothes.price}/>
                    </label>
                    <label>Rate:
                        <input type="text" name="rate" required defaultValue={this.state.clothes.rate}/>
                    </label>
                    <input type="submit" value="Edit" />
                </form>
        } else {
            content = <>
                <p>Name: {this.state.clothes.naming}</p>
                <p>Brand: {this.state.clothes.brand}</p>
                <p>Country: {this.state.clothes.country}</p>
                <p>Price: {this.state.clothes.price} $</p>
                <p>Rate: {this.state.clothes.rate}</p>
            </>
        }

        if(this.state.isCommenting) {
            commentForm = <form onSubmit={this.handleComment}>
                <textarea name="content"></textarea>
                <input type="submit"/>
            </form>
        }
        return (
            <div style={{ display: "inline-block", margin: "20px" }}>
                <img src="https://via.placeholder.com/300.png/09f/fff" alt='placeholder' />
                {content}
                {editButton}
                {deleteButton}
                {purchaseButton}
                {commentButton}
                {commentForm}
            </div>
        );
    }
}

export default Clothes;