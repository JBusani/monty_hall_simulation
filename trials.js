/*The goal is to run a simulation of the problem 10,000 times and demonstrate that it is indeed a 2/3 chance of winning by switching your door
choice vs a 1/3 chance of winning by keeping your original choice. Put these results in either results.txt or results.jpg depending on if it’s text
based or a screen shot*/

//rules:
//1. The host must always open a door that was not picked by the contestant.
//2. The host must always open a door to reveal a goat and never the car [done]
//3. The host must always offer the chance to switch between the originally chosen door and the remaining closed door.

/*
    HOW TO RUN SIMULATION:

        Scroll to the bottom of the file and insert the number of times you want to run the simulation into the run() function.

        for example:

        To run the simulation 10 times, write:
            run(10);
        
*/

const fs = require('fs');

const yesOrNo = ['yes', 'no'];
const numberOfDoors = 3
let wins, losses, contestantFirstChoiceDoor;
let doors = [];

function randomNumber(){
    return Math.floor(Math.random() * doors.length);
}

//1. assign doors a goat or a car
function assignDoorsPrize(){
    for(let x = 1; x <= numberOfDoors; x++){
        doors.push('goat');
    }
    doors.splice(randomNumber(), 1, 'car');
    //console.log(doors);
}

//2. The contestant chooses a door.
function firstChoice(){
    assignDoorsPrize();
    const index = randomNumber();
    contestantFirstChoiceDoor = {
        index: index,
        prize: doors[index]
    };
    //console.log(`Contestant's first choice is door ${index + 1}: a ${doors[contestantFirstChoiceDoor.index]}`);
    //remove the contestant choice from the array of options
    //this is so the array is to satisfy rule 1 as an impossibility.
    //makes array shorter. maybe faster?
    doors.splice(contestantFirstChoiceDoor.index, 1);    
};

//3. The host reveals the goat behind another door
function revealTheGoat(){
    //console.log('remaining door options: ', doors);
    firstChoice();
    const hostRevealsDoor = () => {
        const hostRevealsDoorNumber = randomNumber();
        const goat = doors[hostRevealsDoorNumber];
        if( goat === 'goat'){
            //console.log(`Host opens to reveal the ${goat} `);
            return hostRevealsDoorNumber;
        }
        hostRevealsDoor();
    }

    hostRevealsDoor();
    //console.log('remaining options : ' , doors);
}

//4. Does the contestant want to switch his choice to the other door?
    function switchChoice(){
        const decision = Math.floor(Math.random() * yesOrNo.length);
        //console.log("Would you like to change your choice?", yesOrNo[decision])
        return yesOrNo[decision];
    }

//5. If yes, give them random selection from remaining options
    function returnFinalChoice(){
        revealTheGoat();
        const finalChoice = switchChoice();
        if (finalChoice === 'yes'){
            const final = doors[randomNumber()];
            //console.log("Switching to different door. Congrats you won a ", final);
            return
        }
        //console.log("Congrats you won a ", contestantFirstChoiceDoor.prize);
        return contestantFirstChoiceDoor.prize;
    }

function runSimulation(){
   return returnFinalChoice();
}

function run(numberOfIterations){
    const sims = numberOfIterations
    losses = 0;
    wins = 0;
    do{
        if(runSimulation() === 'goat'){
            losses++;
        }else{
            wins++;
        }
        doors = [];
        contestantFirstChoiceDoor = {}
        
        numberOfIterations--
    }while(numberOfIterations != 0);

    fs.writeFile('results.txt', `The simulation ran a total of ${sims} times. The results are: wins (${wins}) and losses (${losses}) - ${new Date()}`, (err)=>{
        if (err) throw err;
    })
    console.group("Number of wins: ", wins, "Number of losses ", losses);
}




//please input number of runs you'd like to test within the run parameter ex. run(10000)


run(200);