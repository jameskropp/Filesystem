import React from 'react';
import ReactDOM from 'react-dom';

export class Download extends React.Component {
  render(){
    return (
      <div id="downloads" className="row row-centered">
      </div>
    );
  }
}


export class Upload extends React.Component {
  render(){
    return (
      <div className="row uploads">
        <div className="col-xs-12">
          <div className="panel panel-default">
            <span className="glyphicon glyphicon-upload"></span>
            <h2>File Uploader</h2>
            <h4>Accepts all file types</h4>
            <div className="progress">
              <div className="progress-bar" role="progressbar"></div>
            </div>
            <button className="btn btn-lg upload-btn" type="button">Upload File</button>
          </div>
        </div>
        <input id="upload-input" type="file" name="uploads[]" multiple="multiple" /><br />
      </div>
    );
  }
}

export default class App extends React.Component {
  render(){
    return (
      <div className="container">
        <Upload />
        <Download />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
