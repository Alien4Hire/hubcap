// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { TVChartContainer } from '../../components/TVChartContainer/index';
import SimpleBar from 'simplebar-react';
import CryptoCards from './CryptoCards';
import CryptoListData from './CryptoList';

const CryptoCharts = () => {
    const [symbol, setSymbol] = useState('TECHNOLOGY');
    const [pickedCard, setPickedCard] = useState(null);
    const [selectedCard, setSelectedCard] = useState(CryptoListData.CryptoList.map(() => 'tilebox-one'));
    // console.log(CryptoListData.CryptoList);

    const pickACard = (index) => {
        setSelectedCard(index);
        // console.log(selectedCard + index);
    };

    const cardNumber = (index) => {
        const holdSelectedCard = CryptoListData.CryptoList.map(() => 'tilebox-one');
        holdSelectedCard[index] = 'tilebox-two tilebox-one';
        setSelectedCard(holdSelectedCard);
        // console.log('it worked', holdSelectedCard);
    };

    const updateChart = () => {
        let selectedIndex = 0;
        selectedCard.forEach((theCard, cardIndex) => {
            if (theCard === 'tilebox-two tilebox-one') {
                selectedIndex = cardIndex;
                setSymbol(CryptoListData.CryptoList[cardIndex].Crypto);
            }
        });
        // props.history.push(allPaths[selectedIndex]);
        console.log(symbol);
    };

    useEffect(() => {
        updateChart();
    }, [selectedCard, symbol]);
    return (
        <React.Fragment>
            <Row>
                <Col xl={3} lg={4}>
                    <SimpleBar style={{ maxHeight: '900px', width: '100%' }}>
                        {CryptoListData.CryptoList.map((CryptoListItem, index) => (
                            <CryptoCards
                                pickedCard={pickedCard}
                                setPickedCard={setPickedCard}
                                key={CryptoListItem.Crypto + selectedCard[index]}
                                {...CryptoListItem}
                                listItem={CryptoListItem}
                                onClick={() => {
                                    pickACard(index);
                                }}
                                changeCard={cardNumber}
                                currentCard={selectedCard[index]}
                                index={index}
                                selectedCard={selectedCard}
                                setSelectedCard={setSelectedCard}
                            />
                        ))}
                    </SimpleBar>
                </Col>
                <Col xl={9} lg={8}>
                    <TVChartContainer style={{ maxHeight: '800px', width: '80%' }} symbol={symbol} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CryptoCharts;
