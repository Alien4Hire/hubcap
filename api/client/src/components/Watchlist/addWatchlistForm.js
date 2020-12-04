import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';
import { Row, Col, Button } from 'reactstrap';
import options from './stocklist';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './styles.css';

export default class addWatchlistForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
        };
        this._typeahead = React.createRef();
    }

    checkEnterKey = (e) => {
        console.log('checkEnterKey');
        var keyCode = e.which || e.keyCode;
        if (keyCode == 13) {
            console.log('checkEnterKey');
            if (this.state.taskName.trim() !== '') {
                this.props.newTask(this.state.taskName);
            }
        }
    };

    updateTaskName = (e) => {
        console.log(e);
        this.setState({ taskName: e.length > 0 ? e[0].ticker : '' });
        console.log('updateTaskName');
    };

    updateTask = (e) => {
        this.setState({ taskName: e.target.value });
        console.log('updateTask');
    };

    buttonAddTask = (e) => {
        let name = e.target.value;
        if (this.state.taskName.trim() !== '') this.props.newTask(this.state.taskName);
        console.log('buttonAddTask');
        this.setState({ taskName: '' });
        this._typeahead.current.clear();
    };

    emptyInput = (e) => {
        this.setState({ taskName: '' });
        console.log('empty input');
    };

    render() {
        return (
            <React.Fragment>
                <Row className="watchlist-component">
                    <Col>
                        <Typeahead
                            ref={this._typeahead}
                            id="my-typeahead-id"
                            placeholder=""
                            onChange={this.updateTaskName}
                            onOptionSelected={(this.handleAddTask, this.emptyInput)}
                            value={this.state.taskName}
                            onKeyDown={((e) => this.checkEnterKey(e), this.emptyInput)}
                            labelKey={(option) => `${option.ticker} ${option.security_type} `}
                            options={options}
                        />
                    </Col>

                    <Col>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.buttonAddTask}
                            onKeyPress={(e) => this.checkEnterKey(e)}>
                            +
                        </button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
