//SPDX-License-Identifier: Unlicense
// 0x7c29bf39DE0E3b82F99673425A739a77574CD1A7
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract socialdapp {
    struct Image{
        uint id;
        string cid;
        string des;
        address author;
        uint tip;
    }
    uint public imgCount=0;
    mapping(uint => Image) public images;

    function addImages ( string memory _cid, string memory _des ) public {
        console.log(imgCount);
        require(bytes(_cid).length > 0, "Zero hash not valid");
        require(bytes(_des).length > 0, "Nothing in description");
        console.log(imgCount);
        imgCount += 1;
        images[imgCount] = Image(imgCount ,_cid, _des, msg.sender,0);
    }

    function getTips(uint _id) payable public {
        address payable to_send = payable(images[_id].author);
        to_send.transfer(msg.value);
        images[_id].tip += msg.value;
    }
}
