import React, { useState, useEffect } from 'react';
import Cards from './UpgradeCard';
import { Card, CardBody, Button, Form } from 'reactstrap';
import AllPlans from './AllPlans';
import { API } from '../../services/api';
import moment from 'moment';
import {connect} from 'react-redux';

const LemmeUpgradeYa = (props) => {
    const [pickedCard, setPickedCard] = useState(null);
    const [user, setUser] = useState(props.user);
    const [daysSince, setDaysSince] = useState('30');
    // const [path, setPath] = useState('/plans/basic');
    const [allPaths, setAllPaths] = useState(['#', '/plans/personal', '/plans/business']);
    // const [border, setBorder] = useState('profile-box-one');
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

        // if (index === selectedPlan) {
        //     setBorder('profile-box-two');
        //     return 'profile-box-two';
        // }
        // setBorder('profile-box-one');
        // return 'profile-box-one';
    };

    const cardSelected = (r) => {
        const holdSelectedPlan = AllPlans.AllPlans.map(() => 'profile-box-one');
        holdSelectedPlan[r.plan - 1] = 'profile-box-two';
        setSelectedPlan(holdSelectedPlan);

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

    const roundToWhole = (value) => {
        return Number(value.toFixed(0));
    };

    useEffect(() => {
            setDaysSince(
                roundToWhole(30 - (moment().unix() - roundToWhole(new Date(user.date).getTime() / 1000)) / (60 * 60 * 24))
            );
            cardSelected(user);
        }, []);

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
                <h3 className="trial-reminder">You have {daysSince} days remaining of your free trial!</h3>
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

const mapStateToProps = (state) => {
    // console.log(state.Auth.user)
    return {user: state.Auth.user}
}

export default connect(mapStateToProps)(LemmeUpgradeYa);
