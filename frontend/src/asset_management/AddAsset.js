import React, { Component } from 'react';
import upload from './../images/upload.png'
import generalimage from './../images/generalpdf.png'
import Dropzone from 'react-dropzone'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './../custom_css.css'
import logo from "./../root/logo.png"
// import {Reports} from "./reports.js"

export class AddAsset extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: [],
      fileurl: null,
      uploading: false,
      progress_percent: 0,
      results: '',
    };
  }

  clickedUploadButton = (event) => {
    let file = this.state.file;
    let progress = 100 /file.length;
    console.log("File Items"+progress);
    file.map((singlefile,index) => {
      console.log("index"+index);
      console.log("ppercent"+(index+1) * progress);
      this.setState({ 
          progress_percent: (index+1) * progress,
      });
      // console.log("folder_id",this.state.folder_id)
      let formData = new FormData();
      formData.append("image", singlefile)
      // formData.append("folder_id", this.state.folder_id)
      
      fetch("http://localhost:5001/predict", {
        method: 'POST',
        body: formData
        }).then( (response) => { 
            return response.json();
        }).then((json_response) => {
            this.setState({results:json_response.results})
        });  
    });
    
  }

  clickedCancel = (event) => {
    this.setState({
      uploading: false,
    })
  }

  handleDrop = (files) => {
    this.setState({
      file: files,
      uploading: true,
    })
  }

  Redirect = () => {
      window.location.replace("http://localhost:3000/")
  }

  render() {
    const uploading = this.state.uploading;
    let upload_and_cancel_button,draganddrop;

    if (uploading) {
      let file = this.state.file;
      
      draganddrop = []
      file.map((singlefile,index) => {
        console.log("File is "+singlefile.type)
        draganddrop [index] = (singlefile.type === "image/jpeg" || singlefile.type === "image/png") ? 
              <img key={index.toString()} src={URL.createObjectURL(singlefile)} className="img-thumbnail" height="100px" width="200px" alt={singlefile.path}/>  
              : <img src={generalimage} className="img-thumbnail" height="100px" width="200px" alt={singlefile.path}/> 
            
      }); 

      upload_and_cancel_button =
      <div id="upload-button"> 
          <button type="button" className="btn-primary" btn-lg="true" onClick={this.clickedUploadButton}>Upload</button>
         
          <button type="button" className="btn-primary" btn-lg="true" onClick={this.clickedCancel}>Cancel</button>
       </div> ;

    } else {
      
      draganddrop = <br></br>
      upload_and_cancel_button = <br></br>
    }

    return (
      <div className="container">
            <img src={logo} className="img-thumbnail" onClick={() => this.Redirect()} height="100px" width="200px" />
            <div id="rcorners3">

            <div id="upload-btn">  
            <Dropzone onDrop={ this.handleDrop } >     
              
                  {({getRootProps, getInputProps}) => (
               <section>
                   <div {...getRootProps()}>
                   <img src={upload} width="100px" height="100px" className="img-responsive" alt="Responsive image"></img>
                     <input {...getInputProps()} />
                        <p style={{ marginTop: '20px' }}>Drag and drop some files here, or click to select files</p>
                    </div>
                    <div id="Progressbar">
                    <CircularProgressbar
                        className="inverted"
                        background
                        percentage={this.state.progress_percent}
                        text={`${this.state.progress_percent}%`}
                        />
                    </div>
                </section>

  
                )}

              </Dropzone>
                 
              </div>
              <div id="image-preview"> {draganddrop} </div>
              {upload_and_cancel_button}
            </div>
            <div>
            {this.results ? <div>The degree of microaneurysms is {this.state.results}</div> : <div></div>}
            </div>
      </div>
    );
  }
}
