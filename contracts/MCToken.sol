// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MCToken is ERC20, ERC20Burnable, Ownable {
    bool private _paused;

    event Paused(address account);
    event Unpaused(address account);

    event Initialized(string name, string symbol, uint256 totalSupply);

    constructor() ERC20("Momo Coin", "MOC") Ownable() {
        _paused = false;
        uint256 initialSupply = 1000 * 10 ** decimals();
        _mint(msg.sender, initialSupply);
        emit Initialized("Momo Coin", "MOC", initialSupply);
    }

    modifier whenNotPaused() {
        require(!_paused, "MCToken: paused");
        _;
    }

    modifier whenPaused() {
        require(_paused, "MCToken: not paused");
        _;
    }

    function paused() public view returns (bool) {
        return _paused;
    }

    function pause() public onlyOwner whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    function unpause() public onlyOwner whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }

    function transfer(address recipient, uint256 amount) public virtual override whenNotPaused returns (bool) {
        return super.transfer(recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override whenNotPaused returns (bool) {
        return super.transferFrom(sender, recipient, amount);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
