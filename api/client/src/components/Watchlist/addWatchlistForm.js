import React, {useState, useRef, useEffect} from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';
import { Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Card, CardBody, ModalHeader, ModalBody, Modal } from 'reactstrap';
import options from './stocklist';

import {connect, useDispatch} from 'react-redux';
import {updateUserWatchlist, loadNewWatchlist, addStock, updateWatchlist, selectWatchlist, addWatchlist, renameWatchlist, clearWatchlist, deleteWatchlist, fetchWatchlists } from '../../redux/actions'

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './styles.css';

const AddWatchlistForm = ({selected, watchlists, stocks, number}) => {
    const dispatch = useDispatch();
    const _typeahead = useRef(null);
    const [taskName, setTaskName] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [lastClicked, setLastClicked] = useState(selected);
    const [create, setCreate] = useState(false);
    const [rename, setRename] = useState(false);
    const [clear, setClear] = useState(false);
    const [prevState, setPrevState] = useState(stocks);
    const [newWatchlist, setNewWatchlist] = useState('');
    const [renameAWatchlist, setRenameAWatchlist] = useState(selected);
    const [focus, setFocus] = useState('');
    const [secType, setSecType] = useState('');
    const [modal, setModal] = useState(false);
    const [delWatchlist, setDelWatchlist] = useState(undefined);
    const [delIcon, setDelIcon] = useState('mdi mdi-close-box-outline icon-watchlists')

    const toggle = (e) => {
        setDropdownOpen(prevState => !prevState);
        console.log(e)
    }

    const createForm = () => {
        setCreate(prevState => !prevState)
    }

    const clearForm = () => {
        setClear(prevState => !prevState)
    }

    const renameForm = () => {
        setRename(prevState => !prevState)
    }

    const createWatchlist = (e) => {
        console.log(e)
        dispatch(addWatchlist(newWatchlist));
        createForm();
        // dispatch(fetchWatchlists());
        // dispatch(loadNewWatchlist());       
    }

      //update New Watchlist
    const handleWatchlistFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleWatchlistChange = (e) => {
        const { name, value } = e.target;
        setNewWatchlist(value);
    };

    // checkEnterKey = (e) => {
    const handleRenameFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleRenameChange = (e) => {
        const { name, value } = e.target;
        setRenameAWatchlist(value);
    };

    // checkEnterKey = (e) => {
    //     console.log('checkEnterKey');
    //     var keyCode = e.which || e.keyCode;
    //     if (keyCode == 13) {
    //         console.log('checkEnterKey');
    //         if (taskName.trim() !== '') {
    //             this.props.newTask(this.state.taskName);
    //         }
    //     }
    // };

    ///change state watchlist name
    const updateTaskName = (e) => {
        setTaskName(e.length > 0 ? e[0].ticker : '' );
        setSecType(e.length > 0 ? e[0].security_type : '' );
        console.log(taskName);
    };

    // updateTask = (e) => {
    //     this.setState({ taskName: e.target.value });
    //     console.log('updateTask');
    // };


    ///use the plus button to add to watchlist
    const buttonAddTask = () => {
        // let name = e.target.value;
        setPrevState(stocks)
        if (taskName.trim() !== '') dispatch(addStock(taskName, secType));
        console.log('buttonAddTask');
        setTaskName('')
        _typeahead.current.clear();
    };

    ///Update state selected stock
    const updateSelected = (value) => {
        dispatch(selectWatchlist(value))
    }

    //Delete watchlist
    const delAWatchlist = (e) => {
        e.stopPropagation()
        dispatch(deleteWatchlist(delWatchlist))
    }

    ///save updated watchlist if different
    useEffect(() => {
        setPrevState(stocks);
        setRenameAWatchlist(selected);
    }, [])

    useEffect(() => {
        setRenameAWatchlist(selected);
    }, [selected])

    useEffect(() => {
        dispatch(updateUserWatchlist(number));
    }, [number])
    

    const renderForm = () => {
        return (
            <React.Fragment>
                <Row className="watchlist-component">
                <Col>
                    <div className="current-watchlist">
                    <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle} className="watchlist-dropdown">
                        <DropdownToggle caret>
                        {selected}
                            </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => createForm()}>Create new list</DropdownItem>
                            <DropdownItem onClick={() => renameForm()}>Rename</DropdownItem>
                            <DropdownItem onClick={() => clearForm()}>Clear list</DropdownItem>
                            <DropdownItem divider />
                            {watchlists.map((value, index) => (
                                <DropdownItem 
                                    value={index} 
                                    key={value} 
                                    onClick={() => updateSelected(index)} 
                                    onMouseEnter={() => setDelWatchlist(value)} 
                                    onMouseLeave={() => setDelWatchlist(current => current === value ? undefined : current)}
                                >
                                    <span className="title-watchlists">
                                        {value}
                                    </span>
                                    <span 
                                    onClick={(e) => delAWatchlist(e)}
                                    onMouseEnter={() => setDelIcon('mdi mdi-close-box icon-watchlists')} 
                                    onMouseLeave={() => setDelIcon('mdi mdi-close-box-outline icon-watchlists')}
                                    >
                                    {delWatchlist === value && (
                                    <i className={delIcon} />
                                    )}
                                    </span>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                        {/* <span>{selected}</span>
                        <i className="mdi mdi-chevron-down" /> */}
                    </div>
                </Col>
                    <Col>
                        <Typeahead
                            ref={_typeahead}

                            id="my-typeahead-id"
                            placeholder=""
                            onChange={e => updateTaskName(e)}
                            // onOptionSelected={(handleAddTask(), emptyInput())}
                            // value={taskName}
                            // onKeyDown={((e) => checkEnterKey(e), emptyInput())}
                            labelKey={(option) => `${option.ticker} - ${option.names} - ${option.security_type}`}
                            options={options}
                        />
                    </Col>

                    <Col>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={buttonAddTask}
                            // onKeyPress={(e) => checkEnterKey(e)}
                            >
                            +
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Modal isOpen={create} toggle={() => createForm()} className="modal-dialog-centered">
                        <ModalHeader toggle={() => createForm()}>Create New Watchlist</ModalHeader>
                        <ModalBody>
                            <form className="pl-3 pr-3" action="#">
                                <div className="form-group">
                                    <label htmlFor="username">Watchlist name:</label>
                                    <input
                                        className="form-control"
                                        type="name"
                                        id="username"
                                        required=""
                                        placeholder=""
                                        onChange={handleWatchlistChange} 
                                        onFocus={handleWatchlistFocus}
                                    />
                                </div>

                                <div className="form-group text-center">
                                    <form onSubmit={(e) => createWatchlist(e)}>
                                    <button className="btn btn-light" type="" onClick={(e) => createForm(e)}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" type="submit">
                                        Save
                                    </button>
                                    </form>
                                </div>
                            </form>
                        </ModalBody>
                    </Modal>
                    <RenderClear />
                </Row>
            </React.Fragment>
        );
        }
    // const renderCreate = () => {
    //     return (
    //         <form onSubmit={(e) => {createWatchlist(e)}}>
    //         <label>Create New List</label>
    //         <Input type="text" onChange={handleWatchlistChange} onFocus={handleWatchlistFocus} />
    //         <button type="submit" className="btn btn-primary">+</button>
    //     </form>
    //     )
    // }
    
    const renderRename = () => {
        return (
            <form onSubmit={(e) => {dispatch(renameWatchlist(selected, renameAWatchlist))}}>
            <label>Create New List</label>
            <Input type="text" onChange={e => handleRenameChange(e)} onFocus={e => handleRenameFocus(e)} value={renameAWatchlist}/>
            <button type="submit" className="btn btn-primary">+</button>
        </form>
        )
    }
    
    const RenderClear = () => {
        return (
            <Modal isOpen={clear} toggle={() => clearForm()} className="modal-dialog-centered">
            <ModalHeader toggle={() => clearForm()}>Confirmation</ModalHeader>
            <ModalBody>
                <form className="pl-3 pr-3" action="#">
                    <div className="form-group">
                        Are you sure you want to clear all symbols? 
                    </div>
                    <div className="form-group text-center">
                        <form onSubmit={(e) => dispatch(clearWatchlist(selected))}>
                        <button className="btn btn-light" type="" onClick={(e) => clearForm(e)}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" type="submit">
                            Continue
                        </button>
                        </form>
                    </div>
                </form>
            </ModalBody>
        </Modal>
        )
    }
    
    if (rename) return renderRename()
    return renderForm()

    
}

    
    

const mapStateToProps = (state) => {
    return {
        selected: state.Watchlist.stock.title,
        watchlists: state.Watchlist.watchlist.watchlist,
        stocks: state.Watchlist.stock.watchlist,
        number: state.Watchlist.watchlist.number,
    }
}

// const mapDispatchToProps = () => {
//     return {
//         onAddStock: stock => dispatchEvent({type: ADD_})
//     }
// }

export default connect(mapStateToProps, {updateUserWatchlist, loadNewWatchlist, fetchWatchlists, addStock, updateWatchlist, selectWatchlist, addWatchlist, renameWatchlist, clearWatchlist, deleteWatchlist})(AddWatchlistForm);
