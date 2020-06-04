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
            <div>
                <p>{this.state.comment.customerId}</p>
                <p>{this.state.comment.content}</p>
                <p>{this.state.comment.clothesId}</p>
            </div>
        );
    }
}

export default Comment;