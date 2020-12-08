import React from 'react';
import PropTypes from 'prop-types';

export default class Security extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseTask = this.handleCloseTask.bind(this);
    }

    static propTypes = {
        id: PropTypes.number.isRequired, //Define that id of type int is needed when you use this component
        name: PropTypes.string.isRequired, //Define that name of type string is needed when you use this component
        onClose: PropTypes.func.isRequired, //Define that onClose function is needed when you use this component
    };

    render() {
        return (
            <a href="" className="list-group-item">
                {this.props.name}
                <button onClick={this.handleCloseTask} style={{ float: 'right' }}>
                    <i className="glyphicon glyphicon-remove"></i>
                </button>
            </a>
        );
    }

    handleCloseTask() {
        this.props.onClose(this.props.id);
    }
}
