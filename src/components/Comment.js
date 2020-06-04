import React from 'react'

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: props.comment
        }
    }

    render() {
        return (
            <div class="comment-content">
                <p><span>UserID: {this.state.comment.customerId}</span> - about -> <span>ClothesID: {this.state.comment.clothesId}</span></p>
                <p className="content">{this.state.comment.content}</p>
            </div>
        );
    }
}

export default Comment;