import React, { Component } from 'react';
import './App.css';
import MapContent from './MapContent';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SQL Bounding Boxes</h1>
        </header>
        <MapContent />
      <footer>by <a href='http://duberste.in'>@duber</a></footer>
      </div>
    );
  }
}

export default App;
