import React, { Component } from "react";
import "./App.css";
import Login from "./Login/Login";
var widthSVG=0;
var heightSVG=0;
class App extends Component {
  render() {
    return (
      <div className="App">
        <Login/>
      </div>
    )
  }

  init() {
    widthSVG = document.getElementById("misvg").width.baseVal.value;
    heightSVG = document.getElementById("misvg").height.baseVal.value;
    //cargarCapa();
  }
}

export default App;
