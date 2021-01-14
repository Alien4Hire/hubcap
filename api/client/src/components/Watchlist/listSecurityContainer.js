import React, {useEffect, useState} from 'react';
import { Col, Row } from 'reactstrap';
import {connect, useDispatch} from 'react-redux';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {dragAndDrop, updateWatchlist, stockSelected} from '../../redux/actions'

//Components
import Security from './security';


const ListSecurityContainer = ({selected, loading, stocks, types}) => {
    const dispatch = useDispatch();
    const [prevState, setPrevState] = useState(stocks);
    
    const handleOnDragEnd = (result) => {
        console.log(result)
        const source = result.source;
        const destination = result.destination;
        dispatch(dragAndDrop(source, destination))
    }

    useEffect(() => {
        if(prevState !== stocks) dispatch(updateWatchlist(stocks, selected, types))
    }, [stocks])

    const selectAStock = (value) => {
        console.log('It Worked')
        dispatch(stockSelected(value))
    }

    const renderList = () => {
        return (
            <React.Fragment>
                <Col>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="drag-list-stock">
                            {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {stocks.map((value, index) => {
                                    return (
                                    <Draggable key={value} draggableId={value} index={index}>
                                    {(provided) => (
                                    <div
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        onClick={() => selectAStock(value)}
                                    >
                                    <Security
                                        key={stocks[index]}
                                        index={index}
                                        {...value}
                                        name={value}
                                        // onClose={handleCloseTask}
                                        className="security-elem"
                                        selected={selected}
                                    />
                                    </div>
                                    )}
                                    </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Col>
            </React.Fragment>
        );
    }
    
    if (loading === true) return <div>Loading...</div>
    if (!stocks) return <span> Add Stocks to Watchlist...</span>
    return renderList()


}

const mapStateToProps = (state) => {
    return { 
        stocks: state.Watchlist.stock.watchlist,
        loading: state.Watchlist.stock.loading,
        types: state.Watchlist.stock.type,
    }
}


export default connect(mapStateToProps, {dragAndDrop, updateWatchlist, stockSelected})(ListSecurityContainer);
