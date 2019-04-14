import React, { Component } from 'react';
import './App.css';
import {AddAsset} from './asset_management/AddAsset'
import {HomePage} from './root/HomePage.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
       <Router>
          <Route path="/" exact component={HomePage}/>
          <Route path="/predict/" exact component={AddAsset}/>
        </Router>
      </div>
    );
  }
}  
export default App;