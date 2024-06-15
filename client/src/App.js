import React, { useState, useEffect } from "react";
import Web3 from "web3";
import MCToken from "./contracts/MCToken.json";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [approveSpender, setApproveSpender] = useState("");
  const [approveAmount, setApproveAmount] = useState("");
  const [allowanceOwner, setAllowanceOwner] = useState("");
  const [allowanceSpender, setAllowanceSpender] = useState("");
  const [allowanceAmount, setAllowanceAmount] = useState("");
  const [balanceAddress, setBalanceAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [mintRecipient, setMintRecipient] = useState("");
  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        try {
          // Initialize web3 with MetaMask provider
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);
  
          // Request access to user accounts
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);
  
          // Fetch network ID
          const networkId = await web3.eth.net.getId();
          console.log("Connected to network ID:", networkId.toString());
  
          // Check if contract is deployed on this network
          const deployedNetwork = MCToken.networks[networkId];
          if (!deployedNetwork) {
            throw new Error(`Contract not deployed on network with id ${networkId}`);
          }
  
          // Instantiate contract
          const contract = new web3.eth.Contract(
            MCToken.abi,
            deployedNetwork.address
          );
          setContract(contract);
  
          // Fetch contract data
          const owner = await contract.methods.owner().call();
          setOwner(owner);
  
          const name = await contract.methods.name().call();
          setTokenName(name);
  
          const symbol = await contract.methods.symbol().call();
          setTokenSymbol(symbol);
  
          const supply = await contract.methods.totalSupply().call();
          setTotalSupply(web3.utils.fromWei(supply.toString(), 'ether'));
          console.log("Total supply", totalSupply);
        } catch (error) {
          console.error("Error connecting to MetaMask or loading contract:", error);
        }
      } else {
        console.error("MetaMask not found");
      }
    }
  
    init();
  }, []);
  
  
  async function getAccounts() {
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
    } else {
      console.error("Web3 instance not initialized.");
    }
  }
  const getBalance = async () => {
    if (!web3.utils.isAddress(balanceAddress)) {
      alert("Invalid address");
      return;
    }

    try {
      const balance = await contract.methods.balanceOf(balanceAddress).call();
      setBalance(web3.utils.fromWei(balance.toString(), 'ether'));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };
  
  const mintTokens = async () => {
    await contract.methods
    .mint(mintRecipient, web3.utils.toWei(mintAmount, 'ether'))
    .send({ from: accounts[0] });
  };


  const transferTokens = async () => {
    if (!web3.utils.isAddress(transferTo)) {
      alert("Invalid recipient address");
      return;
    }

    try {
      await contract.methods
        .transfer(transferTo, web3.utils.toWei(transferAmount, 'ether'))
        .send({ from: accounts[0] });
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  };
  const burnTokens = async () => {
    try {
      await contract.methods.burn(web3.utils.toWei(burnAmount, 'ether')).send({ from: accounts[0] });
    } catch (error) {
      console.error("Error burning tokens:", error);
    }
  };

  const approveTokens = async () => {
    try {
      await contract.methods
        .approve(approveSpender, web3.utils.toWei(approveAmount, 'ether'))
        .send({ from: accounts[0] });
    } catch (error) {
      console.error("Error approving tokens:", error);
    }
  };
  const transferFromTokens = async () => {
    try {
      await contract.methods
        .transferFrom(allowanceOwner, accounts[0], web3.utils.toWei(allowanceAmount, "ether"))
        .send({ from: allowanceSpender });
      console.log("Tokens transferred successfully");
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  };
  const checkAllowance = async () => {
    if (!web3.utils.isAddress(allowanceOwner) || !web3.utils.isAddress(allowanceSpender)) {
      alert("Invalid address");
      return;
    }

    try {
      const amount = await contract.methods
        .allowance(allowanceOwner, allowanceSpender)
        .call();
      setAllowanceAmount(web3.utils.fromWei(amount.toString(), 'ether'));
    } catch (error) {
      console.error("Error checking allowance:", error);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body h1 ">TOKEN EXCHANGE PLATFORM</div>
      </div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h3">
            {" "}
            <h2>
              Token Name: {tokenName} ({tokenSymbol})
            </h2>
            <p>Owner: {owner}</p>
            <p>Total Supply: {totalSupply}</p>
          </span>
        </div>
      </nav>

      <h2>Fetch Accounts</h2>
      <button type="button" className="btn btn-info" onClick={getAccounts}>Get Accounts</button>
      <ul className="list-group mt-3">
        {accounts.map((account, index) => (
          <li key={index} className="list-group-item">
            {account}
          </li>
        ))}
      </ul>
      <br />

      <h2>Fetch Balance</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={balanceAddress}
          onChange={(e) => setBalanceAddress(e.target.value)}
          placeholder="Address"
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={getBalance}>Get Balance</button>
      <p>Balance: {balance}</p>
      <input
        type="text"
        value={mintAmount}
        onChange={(e) => setMintAmount(e.target.value)}
        placeholder="Amount to mint"
      />
      <h2>Mint Tokens</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={mintRecipient}
          onChange={(e) => setMintRecipient(e.target.value)}
          placeholder="Recipient address"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
          placeholder="Amount to mint"
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={mintTokens}>
        Mint
      </button>

     <h2>Transfer Tokens</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
          placeholder="Recipient address"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          placeholder="Amount to transfer"
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={transferTokens}>Transfer</button>

      <div className="col-md-6">
          <div className="card p-4">
            <h2 className="mb-4">Transfer From Accounts</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={allowanceOwner}
                onChange={(e) => setAllowanceOwner(e.target.value)}
                placeholder="Owner address"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={allowanceSpender}
                onChange={(e) => setAllowanceSpender(e.target.value)}
                placeholder="Spender address"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={allowanceAmount}
                onChange={(e) => setAllowanceAmount(e.target.value)}
                placeholder="Amount to transfer"
              />
            </div>
            <button className="btn btn-primary" onClick={transferFromTokens}>
              Transfer from another account
            </button>
          </div>
        </div>
      <h2>Burn Tokens</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={burnAmount}
          onChange={(e) => setBurnAmount(e.target.value)}
          placeholder="Amount to burn"
        />
      </div>
      <button className="btn btn-danger mb-3" onClick={burnTokens}>Burn</button>

      <h2>Approve Tokens</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={approveSpender}
          onChange={(e) => setApproveSpender(e.target.value)}
          placeholder="Spender address"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={approveAmount}
          onChange={(e) => setApproveAmount(e.target.value)}
          placeholder="Amount to approve"
        />
      </div>
      <button className="btn btn-success mb-3" onClick={approveTokens}>Approve</button>

      <h2>Check Allowance</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={allowanceOwner}
          onChange={(e) => setAllowanceOwner(e.target.value)}
          placeholder="Owner address"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={allowanceSpender}
          onChange={(e) => setAllowanceSpender(e.target.value)}
          placeholder="Spender address"
        />
      </div>
      <button className="btn btn-info mb-3" onClick={checkAllowance}>Check Allowance</button>
      <p>Allowance: {allowanceAmount}</p>
    </div>
  );
}

export default App;
