import React, { Component } from 'react';
import logo from "./logo.png"
import bs from "./bs.ico"
import diac from "./diac.svg"
import 'bootstrap/dist/css/bootstrap.css';
import BackgroundImagePage from './../Background/background.js'

// import Navbar from 'react-bootstrap/Navbar'

export class HomePage extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      file: [],
	    };
  	}

  	handleClick = (e) => {
  		if(e == 'd')
  			window.location.replace("http://localhost:3000/predict")
  		else if(e == 'a')
  			window.location.replace("http://localhost:3000/")
  	}

  	render() {
  		return(
  			
  			<div className='container'>
  				<div>
  					<img src={logo} className="img-thumbnail" height="100px" width="200px" />
					<nav class="navbar navbar-light bg-light">
						<div class="position-relative">
							<button class="navbar-brand" onClick={() => this.handleClick('a')} >
								<img src={bs} width="30" height="30" alt="" /> API Details
							</button>
							
							<button class="navbar-brand" onClick={() => this.handleClick('d')} >
								<img src={diac} width="30" height="30" alt="" /> Diagnostic Tool
							</button>
						</div>
					</nav>
  				</div> 

  			</div>

		)
  	}
}

