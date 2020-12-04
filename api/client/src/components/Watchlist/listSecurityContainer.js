import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
//Components
import Security from './security.js';

class ListSecurityContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseTask = this.handleCloseTask.bind(this);
    }

    static propTypes = {
        list: PropTypes.array.isRequired, //Define that list of array is needed when you use this component
        removeTask: PropTypes.func.isRequired,
    };

    render() {
        return (
            <React.Fragment>
                <Col>
                    {this.props.list.map((value, index) => (
                        <Security
                            key={index}
                            id={index}
                            name={value}
                            onClose={this.handleCloseTask}
                            className="security-elem"
                        />
                    ))}
                </Col>
            </React.Fragment>
        );
    }

    handleCloseTask(id) {
        this.props.removeTask(id);
    }
}
export default ListSecurityContainer;
