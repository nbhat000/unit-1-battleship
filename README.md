# Battleship

## Rules of the Game
Battleship is a tactical strategy game. This version is 1-player. The objective of the game is to find your enemy's ships and blow them up before a maximum number of misses is reached. The ships are placed and hidden before the round begins, and then the player has 10 tries to reveal their positions. A square turning dark blue signifies a miss, and a square turning dark red signifies a hit. 

## Process/Approach for Coding
I started off coding the logic. The game board was comprised of a 7x7 table, where each square's ID was comprised of the x and y coordinate of that square (i.e. "45", or "02"). The ships were each objects in an array, with the name, length of ship, the number of "hits" that the player has made on that ship, and the table ID's of the locations of each part of the ship. The most difficult part of the code was the logic for placing the ships randomly, because they could not be placed with any part of the ship off the board, and could not overlap each other. Then, I coded the logic for detecting hits or misses. Each of the locations in the ships were pushed onto an array called takenSpots. An event listener was attached to each grid in the square, and the clicked square's ID was checked to see if it was in takenSpots. If it was, the square turns dark red to signify a hit. If it was not, the square turns dark blue to signify a miss. If a ship is hit, the "numberOfLocations" property of that ship is incremented. Each click, the "numberOfLocations is compared against the "shipLength" property of the object. If they are equal, that ship is sunk and "numberOfSunkShips" is incremented. If the number of sunk ships is equal to the length of the ships array, then the game is won. If a player gets 10 misses before they sink all three ships, then the game is lost. 

## Technologies Used
-jQuery
-Bootstrap
-SweetAlert2

## Biggest Wins and Challenges

## Bugs

## Future Features
