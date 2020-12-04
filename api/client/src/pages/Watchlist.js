import React from 'react';
import { Row, Col, Button, Container } from 'reactstrap';
import { render } from 'react-dom';

//components
import ListSecurityContainer from '../components/Watchlist/listSecurityContainer';
import AddWatchlistForm from '../components/Watchlist/addWatchlistForm';

export default class watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: [],
        };
        this.handleRemoveTask = this.handleRemoveTask.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
    }

    componentDidMount() {
        this.setState({
            taskList: ['AAPL', 'MSFT', 'AMZN'],
        });
    }

    render() {
        return (
            <React.Fragment>
                <Col className="watchlist-master-col">
                    <Row className="watchlist-form-row">
                        {/*Create Task Form */}
                        <Col>
                            <AddWatchlistForm newTask={this.handleAddTask} className="watchlist-form" />
                        </Col>
                    </Row>
                    <Row className="watchlist-list-row">
                        {/* Show Task list */}
                        <ListSecurityContainer
                            list={this.state.taskList}
                            removeTask={this.handleRemoveTask}
                            className="watchlist-list"
                        />
                    </Row>
                </Col>
            </React.Fragment>
        );
    }

    handleRemoveTask(id) {
        let array = this.state.taskList;

        /* Remove selected value from array */
        array = array.filter(function (el, index) {
            return index !== id;
        });

        this.setState({ taskList: array });
    }
    handleAddTask(name) {
        let tmp = this.state.taskList;
        tmp.push(name);
        this.setState({ taskList: tmp });
    }
}
