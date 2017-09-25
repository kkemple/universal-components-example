import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@kkemple/universal-components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <div className="Button-wrapper">
            <Button
              text="Press on Web!"
              onPress={() => alert('Button Pressed!')}
            />
          </div>
        </p>
      </div>
    );
  }
}

export default App;
