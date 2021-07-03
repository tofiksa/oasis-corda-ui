import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

const Project = props => {

//const [account, setAccount] = useState(JSON.parse(localStorage.getItem(props.match.params.title)));

/* const getBalancesFromAccount = () => {

    let arrBalances = [];

    for (var index in account) {
        var currency = index.substring(0,3);
        arrBalances.push({currencyKey: currency, amount: account[index].total});
    }

    return arrBalances;
} */
console.log("PROPS PROJECT: ", props);

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
      <Nav.Item>
        <Nav.Link href="#disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </Card.Header>
  <Card.Body>
  
  </Card.Body>
</Card>
<Card>
    <Card.Body>
      <Card.Title>Funding status</Card.Title>

    </Card.Body>
  </Card>
</CardGroup>
        
    /* <div>
        <h2>{props.match.params.title}</h2>
  <Table responsive>
  <thead>
    <tr>
      {Array.from({ length: getBalancesFromAccount().length }).map((_, index) => (
        <th key={index}>{getBalancesFromAccount()[index].currencyKey}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    <tr>
      {Array.from({ length: getBalancesFromAccount().length }).map((_, index) => (          
        <td key={index}>{getBalancesFromAccount()[index].amount}</td>
      ))}
    </tr>
  </tbody>
</Table>
    </div> */
);
    
}

export default Project