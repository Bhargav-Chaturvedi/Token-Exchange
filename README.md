Here's your **ready-to-copy `README.md` file** for the **TokenExchange** project 👇

---

````markdown
# 💱 TokenExchange – Momo Coin (MOC)

A decentralized token management dApp using **Solidity**, **React**, and **Truffle**, featuring custom ERC-20 token functionality (Momo Coin - MOC). Users can mint, transfer, burn tokens, approve spending, and check allowances — all through a user-friendly React interface.

---

## 🚀 Features

- Mint new tokens to any address
- Transfer tokens to other accounts
- Burn tokens from the caller’s account
- Approve allowances for delegated spending
- Transfer tokens via `transferFrom` if approved
- Check token balance and allowance of addresses
- Pause/unpause contract (onlyOwner)

---

## 🧱 Tech Stack

- **Frontend:** React.js, Bootstrap
- **Blockchain:** Solidity, Truffle, Ganache
- **Libraries:** Web3.js, OpenZeppelin Contracts (ERC20, Ownable)

---

## 🔐 Smart Contract – `MCToken.sol`

ERC20 token with additional features:

- Pausable transfers (`pause()` / `unpause()` by owner)
- Mintable by owner
- Burnable by any token holder
- Standard ERC20 functionality (transfer, approve, allowance, transferFrom)

```solidity
constructor() ERC20("Momo Coin", "MOC") { ... }
function mint(address to, uint256 amount) public onlyOwner;
function burn(uint256 amount) public;
function pause() public onlyOwner;
function unpause() public onlyOwner;
````

---

## 🖥️ React Frontend Functionalities

Users can:

* Connect via MetaMask
* View token name, symbol, owner, total supply
* View account balances
* Mint MOC to any address
* Transfer MOC tokens
* Burn tokens
* Approve tokens for other accounts
* TransferFrom tokens as approved spender
* Check allowance between two addresses

---

## 📁 Project Structure

```
tokenexchange/
├── contracts/
│   └── MCToken.sol
├── migrations/
│   └── 1_deploy_contracts.js
├── src/
│   ├── App.js
│   └── contracts/
│       └── MCToken.json
├── package.json
├── truffle-config.js
```

---

## ⚙️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tokenexchange.git
cd tokenexchange
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Ganache (Local Blockchain)

Make sure Ganache is running at:

```
http://127.0.0.1:7545
```

### 4. Compile and Deploy Contracts

```bash
truffle compile
truffle migrate --reset
```

### 5. Start the React App

```bash
npm start
```

> Make sure MetaMask is connected to your local Ganache network and has imported some test accounts.

---

## 📝 License

MIT License

---

## 👨‍💻 Author

**Bhargav Nandan Chaturvedi**

```
