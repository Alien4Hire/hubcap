import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="list-group">
                                {this.props.list.map((value, index) => (
                                    <Security
                                        key={index}
                                        id={index}
                                        name={value}
                                        onClose={this.handleCloseTask}
                                        className="security-elem"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleCloseTask(id) {
        this.props.removeTask(id);
    }
}
export default ListSecurityContainer;
