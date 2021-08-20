import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 101, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.seedMoney().send({ from: accounts[0], value: "1000000000000000000"});

    // await contract.methods.pay().send({from: accounts[0], value: "1000000000000000000"})

    

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.test_1().call();
    const response = 2;

    // await contract.methods.transfer_to_account().call();
    // const result = await contract.methods.Match().send({ from: accounts[0], value: "100000000000000000"});

    const balance = await contract.methods.get_contract_balance().call();
    const address = await contract.methods.get_contract_address().call();

    // Update state with the result.
    this.setState({ storageValue: response, balance: balance, address: address });
  };

  add_seed_money = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.seedMoney().send({ from: accounts[0], value: "1000000000000000000"});
    this.setState(this.runExample)
  }

  start_bet = async () => {
    const { accounts, contract } = this.state;
    const result = await contract.methods.Match().send({ from: accounts[0], value: "100000000000000000"});
    if(result) {
      console.log(result)
      alert("Win ig")
    }
    else {
      alert("mkc :(")
    }

    this.setState(this.runExample)
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <button
          onClick = {this.add_seed_money}
          >Add Seed Money</button>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        <div>Amount in contract should be: {this.state.balance}</div>
        <div>Address of Contract: {this.state.address}</div>

        <button
          onClick = {this.start_bet}
          >Start a Random Bet</button>
      </div>
    );
  }
}

export default App;
