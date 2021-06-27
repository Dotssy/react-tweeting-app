import PropTypes from "prop-types";
import React, {Component} from "react";

import "./post-add-form.css";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    margin-top: 20px;
    input[type="text"] {
        width: auto;
        flex-grow: 1;
        margin-right: 3px;
    }
`

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValueChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.text);
        this.setState({
            text: ''
        });
    }

    render() {
        return (
            <Form
                onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="О чём Вы думаете сейчас?"
                    className="form-control new-post-label"
                    onChange={this.onValueChange}
                    value={this.state.text}/>
                <button
                    type="submit"
                    className="btn btn-outline-secondary">
                    Добавить</button>
            </Form>
        );
    }
}

PostAddForm.propTypes = {
  onAdd: PropTypes.func
}