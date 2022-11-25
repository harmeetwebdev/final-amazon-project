import React from "react";
import { Col, Row } from "react-bootstrap";

export default function CheckoutSteps(props) {
    return <Row className="checkout-steps">
        <Col className={props.step1 ? 'active' : ''}>Sign in</Col>
        <Col className={props.step2 ? 'active' : ''}>shipping</Col>
        <Col className={props.step3 ? 'active' : ''}>payment</Col>
        <Col className={props.step4 ? 'active' : ''}>Place order</Col>
    </Row>
}