import React, { Component } from 'react';
import Opportunity from './pages/Opportunity'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Opportunity />
        </header>
      </div>
    );
  }
}

export default App;