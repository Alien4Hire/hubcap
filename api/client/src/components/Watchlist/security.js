import { preventDefault } from '@fullcalendar/core';
import React, { useEffect, useState } from 'react';
import {connect, useDispatch} from 'react-redux';
import { removeStock, stockSelected, updateUserWatchlist } from '../../redux/actions';
import {Row} from 'reactstrap'


const Security = ({index, name, stocks, selected, types, number}) => {
    const dispatch = useDispatch();
    const [taskName, setTaskName] =useState(name);
    const [prevState, setPrevState] = useState(stocks);
    const [delStock, setDelStock] = useState(undefined);
    const [delIcon, setDelIcon] = useState('mdi mdi-close-box-outline icon-watchlists')


    const removeTask = (e) => {
        e.stopPropagation()
        setPrevState(stocks)
        dispatch(removeStock(index))
    }    

    useEffect(() => {
        setPrevState(stocks)
    }, [])

    return (
        <Row 
            className="list-group-item"
            onMouseEnter={() => setDelStock(name)} 
            onMouseLeave={() => setDelStock(current => current === name ? undefined : current)}
            >
            <div className="item-titles" >
                {name}
            </div>
            
            <span 
            onClick={(e) => removeTask(e)} 
            className="remove-item"
            onMouseEnter={() => setDelIcon('mdi mdi-close-box icon-watchlists')} 
            onMouseLeave={() => setDelIcon('mdi mdi-close-box-outline icon-watchlists')}
            >
                {delStock === name && (
                <i className={delIcon}></i>
                )}
            </span>
           
        </Row>
    );

}

const mapStateToProps = (state) => {
    return {
        stocks: state.Watchlist.stock.watchlist,
        types: state.Watchlist.stock.type,
        number: state.Watchlist.watchlist.number
    }
}

export default connect(mapStateToProps, {removeStock, stockSelected, updateUserWatchlist})(Security);
