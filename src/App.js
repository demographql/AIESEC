import React, { Component } from 'react';
import Opportunity from './pages/Opportunity'
import PostViewer from './PostViewer';
import './App.css';

class App extends Component {
  render() {
    return (
      <main>
        <PostViewer />
      </main>
      // <div className="App">
      //   <header className="App-header">
      //     <Opportunity />
      //   </header>
      // </div>
    );
  }
}

export default App;
