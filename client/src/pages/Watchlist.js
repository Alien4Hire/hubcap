import React from 'react';
// import { Row, Col, Button } from 'reactstrap';
import {render} from "react-dom";

//components
import ListSecurityContainer from "../components/Watchlist/listSecurityContainer";
import AddWatchlistForm from "../components/Watchlist/addWatchlistForm";


export default class watchlist extends React.Component {

	constructor(props){
		super(props) 
		this.state = {
			taskList:[]
			};
            this.handleRemoveTask = this.handleRemoveTask.bind(this);
            this.handleAddTask = this.handleAddTask.bind(this);
	};

	componentDidMount(){
		this.setState({
			taskList:["AAPL", "MSFT", "AMZN"]
		})
	};

	render(){
		return(
                    <div>
                        <div className = "row">
                            <div className="col-md-12">
                                <div style = {{textAlign:"center"}}>
                                    <h2> Watchlist </h2>
                                </div>
                            </div>
                        </div>
                        {/*Create Task Form */}
                        <AddWatchlistForm
                            newTask = {this.handleAddTask}                        
                        />

                        {/* Show Task list */}
                        <ListSecurityContainer
                            list = {this.state.taskList}
                            removeTask = {this.handleRemoveTask}
                        />
                    </div>

			)
	};

	handleRemoveTask(id){
            let array = this.state.taskList;

            /* Remove selected value from array */
            array = array.filter(function (el, index) {
                     return index !== id
            });

            this.setState({taskList: array});
    };
    handleAddTask(name){
		let tmp = this.state.taskList;
		tmp.push(name);
		this.setState({taskList: tmp})
    };
};


