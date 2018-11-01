import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { SketchPicker } from 'react-color';
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
      <form className="container text-left m-4" onSubmit={this.handleSubmit}>
        <TextField
          className="m-2"
          placeholder="Host"
          label="Host"
          onChange={this.handleChange}
          value={this.state.value}
          id="time"
          type="text"
          variant="outlined"
        />
        <br/>
        <TextField
          className="m-2"
          placeholder="Port"
          label="Port"
          onChange={this.handleChange}
          value={this.state.value}
          id="time"
          type="number"
          variant="outlined"
        />
        <br/>
        <TextField
          className="m-2"
          placeholder="Nombre DB"
          label="Nombre DB"
          onChange={this.handleChange}
          value={this.state.value}
          id="time"
          type="text"
          variant="outlined"
        />
        <br/>
        <TextField
          className="m-2"
          placeholder="Contraseña"
          label="Contraseña"
          onChange={this.handleChange}
          value={this.state.value}
          id="time"
          type="text"
          variant="outlined"
        />
        <br/>
        <TextField
          className="m-2"
          placeholder="Esquema"
          label="Esquema"
          onChange={this.handleChange}
          value={this.state.value}
          id="time"
          type="text"
          variant="outlined"
        />
        <br/>
        <TextField
          className="m-2"
          placeholder="Nombre tabla"
          label="Nombre tabla"
          onChange={this.handleChange}
          value={this.state.value}
          id="time"
          type="text"
          variant="outlined"
        />
        <br/>
        <SketchPicker className="m-2"/>
        <div className="container text-left mt-2">
          <Button type="submit" size="small" variant="contained" color="primary" >
            Conectar
          </Button>
        </div>
      </form>
    );
  }
}
