/*The goal is to run a simulation of the problem 10,000 times and demonstrate that it is indeed a 2/3 chance of winning by switching your door
choice vs a 1/3 chance of winning by keeping your original choice. Put these results in either results.txt or results.jpg depending on if it’s text
based or a screen shot*/

//rules:
//1. The host must always open a door that was not picked by the contestant.
//2. The host must always open a door to reveal a goat and never the car
//3. The host must always offer the chance to switch between the originally chosen door and the remaining closed door.


var numberOfDoors = 3
var wins, losses;
var doors = [];

var prizes = ["goat", "car"];

function randomNumber(){
    return Math.floor(Math.random() * prizes.length);
}

function assignDoorsPrize(){
    for(let x = 1; x <= numberOfDoors; x++){
        doors.push('goat');
    }
    doors.splice(randomNumber(), 1, 'car');
    console.log(doors);
}

function contestantFirstChoice(){
    return randomNumber();
};

function revealTheGoat(){
    const goat = doors[randomNumber()];
    if(goat === 'goat'){
        console.log("found one!", goat);
        return goat;
    }
    revealTheGoat();
}


function runSimulation(){
    assignDoorsPrize();
    contestantFirstChoice();
    revealTheGoat();
}

runSimulation();