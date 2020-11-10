import React from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';
import options from './stocklist';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './styles.css';


export default class addWatchlistForm extends React.Component {
  
  constructor(props){
		super(props)
		this.state = {
			taskName:""
			};
    this._typeahead = React.createRef();
	};

  checkEnterKey = e => {
    console.log('checkEnterKey')
    var keyCode = e.which || e.keyCode;
    if(keyCode == 13){
      console.log('checkEnterKey')
      if(this.state.taskName.trim() !== ""){
          this.props.newTask(this.state.taskName)
      }
    }
  };

  updateTaskName = e => {
    console.log(e);   
    this.setState({ taskName: e.length > 0 ? e[0].ticker : "" });
    console.log('updateTaskName')

  };

  updateTask = e => {
    this.setState({taskName: e.target.value})
    console.log('updateTask')
    
  };


  buttonAddTask = e =>{
    let name = e.target.value
    if(this.state.taskName.trim() !== "")
      this.props.newTask(this.state.taskName)
      console.log('buttonAddTask')
      this.setState({ taskName: '' });
      this._typeahead.current.clear();
  };

  emptyInput = e => {
    this.setState({ taskName: '' });
    console.log('empty input')
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div style={{ margin: "20px" }}>
            <div className="row">
              <div className="col-md-6">
                <Typeahead
                  ref={this._typeahead}
                  id="my-typeahead-id"
                  placeholder=""
                  onChange={this.updateTaskName}
                  onOptionSelected={this.handleAddTask, this.emptyInput}
                  value={this.state.taskName}
                  onKeyDown={e => this.checkEnterKey(e), this.emptyInput}
                  labelKey={option =>
                    `${option.ticker} ${option.security_type} `
                  }
                  options={options}
                />
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.buttonAddTask}
                  onKeyPress={e => this.checkEnterKey(e)}
                >
                  Add New...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
