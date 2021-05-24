import React, { useState } from 'react';

const Account = props => {

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
        <ul>{getBalancesFromAccount().map( amounts => <li key={amounts.currencyKey}>{amounts.amount} {amounts.currencyKey}</li>)}</ul>
    </div>
);
    
}

export default Account