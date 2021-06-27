import PropTypes from "prop-types";
import React, {Component} from "react";

import "./search-panel.css";
import styled from "styled-components";

const SearchField = styled.input`
	width: auto;
  	flex-grow: 1;
  	margin-right: 3px;
`

export default class SearchPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: ''
		};
		this.onUpdateSearch = this.onUpdateSearch.bind(this);
	}

	onUpdateSearch(e) {
		const term = e.target.value;
		this.setState({
			term: term
		});
		this.props.onUpdateSearch(term);
	}

	render() {
		return (
			<SearchField
				className="form-control"
				type="text"
				placeholder="Поиск по записям"
				onChange={this.onUpdateSearch}
			/>
		);
	}
}

SearchPanel.propTypes = {
  onUpdateSearch: PropTypes.func
}
