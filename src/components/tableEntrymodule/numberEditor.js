import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class DateEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { numberEditor: "" };
  }
  getValue = () => {
    let obj = {};
    obj[this.props.column.key] = this.state.numberEditor;
    return obj;
  };

  getInputNode = () => {
    return ReactDOM.findDOMNode(this);
  };

  handleChange = ({ target: { value } }) => {
    if (isNaN(Number(value))) return;
    this.setState({ numberEditor: value });
  };

  render() {
    return (
      <input
        name="numberEditor"
        type="text"
        placeholder="Enter the number"
        value={this.state.numberEditor}
        onChange={this.handleChange}
      />
    );
  }
}