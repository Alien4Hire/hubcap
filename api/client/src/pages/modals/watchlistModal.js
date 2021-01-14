import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '../../redux/store';

class Modal extends React.Component{

    componentDidMount() {
        this.modalTarget = document.createElement('div');
        this.modalTarget.className = 'modal';
        document.body.appendChild(this.modalTarget);
        this._render();
    }

    componentWillUpdate() {
        this._render();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.modalTarget);
        document.body.removeChild(this.modalTarget);
    }

    _render() {
        ReactDOM.render(
            <div>{this.props.children}</div>,
            this.modalTarget
        )
    }

    render() {
    return <noscript />
    // ReactDOM.createPortal(
        // <div onClick={props.onDismiss} className="ui dimmer modals visible active">
        //     <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
        //         <i onClick={props.onDismiss} className="close icon"></i>
        //         <div className="header">{props.title}</div>
        //         <div className="content">{props.content}</div>
        //         <div className="actions">{props.actions}</div>
        //     </div>
        // </div>,
        // document.querySelector('#modal')
    // );
}};

export default Modal;
