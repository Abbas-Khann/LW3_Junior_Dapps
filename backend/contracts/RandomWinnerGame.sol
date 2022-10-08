// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract RandomWinnerGame is VRFConsumerBase, Ownable {

    uint256 public fee;
    bytes32 public keyHash;
    address[] public players;
    uint8 public maxPlayers;
    bool public gameStarted;
    uint256 entryFee;
    uint256 public gameId;

    event GameStarted(uint256 gameId, uint8 maxPlayers, uint256 entryFee);
    event PlayerJoined(uint256 gameId ,address player);
    event GameEnded(uint256 gameId, address winner, bytes32 requestId);
    
    constructor(address vrfCoordinator,
     address linkToken,
     bytes32 vrfKeyHash,
      uint256 vrfFee)
      VRFConsumerBase(vrfCoordinator, linkToken)
    {
        keyHash = vrfKeyHash;
        fee = vrfFee;
        gameStarted = false;        
    }

    function startGame(uint8 _maxPlayers, uint256 _entryFee) public onlyOwner {
        require(
            !gameStarted, "Game is already running"
        );
        delete players;
        maxPlayers = _maxPlayers;
        entryFee = _entryFee;
        gameId++;
        emit GameStarted(gameId, maxPlayers, entryFee);
    }

    function joinGame() public payable {
        require(
            gameStarted == true,
            "Game has not been started yet!"
        );
        require(
            msg.value >= entryFee,
            "No broke people allowed in my game!!!"
        );
        require(
            players.length < maxPlayers,
            "Maximum Limit of players has exceeded!"
        );
        players.push(msg.sender);
        emit PlayerJoined(gameId, msg.sender);
        if (players.length == maxPlayers) {
            getRandomWinner();
        }
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal virtual override {
        uint256 winnerIdx = randomness % players.length;
        address winner = players[winnerIdx];
        uint256 _amount = address(this).balance;
        (bool sent,) = winner.call{value: _amount}("");
        require(sent, "Failed to send Ether!");
        emit GameEnded(gameId, winner, requestId);
        gameStarted = false;
    }

    function getRandomWinner() private returns (bytes32 requestId) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough Link tokens"
        );
        return requestRandomness(keyHash, fee);
    }

    receive() external payable {}
    fallback() external payable {}
}