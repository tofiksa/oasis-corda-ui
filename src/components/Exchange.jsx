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
import {BASE_OAS_API_URL} from '../config/url'
import axios from "axios";
import { useAppContext } from "../config/contextLib";


const api = axios.create({
    baseURL: BASE_OAS_API_URL,
  });

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
    const [isBusy, setBusy] = useState(true)
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
            console.log(response);
          }
          }).catch((error) => {
            console.log(Promise.reject(error));
          });
        
        console.log("Er det noe her: ", accounts);
        
      } catch (e) {
        alert(e.message);
      }
    }
  
    async function handleSubmit(event) {
      event.preventDefault();
      setLoading(true);
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
      console.log("project choice: ", project);
      console.log("User: ", userHasAuthenticated);

    }
    
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
              {/* <Form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">From</span>
                  </div>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Sender's username" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">To</span>
                  </div>
                  <input type="text" value={project} onChange={(e) => setProject(e.target.value)} className="form-control" placeholder="Recipient's project" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Amount</span>
                  </div>
                  <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control" aria-label="Amount (to the nearest dollar)"/>
                  <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                  </div>
                </div> */}
                 {!isBusy && 
                <FormControl as="select" onChange={(e) => handleProjectChoice(setProject(e.target.value))}>
                  {ledgerAccounts && ledgerAccounts.accounts.data.map((e, key) => {
                    return <option key={key} value={e.address.accountId}>{e.address.accountId}</option>;
                })}
                {isBusy && 
                <Backdrop className={classes.backdrop} open>
                  <CircularProgress color="inherit" />
                </Backdrop>
                }
                </FormControl>
                
                
                }
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
         
          
            
        </div>
    );
}