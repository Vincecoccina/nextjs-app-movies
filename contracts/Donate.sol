// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract DonationContract{

    uint256 public totalDonations;
    address payable public owner;
   

    event DonationReceived(address indexed donor, uint256 amount);

    constructor(){
        owner = payable(msg.sender);
    }

    function donate() public payable{
        require(msg.value > 0, "The amount must be greater than 0");
        totalDonations += msg.value;
        emit DonationReceived(msg.sender, msg.value);
        owner.transfer(msg.value);
    } 
    
}