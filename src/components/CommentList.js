import React from 'react';
import Comment from './Comment'

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        }
    }

    async componentDidMount() {
        this.setState({
            comments: await fetch('http://localhost:8080/comment', {
                method: 'GET'
            }).then(res => res.json()).then(res => res.data)
        });
        console.table(this.state);
    }
    render() {
        return (
            <section>
                <h2>Comments</h2>
                {this.state.comments.map((el, index) => <Comment comment={el} key={index} userId={this.props.userId}/>)}
            </section>
        );
    }
}

export default CommentList;