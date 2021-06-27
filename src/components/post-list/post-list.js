import PropTypes from "prop-types";
import React from "react";

import PostListItem from "../post-list-item";
import { ListGroup } from 'reactstrap';

import "./post-list.css";

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {
    const postEntries = posts.map(post => {
        const {id, ...postProps} = post;
        return (
            <li className="list-group-item" key={id}>
                <PostListItem 
                {...postProps}
                onDelete={() => onDelete(id)}
                onToggleImportant={() => onToggleImportant(id)}
                onToggleLiked={() => onToggleLiked(id)}/>
            </li>
        );
    });

    return (
        <ListGroup className="app-list">
            {postEntries}
        </ListGroup>
    );
};

PostList.propTypes = {
  onDelete: PropTypes.func,
  onToggleImportant: PropTypes.func,
  onToggleLiked: PropTypes.func,
  posts: PropTypes.array
}

export default PostList;