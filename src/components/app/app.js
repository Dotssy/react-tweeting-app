import React, { Component } from "react";

import AppHeader from "../app-header"; 
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import styled from "styled-components";

const AppBlock = styled.div`
    margin: 0 auto; 
    max-width: 800px;
`
const SearchPanelBlock = styled.div`
    display: flex;
`

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: "I like cats!", important: true, liked: false, id: "_tdsvv6mz2"},
                {label: "Dogs are great too", important: false, liked: false, id: "_sq8tkc41e"},
                {label: "I have no opinion on platypuses", important: false, liked: false, id: "_44usxjtx1"}
            ],
            term: '',
            filter: 'all'
        };
        this.deletePost = this.deletePost.bind(this);
        this.addPost = this.addPost.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.searchPost = this.searchPost.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.filterPost = this.filterPost.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
    }

    deletePost(id) {
        this.setState(({data}) => {
            const idx = data.findIndex(elem => elem.id === id);
            const newData = [...data.slice(0, idx), ...data.slice(idx + 1)];

            return {
                data: newData
            };
        });
    }

    addPost(text) {
        if (!text.replace(/\s/g, '').length) return;
        const newPost = {
            label: text,
            important: false,
            liked: false,
            id: generateId()
        };

        function generateId() {
            return '_' + Math.random().toString(36).substr(2, 9);
        }

        this.setState(({data}) => {
            const newData = [...data, newPost];
            return {
                data: newData
            };
        });
    }

    onToggleImportant(id) {
        this.toggleStatus(id, 'important');
    }

    onToggleLiked(id) {
        this.toggleStatus(id, 'liked');
    }

    toggleStatus(id, status) {
        this.setState(({data}) => {
            const idx = data.findIndex(elem => elem.id === id);

            const old = data[idx];
            const newItem = {...old, [status]: !old[status]};

            const newData = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];

            return {
                data: newData
            };
        });
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.label.indexOf(term) > -1;
        });
    }

    filterPost(items, filter) {
        if (filter === 'liked') {
            return items.filter(item => item.liked);
        } else {
            return items;
        }
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;

        const numOfPosts = data.length,
              postsLiked = data.filter(post => post.liked).length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                    numOfPosts={numOfPosts}
                    postsLiked={postsLiked}/>
                <SearchPanelBlock className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </SearchPanelBlock>
                <PostList 
                    posts={visiblePosts} 
                    onDelete={this.deletePost}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}/>
                <PostAddForm
                    onAdd={this.addPost}/>
            </AppBlock>
        )
    }
}