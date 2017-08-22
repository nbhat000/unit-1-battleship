window.onload = function() {
  var a = 0;
  var b = 0;
  var orientation = 0;
  var direction = 0;
  var ships = [
    {"name": "Battleship", "shipLength":4, "numberOfHits":0, "locations": []},
    {"name": "Frigate", "shipLength":3, "numberOfHits":0, "locations": []},
    {"name": "Minesweeper", "shipLength":2, "numberOfHits":0, "locations": []}
  ];

  // Generate random integer between min and max inclusive
  function randomIntFromInterval(min,max)
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }


  function generateShipPositionParameters() {
    console.log('******************************');
    console.log("generateShipPositionParameters");
    // a=0;
    // b=0;
    a = randomIntFromInterval(0,6);
    console.log('a', a);
    b = randomIntFromInterval(0,6);
    console.log('b', b);
    orientation = randomIntFromInterval(0,1);
    direction = randomIntFromInterval(0,1);
    evaluateCoords(a, b, orientation, direction);
  }

  function evaluateCoords(a, b, orientation, direction) {
    //if orientation = 0, ship is vertical
    //if orientation = 1, ship is horizontal
    //if direction = 0, decrement
    //if direction = 1, increment
    var validityTestArray = [];
    for (let i = 0; i < 1; i++) {
      console.log("shipLength", ships[i].shipLength, i);

      for (let x = 0; x < ships[i].shipLength; x++) {
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
      console.log("validityTestArray", validityTestArray);


      if (validityTestArray.includes(-1) || validityTestArray.includes(7)) {
        console.log("Impossible ship!");

        validityTestArray=[];
        generateShipPositionParameters();
      } else {
        console.log("YAY BOAT");
      }


    };
  }

  generateShipPositionParameters();
}
