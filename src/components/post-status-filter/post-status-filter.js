import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button } from "reactstrap";
import "./post-status-filter.css";

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'liked', label: 'Понравилось'}
        ];
    }

    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const {filter, onFilterSelect} = this.props;
            const active = filter === name;
            const btnColor = active ? 'primary' : 'secondary';
            return (
                <Button 
                    key={name} 
                    color={btnColor}
                    onClick={() => onFilterSelect(name)}>
                    {label}
                </Button>
            );
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}

PostStatusFilter.propTypes = {
  filter: PropTypes.string,
  onFilterSelect: PropTypes.func
}
