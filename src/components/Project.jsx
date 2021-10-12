import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'

const Project = props => {

//console.log("PROPS PROJECT: ", props);

const getBalancesFromAccount = () => {
  let arrBalances = [];
  if (props.props.tokenUriBalanceMap) {

    for (var index in props.props.tokenUriBalanceMap) {
        var currency = index.substring(0,3);
        arrBalances.push({currencyKey: currency, amount: props.props.tokenUriBalanceMap[index].total});
    }

    
  }
  return arrBalances;
}



return (

  <CardGroup>
  <Card>
  <Card.Header>
    <Nav variant="tabs" defaultActiveKey="#overview">
      <Nav.Item>
        <Nav.Link href="#overview">Overview</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#technical">Technical</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#social">Social</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#financial">Financial</Nav.Link>
      </Nav.Item>
    </Nav>
  </Card.Header>
  <Card.Body>
  <Container>
    <Row>
      <Col>
      <Row>
        <Col><h6>Name</h6>{ props.props.project.address ?  props.props.project.address.accountId : <h2>Choose a project</h2> }</Col>
        <Col><h6>Start</h6>{ props.props.project.tags ?  props.props.project.tags[6].value : <h2>Choose a project</h2> }</Col>
      </Row>
      <Row>
        <Col><h6>Type</h6>{ props.props.project.tags ?  props.props.project.tags[2].value : <h2>Choose a project</h2> }</Col>
        <Col><h6>Operation</h6>{ props.props.project.tags ?  props.props.project.tags[7].value : <h2>Choose a project</h2> }</Col>
      </Row>
      <Row>
        <Col><h6>Grid</h6>{ props.props.project.tags ?  props.props.project.tags[9].value : <h2>Choose a project</h2> }</Col>
        <Col><h6>Organization</h6>{ props.props.project.tags ?  props.props.project.tags[8].value : <h2>Choose a project</h2> }</Col>
      </Row>
      </Col>
      <Col></Col>  
      </Row>
    </Container>
  </Card.Body>
</Card>
<Card>
    <Card.Body>
      <Card.Title>Funding status</Card.Title>
      Funded {Array.from({ length: getBalancesFromAccount().length }).map((_, index) => (
              <strong key={index}>{getBalancesFromAccount()[index].currencyKey} {getBalancesFromAccount()[index].amount} </strong>
            ))}
             of 1.000.000 as of 2022-05-19

    </Card.Body>
  </Card>
</CardGroup>
      
);
}

export default Project