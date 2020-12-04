import React, { useEffect, useState } from 'react';
import Cards from './UpgradeCard';
import { Container, Row, Col, Card, CardBody, Button, Form } from 'reactstrap';
import AllPlans from './AllPlans';

const LemmeUpgradeYa = (props) => {
    const [pickedCard, setPickedCard] = useState(null);
    const [path, setPath] = useState('/plans/basic');
    const [allPaths, setAllPaths] = useState(['/plans/basic', '/plans/personal', '/plans/business']);
    const [border, setBorder] = useState('profile-box-one');
    const [selectedPlan, setSelectedPlan] = useState(AllPlans.AllPlans.map(() => 'profile-box-one'));

    const pickACard = (index) => {
        // setPickedCard();
        setSelectedPlan(index);
        console.log(index);
    };

    const cardNumber = (index) => {
        const holdSelectedPlan = AllPlans.AllPlans.map(() => 'profile-box-one');
        holdSelectedPlan[index] = 'profile-box-two';
        setSelectedPlan(holdSelectedPlan);
        console.log('it worked', holdSelectedPlan);
        // if (index === selectedPlan) {
        //     setBorder('profile-box-two');
        //     return 'profile-box-two';
        // }
        // setBorder('profile-box-one');
        // return 'profile-box-one';
    };

    const pathButton = () => {
        let selectedIndex = 0;
        selectedPlan.forEach((thePlan, planIndex) => {
            if (thePlan === 'profile-box-two') {
                selectedIndex = planIndex;
            }
        });
        props.history.push(allPaths[selectedIndex]);
    };
    // useEffect(() => {
    //     cardNumber();
    // }, []);

    // useEffect(() => {
    //     cardNumber();
    // }, [selectedPlan]);

    return (
        <React.Fragment>
            <Card>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Martel+Sans:wght@300&display=swap');
                </style>
                <CardBody className="big-card-plan">
                    <h1 className="plan-title-one">Upgrade Plan</h1>
                    <Form>
                        {AllPlans.AllPlans.map((planItem, index) => (
                            <Cards
                                pickedCard={pickedCard}
                                changeBorder={cardNumber}
                                setPickedCard={setPickedCard}
                                key={planItem.plan + selectedPlan[index]}
                                {...planItem}
                                plans={planItem}
                                onClick={() => {
                                    pickACard(index);
                                }}
                                currentBorder={selectedPlan[index]}
                                index={index}
                                setSelectedPlan={setSelectedPlan}
                                selectedPlan={selectedPlan}
                            />
                        ))}
                        <Button onClick={pathButton}>Continue</Button>
                    </Form>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default LemmeUpgradeYa;
