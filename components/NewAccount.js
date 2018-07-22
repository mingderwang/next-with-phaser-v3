import React from 'react';
import Web3 from 'web3';

class Web3console extends React.Component {

    constructor() {
        super();
        this.state = {
            accounts: '',
            privateKey: '',
            showProviateKey: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleShowPrivateKey = this.handleShowPrivateKey.bind(this);
    }

    componentWillMount() {
       var web3;
        if (typeof Web3 !== 'undefined') { 
            web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("http://localhost:8545")); 
            console.log(this.web3); 
        } else {
            console.log('no web3.js import'); 
        }
        this.web3 = web3;
        var newAddress = web3.eth.accounts.create(web3.utils.randomHex(32));
        this.setState({ accounts: newAddress.address, privateKey: newAddress.privateKey });
        console.log(newAddress)
    }

    handleClick() {
        this.web3.eth.getAccounts().then(console.log);
        var newAddress = this.web3.eth.accounts.create(this.web3.utils.randomHex(32));
        this.setState({ accounts: newAddress.address, privateKey: newAddress.privateKey });
    }

    handleShowPrivateKey() {
        this.setState({ showProviateKey: !this.state.showProviateKey });
    }

    render() {
        var { accounts, privateKey, showProviateKey } = this.state
        return (
            <div>
                <button onClick={this.handleClick}>
                    Create a new account
      i         </button>
                <h1>Address:</h1><p />
                <h2>{accounts}</h2>
                <button onClick={this.handleShowPrivateKey}>
                    Show private key, or not
      i         </button>
                <h1>Private Key:</h1><p />
                <h3>{showProviateKey ? privateKey : 'not to show'}</h3>
            </div>
        );
    }
}

export default Web3console;