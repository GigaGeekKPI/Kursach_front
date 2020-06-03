import React from 'react';
// import Comment from './Comment'

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
                {/* <Comment comment={el} key={index} role={this.props.role} userId={this.props.userId}/> */}
                {this.state.comments.map((el, index) => el.content)}
            </section>
        );
    }
}

export default CommentList;