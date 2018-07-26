var student = document.querySelectorAll('.student');
const desks = document.querySelectorAll('.desk');
const scoreBoard = document.querySelector('.score');
const profs = document.querySelectorAll('.prof');
var stopFlag;
var timeStopFlag;
var stopSecondFlag;
var time = 20;
let lastdesk;
let timeUp = false;
let score = 0;
var highestScore = 0;

//<!-- the start game function-->
function startGame() {
    document.getElementById("start_button").disabled = true;
    score = 0;
    timeUp = false;
    startGameHelper(false);
}

//< !--resetGame function reset score-- >
//<!--called when reset button is clicked-->
    function resetGame() {
        if (document.getElementById("start_button").disabled = true)
            document.getElementById("start_button").disabled = false;
        timeUp = true;
        document.getElementById('CurrentScore').textContent = 0;
        document.getElementById('Timer').innerHTML = "20";
        clearInterval(stopFlag);
        clearInterval(timeStopFlag);
    }

//<!--function called after the 20 seconds when the option to continue playing-->
//<!-- is pressed, therefore it resumes the currently playing game-->
function startGameHelper(resume) {
    scoreBoard.textContent = 0;
    timeUp = false;
    if (!resume)
        score = 0;

    time = 20;
    // gengerateTableAndCharacter();
    stopFlag = setInterval(function(){
        generateTableAndCharacter();
    }, randomTime(1000, 1500));
    stopSecondFlag = setInterval(function(){
        generateTableAndCharacter();
    }, randomTime(2000, 2300));
    // peep();
    // peep();
    // setTimeout(() => timeUp = true, 20000);
    timeRemaining();
    updateScore();
    // sortScore();
}

function playSound() {
    var firstAudio = document.getElementById("firstAudio");
    var secondAudio = document.getElementById("secondAudio");
    firstAudio.play();
    secondAudio.play();
}

//<!--function begins the timer and counts down from 20 seconds till time equals 0-->
//<!--once time ends then gives player options to continue or end the game if-->
//<!--their score is above 500-->
//<!--stops professors from coming up once time is up and resets timer-->
function timeRemaining(){
    timeStopFlag = setInterval(function(){
        time--;
        var timer = document.getElementById("Timer").innerHTML = time;
        // console.log("now time " + time);
        if(time === 0){
            clearInterval(stopFlag);
            clearInterval(timeStopFlag);
            clearInterval(stopSecondFlag);
            timeUp = true;
////if current score is greater than 500 then player can continue playing the game            
            if(score >= 500) {
                var r = confirm("Contunie Game?");
                if (r == true) {
                    startGameHelper(true);
                }
            } else {
                alert('Game Over!');
            }
            
            // clearInterval(x);
            document.getElementById("Timer").innerHTML = 20;
            document.querySelector(".score").innerHTML = 20;
            time = 20;
        }
    }, 1000);

}

//<!--explains the different types of characters used: student, principal, professor-->
var characters = [{
    type: 'principal',
    score: 200,
    fail: -50
}, {
    type: 'prof',
    score: 100,
    fail: -50
}, {
    type: 'student',
    score: 50,
    fail: -50
}
];

//<!--puts the new score up in the high score box-->
function updateScore() {
    var x = setInterval(function(){
        if (timeUp === true) {
            var node = document.createElement("li");
            var textnode = document.createTextNode(score);
            node.appendChild(textnode);
            document.getElementById("list").appendChild(node);
            clearInterval(x);
            console.log(score);
        }
    }, 500);
}

//connected for the desk id
//make desk value to the random number
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomdesk(desks) {
    const idx = Math.floor(Math.random() * 10);

    const desk = desks[idx];
    if (desk === lastdesk) {
        return randomdesk(desks);
    }
    lastdesk = desk;
    return desk;
}

// param r: random range
//giving the random number range
//make the first desk and sencondesk from different way
function random(r) {
    var desks = []
    var firstDesk = Math.floor(Math.random() * r);
    desks[0] = firstDesk;
    console.log('firstDesk: ', firstDesk);
    var secondDesk = Math.floor(Math.random() * r);
    while(firstDesk === secondDesk) {
        secondDesk = Math.floor(Math.random() * r);

    }
    desks[1] = secondDesk;
    console.log('secondDesk: ', secondDesk);
    return desks;
}

//<!--brings the characters up from behind the desks--> 
//<!--sets a time for them to stay up-->
//<!--after the time is up, the characters are brought back down-->
function generateTableAndCharacter() {
    var desks = random(9);
    var chars = random(3);
    // document.getElementById('d-' + desks[0]).classList.add(characters[chars[0]].type);
//brings the character up from behind a desk
    document.getElementById('d-' + desks[1]).classList.add(characters[chars[1]].type);

    setTimeout(function() {
        // document.getElementById('d-' + desks[0]).classList.remove(characters[chars[0]].type);
//brings the character back down 
//character stays up for 1.6 to 2.3 seconds then goes back down
        document.getElementById('d-' + desks[1]).classList.remove(characters[chars[1]].type);
    }, randomTime(1600, 2300));
};

//<!--function explains what happens when you hit a certain type of character-->
//<!--100 points gained for a prof, 100 points lost for a student,-->
//<!--and 200 points gained for hitting the principal-->
function hit(deskId) {
    console.log('hit desk: ', deskId);
//lose points if you hit a student
    if(document.getElementById(deskId).classList.contains('student')) {
        if(score != 0){
            score = score - 100;
        }
        playSound();
        document.getElementById(deskId).classList.remove('student');
        //adds the effect of student being hit exploding with blood
        document.getElementById(deskId).classList.add('student-blood');
        removeClass(deskId, 'student-blood');
    } else if(document.getElementById(deskId).classList.contains('prof')) {
        //gain 100 points for hitting the prof       
        score = score + 100;
        playSound();

        document.getElementById(deskId).classList.remove('prof');
        document.getElementById(deskId).classList.add('prof-blood');
        removeClass(deskId, 'prof-blood');
    } else if(document.getElementById(deskId).classList.contains('principal')) {
        //200 points gained for hitting the principal
        score = score + 200;
        playSound();

        document.getElementById(deskId).classList.remove('principal');
        document.getElementById(deskId).classList.add('principal-blood');
        removeClass(deskId, 'principal-blood');
    } else {

    }

    document.getElementById('CurrentScore').textContent = score;
    console.log('get score: ', document.getElementById(deskId).innerHTML !== '');
}

//<!--function will remove the bloody character from the list so it doesn't come up-->
function removeClass(id, className) {
    setTimeout(() => {
        document.getElementById(id).classList.remove(className);
    }, 500);
}

function sortScore(){
    if(timeUp === true){
        function sortList() {
            var list, i, switching, b, shouldSwitch;
            list = document.getElementById("list");
            switching = true;
            /*Make a loop that will continue until
            no switching has been done:*/
            while (switching) {
                //start by saying: no switching is done:
                switching = false;
                b = list.getElementsByTagName("LI");
                //Loop through all list-items:
                for (i = 0; i < (b.length - 1); i++) {
                    //start by saying there should be no switching:
                    shouldSwitch = false;
                    /*check if the next item should
                    switch place with the current item:*/
                    if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                        /*if next item is alphabetically
                        lower than current item, mark as a switch
                        and break the loop:*/
                        shouldSwitch = true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    /*If a switch has been marked, make the switch
                    and mark the switch as done:*/
                    b[i].parentNode.insertBefore(b[i + 1], b[i]);
                    switching = true;
                }
            }
        }
    }
}