// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;
  uint store_x;
  address payable account = 0xd025bb843c766f6d70AA9221f7532AD9Ae1FD0aB;
  address public owner;
  uint8 private clientCount;

  struct Bet {
    address payable player;
    uint amt;
  }

  Bet[] bets;

  // constructor() public payable {
  //       require(msg.value == 30 ether, "30 ether initial funding required");
  //       /* Set the owner to the creator of this contract */
  //       owner = msg.sender;
  //       clientCount = 0;
  // }

  function pay() public payable {}

  function () external payable {}


  function random(uint nonce) internal view returns (uint) {
    uint randomnumber = uint(keccak256(abi.encodePacked(msg.sender, nonce))) % 2;
    // randomnumber = randomnumber + 11;
    return randomnumber;
  }

  function seedMoney() public payable{
    require(msg.value >= 0.1 ether, "too low you poor son of a bitch");
  }

  function Match() public payable returns (uint){
    require(address(this).balance >= msg.value, "ether nhi h");
    bets.push(Bet(msg.sender, msg.value));

    uint rand = random(1);

    if(rand == 0) {
      return(0);
    }
    else {
      uint xx = msg.value * 2;
      account.transfer(xx);
      return(1);
    }

  }

  function set(uint x) public payable {
    storedData = x;
    store_x = random(uint(x));
    uint xx = msg.value / 2;
    account.transfer(xx);
  }

  function transfer_to_account() external payable {
    account.transfer(50000000000000000);
    // _addr.send(0.1 ether);
  }

  function get_contract_balance() public view returns (uint){
    return uint(address(this).balance);
  }

  function get_contract_address() public view returns (address) {
    return address(this);
  }

  // to transfer to smart contract
  //
}
