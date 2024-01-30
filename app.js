const victoryPoint = 25;

var scores, roundScore, activePlayer, gamePlaying;

var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');
var missRound = document.querySelector('.miss-round');

init();

document.querySelector('.dice').style.display = 'none';

btnRoll.addEventListener('click', function(){
    btnHold.style.display = 'block';
    missRound.style.display = 'none';

    // 1. Generate a random number.
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the dice picture corresponding randomly generated dice.

    var diceDOM = document.querySelector('.dice');

    diceDOM.style.display = 'block';
    diceDOM.src = 'assets/images/dice-' + dice + '.png';


    // 3. Update the round score
    if(dice !== 1){
        roundScore = dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else{

    // Switch the turn to the next player
        btnHold.style.display = 'none';
        missRound.textContent = `Player ${activePlayer} misses the round.`;
        missRound.style.display = 'block';
        nexPlayer();
    }
    for(var i = 0; i <= 1; i++){
        if (dice !== 1) {
            roundScore = dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            btnHold.style.display = 'none';
            missRound.textContent = `Player ${activePlayer} misses the round.`;
            missRound.style.display = 'block';
            nexPlayer();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        scores[activePlayer - 1] += roundScore;
        // Update the UI ==> User Interface with the score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer - 1];

        // Check if player won the game

        if(scores[activePlayer - 1] >= victoryPoint){

            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            btnRoll.style.display = 'none';
            btnHold.style.display = 'none';

            gamePlaying = false;
        } 
        else {
            nexPlayer();
            btnHold.style.display = 'none';
        }
    }



})

document.querySelector('.btn-new').addEventListener('click', function(){
    init();
});

// Initlialize the game
function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 1;
    gamePlaying = true;

    btnRoll.style.display = 'block';
    btnHold.style.display = 'none';

    document.getElementById('score-1').textContent = '0';
    document.getElementById('score-2').textContent = '0';

    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-2').textContent = '0';

    document.querySelector('#name-1').textContent = 'Player1';
    document.querySelector('#name-2').textContent = 'Player2';

    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-2-panel').classList.remove('winner');

    document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-2-panel').classList.remove('active');

}

function nexPlayer(){
    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
    roundScore = 0;

    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-2').textContent = '0';


    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-2-panel').classList.toggle('active');

}
