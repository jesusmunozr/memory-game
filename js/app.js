let cards = [
    {'icon': 'android', 'matched': false},
    {'icon': 'face', 'matched': false},
    {'icon': 'account_circle', 'matched': false},
    {'icon': 'watch_later', 'matched': false},
    {'icon': 'fingerprint', 'matched': false},
    {'icon': 'favorite', 'matched': false},
    {'icon': 'loyalty', 'matched': false},
    {'icon': 'thumb_up', 'matched': false},
    {'icon': 'face', 'matched': false},
    {'icon': 'fingerprint', 'matched': false},
    {'icon': 'android', 'matched': false},
    {'icon': 'loyalty', 'matched': false},
    {'icon': 'favorite', 'matched': false},
    {'icon': 'thumb_up', 'matched': false},
    {'icon': 'account_circle', 'matched': false},
    {'icon': 'watch_later', 'matched': false}];
let firtsSelectedCardIndex = -1;
let secondSelectedCardIndex = -1;
let movements = 0;
let gameFinished = false;
let gameStarted = false;
let hours = 0;
let minutes = 0;
let seconds = 0;
let timeControl = undefined;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function loadCards() {
    const divs = document.querySelector('.board').querySelectorAll('.card');
    for(let i = 0; i < divs.length; i++) {
        divs[i].querySelector('.material-icons').textContent = cards[i].icon;
    }
}

function selectCard(event) {
    const selectedCardIndex = getSelectedCardIndex(event.target);

    if (gameFinished) {
        return;
    }

    if (firtsSelectedCardIndex === selectedCardIndex || secondSelectedCardIndex === selectedCardIndex) {
        return;
    }

    if (gameStarted === false) {
        timeControl = setInterval(timer, 1000);
        gameStarted = true;
    }

    // IF already exists two selected cards create a new movement
    if (firtsSelectedCardIndex !== -1 && secondSelectedCardIndex !== -1) {
        if (cards[firtsSelectedCardIndex].matched === false) {
            // TODO: flip the card to the front face
        }

        if(cards[secondSelectedCardIndex].matched === false) {
            // TODO: flip the card to the front face
        }

        firtsSelectedCardIndex = -1;
        secondSelectedCardIndex = -1;
    } 

    if (firtsSelectedCardIndex === -1) {
        firtsSelectedCardIndex = selectedCardIndex;
    } else if (secondSelectedCardIndex === -1) {
        secondSelectedCardIndex = selectedCardIndex;
        // Increment movements
        movements++;
        setScore();
        //Check if selected cards match
        checkMatch();
    }
}

function setScore() {
    // Display movements
    document.querySelector('.move-counter').textContent = movements;

    // Set score according movements
    let score = 5;
    if (movements <= 12) {
        score = 5;
    } else if (movements >= 24) {
        score = 0;
    } else {
        score = -0.42 * movements + 10;
    }

    // Set the style and title for stars
    const stars = document.querySelector('.crop')
    stars.style.width = `${score * 136 / 5}px`;
    stars.setAttribute('title', `Your score is ${score.toFixed(2)}`);

    console.log('SCORE: ' + score);
    
}

function checkMatch() {
    if (cards[firtsSelectedCardIndex].icon === cards[secondSelectedCardIndex].icon) {
        document.querySelector('.board').querySelectorAll('.card')[firtsSelectedCardIndex].classList.add('matched');
        cards[firtsSelectedCardIndex].matched = true;
        document.querySelector('.board').querySelectorAll('.card')[secondSelectedCardIndex].classList.add('matched')
        cards[secondSelectedCardIndex].matched = true;
    }

    // Check if the game already finish
    evaluateMatches();
}

// Evaluate if the game has already finished
function evaluateMatches() {
    let matchesCounter = 0;
    cards.forEach(c => {
        if (c.matched) {
            matchesCounter++;
        }
    });

    if (matchesCounter === cards.length) {
        gameFinished = true;
        console.log('GAME FINISH!!!');
    }
}

function getSelectedCardIndex(targetCard) {
    let currentIndex = -1;
    if (targetCard.tagName === 'LI') {
        currentIndex = Array.from(document.querySelector('.board').querySelectorAll('li')).indexOf(targetCard);
    } else {
        currentIndex = Array.from(document.querySelector('.board').querySelectorAll('.material-icons')).indexOf(targetCard);
    }

    return currentIndex;
}



function timer() {
    if (seconds < 59) {
        seconds++;
    } else if (minutes < 60) {
        seconds = 0;
        minutes++;
    } else {
        minutes = 0;
        hours++;
    }

    document.querySelector('.clock').textContent = `${fillWithZero(hours)}:${fillWithZero(minutes)}:${fillWithZero(seconds)}`;

    function fillWithZero(num) {
        if(num < 10) {
            num = `0${num}`;
        }
        return num;
    }
}

function clearTimer() {
    clearInterval(timeControl);
    document.querySelector('.clock').textContent = '00:00:00';
}

function clearVariables() {
    seconds = 0;
    minutes = 0;
    hours = 0;
    firtsSelectedCardIndex = -1;
    secondSelectedCardIndex = -1;
    movements = 0;
    gameFinished = false;
    gameStarted = false;
}

function restart() {
    clearVariables();
    clearTimer();
    // Unmark matched cards
    cards.forEach(c => c.matched = false);
    
    setupApplication();
}

// Configure application according variables values
function setupApplication() {
    // Set the score with cleared variables
    setScore();
    cards = shuffle(cards);
    // Load cards in the DOM
    loadCards();
}

setupApplication();