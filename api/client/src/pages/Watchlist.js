import React from 'react';
import { Row, Col, Button, Container } from 'reactstrap';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { stockSelector, fetchWatchlists } from '../redux/actions';
//components
import ListSecurityContainer from '../components/Watchlist/listSecurityContainer';
import AddWatchlistForm from '../components/Watchlist/addWatchlistForm';
import Modal from './modals/watchlistModal';

class watchlist extends React.Component {
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
                        <Col>
                            <div className="current-watchlist">
                                <i className="mdi mdi-chevron-down" />
                            </div>
                        </Col>
                        <Col>
                            <AddWatchlistForm newTask={this.handleAddTask} className="watchlist-form" />
                        </Col>
                    </Row>
                    <Row className="watchlist-list-row">
                        <ListSecurityContainer
                            list={this.state.taskList}
                            removeTask={this.handleRemoveTask}
                            className="watchlist-list"
                        />
                    </Row>
                </Col>
                <Modal />
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

const mapStateToProps = (state) => {
    console.log(state);
};

export default connect(mapStateToProps)(watchlist);
