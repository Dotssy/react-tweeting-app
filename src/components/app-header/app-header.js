import PropTypes from "prop-types";
import React from "react";

import styled from "styled-components";

const Header = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        transition: .5s ease all;
        font-size: 26px;
        color: ${props => props.colored ? "red" : "black"};
        :hover {
            color: grey;
        }
    }
    h2 {
        font-size: 1.2rem;
        color: grey;
    }
`

const AppHeader = ({numOfPosts, postsLiked}) => {
    return (
        <Header>
            <h1>%username%</h1>
            <h2>{numOfPosts} записей, из них понравилось {postsLiked}</h2>
        </Header>
    );
};

AppHeader.propTypes = {
  numOfPosts: PropTypes.number,
  postsLiked: PropTypes.number
}

export default AppHeader;