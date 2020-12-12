/** @format */

import React from 'react';
import {
  CardElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Row,
  Col,
  Input,
  Label,
} from 'reactstrap';
import WhiteNavbar from 'components/Navbars/WhiteNavbar.js';
// core components

function SectionSharing() {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  console.log(process.env.REACT_APP_STRIPE_KEY);
  return (
    <>
      <WhiteNavbar />
      <div className="section-payment" id="enter-payment">
        <Label>First Name</Label>
        <Input></Input>
        <Label>Last Name</Label>
        <Input></Input>
        <Label>Zip Code</Label>
        <Input></Input>
        <Elements stripe={stripePromise}>
          <CardExpiryElement />
          <CardCvcElement />
        </Elements>
        <Button>Save</Button>
      </div>
    </>
  );
}

export default SectionSharing;
