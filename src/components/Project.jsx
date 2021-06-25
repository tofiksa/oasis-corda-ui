import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'

const Project = props => {

const [account, setAccount] = useState(JSON.parse(localStorage.getItem(props.match.params.title)));

const getBalancesFromAccount = () => {

    let arrBalances = [];

    for (var index in account) {
        var currency = index.substring(0,3);
        arrBalances.push({currencyKey: currency, amount: account[index].total});
    }

    return arrBalances;
}

return (
        
    <div>
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
    </div>
);
    
}

export default Project