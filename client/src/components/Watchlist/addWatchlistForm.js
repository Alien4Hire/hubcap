import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";

export default class App extends React.Component {
  state = {
    taskName: ""
  };
  checkEnterKey(e){
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
    if(e[0].ticker.length > 0)
        this.props.newTask(e[0].ticker);
    this.setState({ taskName: e.length > 0 ? e[0].ticker : "" });
    console.log('updateTaskName')

  };

  updateTask = e => {
    this.setState({taskName: e.target.value})
    console.log('updateTask')
  };

  handleAddTask = e => {
    let name = e.target.value;
    if (this.state.taskName.trim() !== "")
      this.props.newTask(name);
      console.log('handleAddTask')
  };

  buttonAddTask = e =>{
    let name = e.target.value
    if(this.state.taskName.trim() !== "")
      this.props.newTask(this.state.taskName)
      this.state.taskName = "";
      this.setState({ taskName: e.length > 0 ? e[0].ticker : "" });
      console.log(this.state.taskName)
      console.log('buttonAddTask')
  }
  


  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div style={{ margin: "20px" }}>
            <div className="row">
              <div className="col-md-6">
                <Typeahead
                  id="my-typeahead-id"
                  placeholder=""
                  onChange={this.updateTaskName}
                  onClick={(e => this.updateTask(e), this.handleAddTask)}
                  value={this.state.taskName}
                  onKeyPress={e => this.checkEnterKey(e)}
                  labelKey={option =>
                    `${option.ticker} ${option.security_type} `
                  }
                  options={[
                    {
                      "": 0,
                      ticker: "A",
                      security_type: "Stock",
                      big: 'hi'
                    },
                    {
                      "": 1,
                      ticker: "AA",
                      security_type: "Stock"
                    },
                    {
                      "": 2,
                      ticker: "AAA",
                      security_type: "Stock"
                    },
                    {
                      "": 3,
                      ticker: "AAAU",
                      security_type: "Stock"
                    },
                    {
                      "": 4,
                      ticker: "AACG",
                      security_type: "Stock"
                    }
                  ]}
                />
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.buttonAddTask}
                >
                  Add New...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
