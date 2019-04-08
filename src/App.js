import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Opportunity, Editopportunity } from './pages'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
              <Route path="/" exact component={Opportunity} />
              <Route path="/edit-opportunity" exact component={Editopportunity} />
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
