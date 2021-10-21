import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TransferService from "../services/transferservice";

export default function Exchange() {

    const [username, setUsername] = useState("");
    const [project, setProject] = useState("");
    const [amount, setAmount] = useState("");
    const [tokensymbol,setTokensymbol] = useState("USD");

    function validateForm() {
        return username.length > 0 && project.length > 0 && amount.length > 0;
      }
    
      async function handleSubmit(event) {
        event.preventDefault();
      
        try {
          console.log("This is typed: ", username, project, amount);
          await TransferService.transfer(username,project,amount,tokensymbol);
        } catch (e) {
          alert(e.message);
        }
      }

    
        return (
            <div className={"container"}>
                <Form onSubmit={handleSubmit}>
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
                
                <input type="text" value={tokensymbol} onChange={(e) => setTokensymbol(e.target.value)} className="form-control" aria-label="Tokentype"/>
                </div>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
            Send
          </Button>
          </Form>
          </div>
        );
}