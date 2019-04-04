import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PostViewer from './PostViewer';
import { EditOpportunity } from './templates'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
              <Route path="/" exact component={PostViewer} />
              <Route path="/edit-opportunity" exact component={EditOpportunity} />
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
