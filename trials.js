/*The goal is to run a simulation of the problem 10,000 times and demonstrate that it is indeed a 2/3 chance of winning by switching your door
choice vs a 1/3 chance of winning by keeping your original choice. Put these results in either results.txt or results.jpg depending on if it’s text
based or a screen shot*/

//need three options
//show when they win and when they don't win

//for loop? and keep counters for wins and losses. The wins should be higher.
var numberOfDoors = 3
var wins, losses;

var prizes = ["goat", "car"];


function assignDoorsPrize(){
    //splice the prizes to assign them.
    let doors = [];

    for(let x = 1; x <= numberOfDoors; x++){
        doors.push(`door${x}`);
    }
    console.log(doors)
}

/*simulation : for(const x = 0; x > 10,000; x++){

}*/

assignDoorsPrize();