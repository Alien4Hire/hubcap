/** @format */
import WhiteNavbar from 'components/Navbars/WhiteNavbar.js';

import React, { useEffect, useState, Component } from 'react';
import { Button } from 'reactstrap';
import Cards from 'react-credit-cards';
import api from '../../utils/api';
import Select from 'react-select';
import 'react-credit-cards/lib/styles.scss';
import { set } from 'lodash';

const SectionSharing = (data) => {
  // const { data } = this.props.location;
  console.log(data.location.data);
  const [planSelector, setPlanSelector] = useState(data.location.data);
  //inputs
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zip, setZip] = useState('');
  const [number, setNumber] = useState('');
  //Labels
  const [cvcLabel, setCvcLabel] = useState('inputLabel hidden');
  const [expiryLabel, setExpiryLabel] = useState('inputLabel hidden');
  const [firstNameLabel, setFirstNameLabel] = useState('inputLabel hidden');
  const [lastNameLabel, setLastNameLabel] = useState('inputLabel hidden');
  const [zipLabel, setZipLabel] = useState('inputLabel hidden');
  const [numberLabel, setNumberLabel] = useState('inputLabel hidden');
  //plans
  const [plan, setPlan] = useState(data.location.data);

  const options = [
    { value: '0', label: 'Basic(Free)' },
    { value: '1', label: 'Personal(Monthly)' },
    { value: '2', label: 'Business(Monthly)' },
    { value: '3', label: 'Personal(Yearly)' },
    { value: '4', label: 'Business(Yearly)' },
  ];
  // console.log(options);
  //set selected
  const setSelected = () => {};
  //submit
  const [payment, setPayment] = React.useState({
    name: name,
    firstName: firstName,
    lastName: lastName,
    cardNumber: number,
    expDate: expiry,
    cvc: cvc,
    zip: zip,
    plan: plan,
  });
  const [planNumber, setPlanNumber] = useState('');
  // console.log(payment);

  const paymentUpdated = () => {
    setPayment({
      name: name,
      firstName: firstName,
      lastName: lastName,
      cardNumber: number,
      expDate: expiry,
      cvc: cvc,
      zip: zip,
      plan: plan,
    });
  };
  //update first name
  const handleFirstNameFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleFirstNameChange = (e) => {
    const { name, value } = e.target;
    setFirstName(value);
    if (value) {
      setFirstNameLabel('inputLabel');
    } else {
      setFirstNameLabel('inputLabel hidden');
    }
  };

  //update Last name
  const handleLastNameFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleLastNameChange = (e) => {
    const { name, value } = e.target;
    setLastName(value);
    if (value) {
      setLastNameLabel('inputLabel');
    } else {
      setLastNameLabel('inputLabel hidden');
    }
  };

  //update zip code name
  const handleZipFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleZipChange = (e) => {
    const { name, value } = e.target;
    setZip(value);
    if (value) {
      setZipLabel('inputLabel');
    } else {
      setZipLabel('inputLabel hidden');
    }
  };

  //update Credit Card #
  const handleCardFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setNumber(value);
    if (value) {
      setNumberLabel('inputLabel');
    } else {
      setNumberLabel('inputLabel hidden');
    }
  };
  //update exp date
  const handleExpFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleExpChange = (e) => {
    const { name, value } = e.target;
    setExpiry(value);
    if (value) {
      setExpiryLabel('inputLabel');
    } else {
      setExpiryLabel('inputLabel');
    }
    var v = value;
    if (v.includes('/') == false) {
      if (v.length === 4) {
        var a = v.substr(0, 2);
        var ae = v.charAt(v.length - 2) + v.charAt(v.length - 1);
        e.target.value = a + '/' + ae;
      }
    }
  };

  //update cvv date
  const handleCvvFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleCvvChange = (e) => {
    const { name, value } = e.target;
    setCvc(value);
    setCvcLabel('inputLabel');
  };

  //update cvv date
  const handlePlanFocus = (e) => {
    setFocus(e.target.name);
  };

  const handlePlanChange = (e) => {
    const { name, value } = e.target;
    setPlan(value);
  };

  const myName = (e) => {
    setName(firstName + ' ' + lastName);
  };

  //submit data
  const submitCard = (ev) => {
    console.log(ev);
    ev.preventDefault();

    try {
      api.post('/api/stripe', payment).then((result) => {
        window.location.href = process.env.REACT_APP_REDIRECT_URI;
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(
    (e) => {
      myName(e);
    },
    [firstName, lastName]
  );

  useEffect(() => {
    paymentUpdated();
  }, [firstName, lastName, number, expiry, cvc, zip, plan]);

  ////styles

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Martel+Sans:wght@300&display=swap');
      </style>
      <WhiteNavbar />
      <div className="section">
        <div className="PaymentForm">
          <div className="form-container">
            <h4 className="form-header">Update your credit or debit card.</h4>
            <a href="/" className="link-card">
              <i className="fa fa-chevron-left" /> Change payment method
            </a>
            <br></br>
            <form className="creditForm" onSubmit={submitCard}>
              <div className="text-center">
                <i className="fa fa-cc-stripe fa-pay mr-1" />
                <i className="fa fa-cc-visa fa-pay mr-1" />
                <i className="fa fa-cc-mastercard fa-pay mr-1" />
                <i className="fa fa-cc-discover fa-pay mr-1" />
                <i className="fa fa-cc-amex fa-pay padding-right" />

                <br />
              </div>
              <div className="float-container">
                <label className={firstNameLabel}>First Name:</label>
                <input
                  type="name"
                  name="firstname"
                  placeholder="First Name"
                  onChange={handleFirstNameChange}
                  onFocus={handleFirstNameFocus}
                  className="forminput"
                  required
                />
              </div>
              <div className="float-container">
                <label className={lastNameLabel}>Last Name:</label>
                <input
                  type="name"
                  name="lastname"
                  placeholder="Last Name"
                  onChange={handleLastNameChange}
                  onFocus={handleLastNameFocus}
                  className="forminput"
                  required
                />
              </div>
              <div className="float-container">
                <label className={zipLabel}>Billing Zip Code:</label>
                <input
                  type="zip"
                  name="zipcode"
                  placeholder="Billing Zip Code"
                  onChange={handleZipChange}
                  onFocus={handleZipFocus}
                  className="forminput"
                  required
                />
              </div>
              <div className="float-container">
                <label className={numberLabel}>Card Number:</label>
                <input
                  type="text"
                  name="number"
                  placeholder="Card Number"
                  onChange={handleCardChange}
                  onFocus={handleCardFocus}
                  className="forminput"
                  maxLength={16}
                  required
                />
              </div>
              <div className="float-container">
                <label className={expiryLabel}>Expiration Date(MM/YY):</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiration Date(MM/YY)"
                  onChange={handleExpChange}
                  onFocus={handleExpFocus}
                  className="forminput"
                  maxLength="5"
                  required
                />
              </div>
              <div className="float-container">
                <label className={cvcLabel}>Security Code(CVV):</label>
                <input
                  type="cvc"
                  name="cvc"
                  placeholder="Security Code(CVV)"
                  onChange={handleCvvChange}
                  onFocus={handleCvvFocus}
                  className="forminput"
                  maxLength="4"
                  required
                />
              </div>
              <div className="float-container smaller-drop">
                <select
                  className="forminputDropdown"
                  type="plan"
                  name="plan"
                  placeholder=""
                  className="forminput"
                  maxLength="4"
                  value={planSelector}
                  onChange={handlePlanChange}
                  onFocus={handlePlanFocus}
                >
                  {options.map((option, index) => (
                    <option
                      key={option.label + option[index]}
                      {...option}
                      value={option.value}
                      label={option.label}
                    ></option>
                  ))}
                </select>
              </div>
              <Button className="save-button" type="submit">
                Save
              </Button>
            </form>
          </div>
          <div className="right-card">
            <Cards
              cvc={cvc}
              expiry={expiry}
              focused={focus}
              name={name}
              number={number}
              className="creditCard"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default SectionSharing;
