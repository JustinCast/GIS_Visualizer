import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form className="container text-right" onSubmit={this.handleSubmit}>
        <TextField
          placeholder="Host"
          label="Host"
          onChange={this.handleChange}
          value={this.state.value}
          id="time"
          type="text"
          variant="outlined"
        />
        <br/>
        <div className="container text-right mt-2">
          <Button type="submit" size="small" variant="contained" color="primary" >
            Conectar
          </Button>
        </div>
      </form>
    );
  }
}
