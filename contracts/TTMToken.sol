pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TTMToken is ERC20 {
    address public admin;
    uint256 public exchangeRate; 

    constructor() ERC20("To The Moon", "TTMToken") {
        _mint(msg.sender, 10000000);
        admin = msg.sender;
        exchangeRate = 1000;
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(recipient != address(this), "Cannot transfer to the contract itself");
        require(balanceOf(msg.sender) >= amount, "Not enough balance to transfer");
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function mint() public payable {
        uint256 tokens = msg.value * exchangeRate;
        _mint(msg.sender, tokens);
    }

    function setExchangeRate(uint256 newExchangeRate) public {
        require(msg.sender == admin, "Only the admin can set the exchange rate");
        exchangeRate = newExchangeRate;
    }

    function withdrawEther() public {
        require(msg.sender == admin, "Only the admin can withdraw Ether");
        payable(admin).transfer(address(this).balance);
    }

    
}
