// USE SWEET-ALERT.JS FOR YOUR WIN/LOSE SCRIPTS

window.onload = function() {
  console.log("JS Loaded");

  $("td").click(function() {
    console.log($(this).attr("id"));
    $(this).addClass('spaceWasHit');
  });

  var isBoardPositionValid;
  var boardId;
  var orientation;
  var direction;
  var newLocation;
  var ships = [
    {"name": "Battleship", "length":4, "numberOfHits":0, "locations": []},
    {"name": "Frigate", "length":3, "numberOfHits":0, "locations": []},
    {"name": "Minesweeper", "length":2, "numberOfHits":0, "locations": []}
  ];

  // Generate random integer between min and max inclusive
  function randomIntFromInterval(min,max)
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }



  function generateShipPositionParameters() {
    boardId = randomIntFromInterval(0,6).toString() + randomIntFromInterval(0,6).toString();
    orientation = randomIntFromInterval(0,1);
    direction = randomIntFromInterval(0,1);
  }


  for (var i = 0; i < ships.length; i++) {
    generateShipPositionParameters();
    var validPosition = checkBoardPositionValidity(ships[i].length, direction, orientation);
    while(validPosition===false) {
      generateShipPositionParameters();
      validPosition = checkBoardPositionValidity(ships[i].length, direction, orientation);
    }
    ships[i].locations.push(boardId);
    for (var i = 0; i < ships[i].length - 1; i++) {
      if (direction===0) {
        if (orientation===0) {
          newLocation = parseInt(boardId[orientation]--) + boardId[1];
        } else {
          newLocation = boardId[0] + parseInt(boardId[orientation]--);
        }
      } else {
        if (orientation===0) {
          newLocation = parseInt(boardId[orientation]++) + boardId[1];
        } else {
          newLocation = boardId[0] + parseInt(boardId[orientation]++);
        }
      }
      console.log(newLocation);
    }
  // }
  // Function that checks for validity of boardId with currentShip and returns Boolean
  function checkBoardPositionValidity(shipLength, direction, orientation) {
    if(direction===0) {
      if(parseInt(boardId[orientation]) - shipLength < 0) {
        return isBoardPositionValid = false;
      } else {
        return true;
      }
    } else if (direction===1) {
      if(parseInt(boardId[orientation]) + shipLength > 6) {
        return isBoardPositionValid = false;
      } else {
        return true;
      }
    }
  }

  // console.log("isBoardPositionValid", checkBoardPositionValidity(ships[0].length, direction, orientation));

// PSEUDOCODE:
// 1. Assign ships randomly to board
//  -random board id picked first
//    -generate two random numbers
//    -concatenate the two
//  -random orientation picked
//    - 0 = horizontal
//    - 1 = vertical
//  -random directions: 0 or 1 (define whether it increments or decrements)
//  -create ships object that stores length, # of hits
//    - if # of hits == length, ship isSunk = true
//  -picks random id, orientation, direction, then if current id + length is
//   greater than 6 it reruns the function

// **********
// Maybe use pure CSS implementation? Put class called ship and ship# on each
// place where a ship is placed, then check if that square has class "ship" to
// see if another ship can be placed there or not
//
// This would also be a way you could handle hits on ships... remove ship# class
// on hit and replace with "hit" class
}
}
