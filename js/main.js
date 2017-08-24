window.onload = function() {
  var a = 0;
  var b = 0;
  var orientation = 0;
  var direction = 0;
  var takenSpots = [];
  var numberOfSunkShips = 0;
  var numberOfMisses = 0;
  var ships = [
    {"name": "Battleship", "shipLength":4, "numberOfHits":0, "locations": []},
    {"name": "Frigate", "shipLength":3, "numberOfHits":0, "locations": []},
    {"name": "Minesweeper", "shipLength":2, "numberOfHits":0, "locations": []}
  ];

  for (var i = 0; i < ships.length; i++) {
    generateShipPositionParameters(i);
  }
  console.log("ships", ships);

  // Generate random integer between min and max inclusive
  function randomIntFromInterval(min,max)
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }


  function generateShipPositionParameters(shipNumber) {
    console.log('******************************');
    // console.log("generateShipPositionParameters");
    a = randomIntFromInterval(0,6);
    b = randomIntFromInterval(0,6);
    orientation = randomIntFromInterval(0,1);
    direction = randomIntFromInterval(0,1);
    //if orientation = 0, ship is vertical
    //if orientation = 1, ship is horizontal
    //if direction = 0, decrement
    //if direction = 1, increment
    evaluateCoords(a, b, orientation, direction, shipNumber);
  }

  function evaluateCoords(a, b, orientation, direction, shipNumber) {

    var validityTestArray = [];
    // for (let i = 0; i < 1; i++) {
      // console.log("shipLength", ships[i].shipLength, i);
      // console.log(i);
      // console.log(ships[shipNumber]);
      for (let x = 0; x < ships[shipNumber].shipLength; x++) {
        if (orientation == 0) {
          if(direction == 0) {
              validityTestArray.push(a--);
          } else {
              validityTestArray.push(a++);
          }
        } else {
          if(direction == 0) {
              validityTestArray.push(b--);
          } else {
              validityTestArray.push(b++);
          }
        }
      };
      // console.log("validityTestArray", validityTestArray);


      if (validityTestArray.includes(-1) || validityTestArray.includes(7)) {
        console.log("Impossible ship!");
        validityTestArray=[];
        generateShipPositionParameters(shipNumber);
      } else {
        // console.log("YAY BOAT");
        generateShipLocations(validityTestArray, shipNumber);
      }

    // };
  }


  function generateShipLocations(validLocationArray, shipNumber) {
    var newLocation = "";
    var tempShipLocationArray = [];
    var isOverlapping;
    // for (var x = 0; x < ships.length; x++) {
    // if (Object.values(ships).indexOf(ships[x].locations) > -1) {
    //   console.log('has test1');
    // }
      // if() {
      //   console.log("Entered if");
        // generateShipPositionParameters(shipNumber);
      // } else {
        for (var i = 0; i < validLocationArray.length; i++) {
          if(orientation==0) {
            newLocation = validLocationArray[i].toString() + b.toString();
            // ships[shipNumber].locations.push(newLocation);
            tempShipLocationArray.push(newLocation);
          } else {
            newLocation = a.toString() + validLocationArray[i].toString();
            // ships[shipNumber].locations.push(newLocation);
            tempShipLocationArray.push(newLocation);
          }
        }
          // takenSpots.push(newLocation);
          // console.log(takenSpots);

          console.log("variables for overlap", tempShipLocationArray, takenSpots);
          isOverlapping = checkOverlap(tempShipLocationArray, takenSpots);
          console.log("Is Overlapping?", isOverlapping);
          if(isOverlapping === true) {
            tempShipLocationArray = [];
            generateShipPositionParameters(shipNumber);
            console.log("isOverlapping = True");
          } else {
            console.log("isOverlapping = False");
            takenSpots = takenSpots.concat(tempShipLocationArray);
            console.log(tempShipLocationArray);
            console.log(takenSpots);
            ships[shipNumber].locations = ships[shipNumber].locations.concat(tempShipLocationArray);
            // tempShipLocationArray = [];
          }


        // console.log(ships[shipNumber].name + " locations", ships[shipNumber].locations);

        for(var q = 0; q < ships[shipNumber].locations.length; q++) {
          // console.log($(ships[shipNumber].locations)[q]);
          var eachLocation = $(ships[shipNumber].locations)[q];
          $("#"+ eachLocation).addClass('ship ship-' + shipNumber);
        }
        console.log("takenSpots", takenSpots);
      // }
    // }
    // console.log(ships[shipNumber].name + " object", ships);


  }

  function checkOverlap(array1, array2) {
    return array2.some(function (v) {
      return array1.indexOf(v) >= 0;
    });
  };

  function checkIfOverlap(validLocationArray, shipNumber) {
    for(var x=0; x < validLocationArray.length; x++) {
      var shipStuff = ships.filter(function (shipNumber) { return shipNumber.locations.includes(validLocationArray[x]) });
    }
    console.log("shipStuff", shipStuff);
  }



  function eventListenerAdd() {
    $("td").click(function() {
      // remove event listener from table cell if clicked
      $(this).off();

      if (takenSpots.includes($(this).attr("id"))) {
        $(this).addClass('spaceWasHit');
        console.log("Hit!");

      } else {
        console.log("Missed!");
        $(this).addClass('spaceWasMiss');
      }

      if ($(this).hasClass("ship")) {
        var clickedShipNumber = $(this).attr("class");
        clickedShipNumber = clickedShipNumber.replace(/\D/g,'');
        ships[clickedShipNumber].numberOfHits++;

        checkShipSunk(clickedShipNumber);
      } else {
          numberOfMisses++;
          $("#numberOfMisses").text(numberOfMisses);
          winOrLose(numberOfSunkShips, numberOfMisses);
          console.log("numberOfMisses", numberOfMisses);
      }
    });
  }



  function checkShipSunk(shipNumber) {
    console.log(`numberOfHits ship${shipNumber}: ${ships[shipNumber].numberOfHits}`);
    if (ships[shipNumber].numberOfHits === ships[shipNumber].shipLength) {
      new Audio("audio/explosion_sound.mp3").play();
      sweetAlert(ships[shipNumber].name+ " sunk!", "", "error");
      // alert(ships[shipNumber].name+ " sunk!");
      $("#ship-" + shipNumber + "-sunk").attr("src", "images/battleship-sunk.png").fadeIn('slow');
      // .next().delay(500).fadeOut('slow')
      winOrLose(numberOfSunkShips);
      numberOfSunkShips++;
      $("#numberOfShipsSunk").text(numberOfSunkShips);
    }
  }

  function winOrLose(numberOfSunkShips, numberOfMisses) {
    if(numberOfSunkShips === ships.length) {
      alert("You Win!");
      resetBoard();
    }
    if(numberOfMisses > 10) {
      alert("You Lose!");
      resetBoard();
    }
  }

  function resetBoard() {
    // $('table').children().removeClass();
    $('tr').children().removeClass();
    takenSpots = [];
    console.log($('tr').children());
    for(var i=0; i < ships.length; i++) {
      ships[i].locations = [];
      ships[i].numberOfHits = 0;
    }
    for (var x = 0; x < ships.length; x++) {
      generateShipPositionParameters(x);
    }
    $('tr').children().off();
    eventListenerAdd();
    $("#ship-0-sunk").attr("src","images/battleship.png");
    $("#ship-1-sunk").attr("src","images/frigate.png");
    $("#ship-2-sunk").attr("src","images/minesweeper.png");
    numberOfSunkShips = 0;
    numberOfMisses = 0;
    $("#numberOfMisses").text(numberOfMisses);
    $("#numberOfShipsSunk").text(numberOfSunkShips);
    console.log($('tr').children());
  }

  eventListenerAdd();
}
