import React, { useState,useEffect } from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert';
import TransferService from "../services/transferservice";
import LedgerAccountService from "../services/ledgerAccountservice";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {BASE_OAS_API_URL, BASE_API_URL} from '../config/url'
import axios from "axios";
import { useAppContext } from "../config/contextLib";


const api = axios.create({
    baseURL: BASE_OAS_API_URL,
  });

const daslaAPI = axios.create({
  baseURL: BASE_API_URL,
})

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



export default function Exchange() {

    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [project, setProject] = useState("");
    const [amount, setAmount] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [ledgerAccounts, setLedgerAccounts] = useState({});
    const [getBalance, setBalance] = useState({});
    const [isBusy, setBusy] = useState(true);
    const [isChoosingProject, setChoosingProject] = useState(false);
    const [currencyUnit, setCurrencyUnit] = useState([]);
    const { userHasAuthenticated } = useAppContext();

    function validateForm() {
        return username.length > 0 && project.length > 0 && amount.length > 0;
      }

    useEffect(() => {
      
    fetchData();
    }, []);

    async function fetchData() {
      setBusy(true);
      try {
        /* const accounts = await LedgerAccountService.ledgerAccount().then(result => setLedgerAccounts({
          accounts: result
        })); */

        const accounts=api({
          method: 'get',
          headers: { 
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            url: 'GetAccountsResultsAsync'
            
        }).then((response) => {
          if(response.status === 200) {
            setLedgerAccounts({
              accounts: response
            });
            setBusy(false);
            console.log("hepphepp:", response.data.map(res => res.tags.filter(rs => (!rs.value.includes("person")))));
          }
          }).catch((error) => {
            console.log(Promise.reject(error));
          });
        
        console.log("Er det noe her: ", accounts);
        
      } catch (e) {
        alert(e.message);
      }
    }

    async function getBalances(accountId) {
      if (!accountId)
        accountId = 'Naivasha';

      daslaAPI({
        method: 'get',
        headers: {'Authorization': localStorage.getItem("authstring")},
        url: `/ledger/accounts/${accountId}/balances`
      }).then((resp) => {
        setBalance(resp.data.tokenUriBalanceMap);
        console.log("balances ", getBalance);
      });
  }
  
    async function handleSubmit(event) {
      event.preventDefault();
      setLoading(true);
      
      //let result = text.match(/^[A-Z]*/g);
      try {
        console.log("This is typed: ", username, project, amount);
        const transferResponse = await TransferService.transfer(username,project,amount,"USD");
        console.log("Transferlog: ", transferResponse);
        
        setLoading(false);
        setShow(true)
        
      } catch (e) {
        alert(e.message);
      }
      handleReset();
    }

    const handleReset = () => {
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
      setUsername("");
      setProject("");
      setAmount("");
    };

    if (!isBusy) {
      console.log("blabla: ",ledgerAccounts);
    }

    function handleProjectChoice(e) {
      setProject(e);
      
      setChoosingProject(true);
      getBalances(e);
      
      const currencyUnits = getBalance;
      if (currencyUnits) {
        let arrBalances = [];
        for (var index in currencyUnits) {
            var currency = index.match(/^[A-Z]*/g);
            arrBalances.push(currency);
        }
        setCurrencyUnit(arrBalances);
      }

    }

    console.log("Currency: ", currencyUnit);
    
    return (
      
        <div className={"container"}>
          <Alert show={show} variant="success">
          <Alert.Heading>Transfer Successful</Alert.Heading>
          <p>
            The amount of {amount} has been transfered to project {project} succesfully.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Hide
            </Button>
          </div>
        </Alert>
        <Form onSubmit={handleSubmit}>
                 {!isBusy && 
                <FormControl as="select" onChange={(e) => handleProjectChoice(e.target.value)}>
                  {ledgerAccounts && ledgerAccounts.accounts.data.map((e, key) => {
                    return <option key={key} value={e.address.accountId}>{e.address.accountId}</option>;
                })}
                </FormControl>
                }
                {isChoosingProject && 
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">From</span>
                </div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Sender's username" aria-label="Username" aria-describedby="basic-addon1"/>
                <div className="input-group-prepend">
                  <span className="input-group-text">Amount</span>
                </div>
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control" aria-label="Amount (to the nearest dollar)"/>
                <div className="input-group-append">
                  <span className="input-group-text"><select onChange={(event) => handleProjectChoice(event.target.value)}>{currencyUnit && currencyUnit.map((event,key) => {
                    return (<option key={key} value={event}>{event}</option>);
                  })}</select></span>
                </div>
              </div>}
                {!isLoading && <Button block size="lg" type="submit" disabled={!validateForm()}>
                  Send
              </Button>}
              {isLoading && 
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Transfering...
                </Button> }
                </Form>

                {isBusy && 
                <Backdrop className={classes.backdrop} open>
                  <CircularProgress color="inherit" />
                </Backdrop>
                }
        </div>
    );
}