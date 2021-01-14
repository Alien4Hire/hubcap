import React, {useState, useEffect} from 'react';
import { Row, Col, Button, Container } from 'reactstrap';
import { render } from 'react-dom';
import { connect, useDispatch } from 'react-redux';
import { fetchStockList, setSelected, changeNumber } from '../redux/actions';

///Modals
import Modal from './modals/watchlistModal'

//components
import ListSecurityContainer from '../components/Watchlist/listSecurityContainer';
import AddWatchlistForm from '../components/Watchlist/addWatchlistForm';
// import watchlist from '../components/Watchlist/watchlist';

const Watchlist = ({selected, watchlists, number, AuthNumber}) => {
    const dispatch = useDispatch();
    const [taskList, setTaskList] = useState(['AAPL', 'MSFT', 'AMZN'])
    const [list, setList] = useState(selected)
    const [allList, setAllList] = useState(watchlists)
    const [selectNumber, setSelectNumber] = useState(number)

    const selectWatchlist = async () => {
        setList(selected);
        setSelectNumber(number);
    }

    useEffect(() => {
        dispatch(changeNumber(AuthNumber));
        selectWatchlist()
            .then(dispatch(fetchStockList(number)))
    }, []);

    useEffect(() => {
        selectWatchlist()
            .then(dispatch(fetchStockList(number)))
    }, [number]);

    return (
        <React.Fragment>
            <Container>
                <Col className="watchlist-master-col">
                    <Row className="watchlist-form-row">
                        <Col>
                            <AddWatchlistForm className="watchlist-form" />
                        </Col>
                    </Row>
                    <Row className="watchlist-title-row">
                        <div>Symbol</div>
                    </Row>
                    <Row className="watchlist-list-row">
                        <ListSecurityContainer
                            list={taskList}
                            className="watchlist-list"
                            number={number}
                            selected={selected}
                        />
                    </Row>
                </Col>
            </Container>
    </React.Fragment>
    )
    
}

const mapStateToProps = (state) => {
    return {
        selected: state.Watchlist.stock.title,
        watchlists: state.Watchlist.watchlist.watchlist,
        watchlist: state.Watchlist.stock.watchlist,
        number: state.Watchlist.watchlist.number,
        AuthNumber: state.Auth.watchlist,
    }
}

export default connect(mapStateToProps, {fetchStockList, setSelected, changeNumber})(Watchlist);
