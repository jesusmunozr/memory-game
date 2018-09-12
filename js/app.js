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
    // clear board content
    document.querySelector('.board-content').innerHTML = '';

    const fragment = document.createDocumentFragment();

    for(let i = 0; i < cards.length; i++) { 
        // Create card Icon
        const cardIcon = document.createElement('i');
        cardIcon.className = 'material-icons';
        cardIcon.innerText = cards[i].icon;

        // Create card back face
        const cardBackFace = document.createElement('div');
        cardBackFace.className = 'back face';
        
        // create card front face
        const cardFrontFace = document.createElement('div');
        cardFrontFace.className = 'front face';

        // create card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card';

        //create card container
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        // jain all card components in card container
        cardBackFace.appendChild(cardIcon);
        cardBody.appendChild(cardFrontFace);
        cardBody.appendChild(cardBackFace);
        cardContainer.appendChild(cardBody);

        // add card container to the fragment
        fragment.appendChild(cardContainer);
    }

    // add fragment to the board section
    document.querySelector('.board-content').appendChild(fragment);
}

function selectCard(event) {
    const selectedCardIndex = getSelectedCardIndex(event.target);

    if (gameFinished || selectedCardIndex === -1 || cards[selectedCardIndex].matched === true || firtsSelectedCardIndex === selectedCardIndex || secondSelectedCardIndex === selectedCardIndex) {
        return;
    }

    if (gameStarted === false) {
        timeControl = setInterval(() => {
            const time = timer();
            document.querySelector('.score-content__clock').textContent = time;
        }, 1000);
        gameStarted = true;
    }

    // IF already exists two selected cards and select a new one, flip selected cards and create a new movement
    if (firtsSelectedCardIndex !== -1 && secondSelectedCardIndex !== -1) {
        if (cards[firtsSelectedCardIndex].matched === false) {
            document.querySelectorAll('.card-container')[firtsSelectedCardIndex].querySelector('.card').classList.remove('rotate-card-on');
            document.querySelectorAll('.card-container')[firtsSelectedCardIndex].querySelector('.card').classList.add('rotate-card-off');
        }

        if(cards[secondSelectedCardIndex].matched === false) {
            document.querySelectorAll('.card-container')[secondSelectedCardIndex].querySelector('.card').classList.remove('rotate-card-on');
            document.querySelectorAll('.card-container')[secondSelectedCardIndex].querySelector('.card').classList.add('rotate-card-off');
        }

        firtsSelectedCardIndex = -1;
        secondSelectedCardIndex = -1;
    } 

    if (firtsSelectedCardIndex === -1) {
        firtsSelectedCardIndex = selectedCardIndex;
        document.querySelectorAll('.card-container')[firtsSelectedCardIndex].querySelector('.card').classList.remove('rotate-card-off');
        document.querySelectorAll('.card-container')[firtsSelectedCardIndex].querySelector('.card').classList.add('rotate-card-on');
    } else if (secondSelectedCardIndex === -1) {
        secondSelectedCardIndex = selectedCardIndex;
        document.querySelectorAll('.card-container')[secondSelectedCardIndex].querySelector('.card').classList.remove('rotate-card-off');
        document.querySelectorAll('.card-container')[secondSelectedCardIndex].querySelector('.card').classList.add('rotate-card-on');
        // Increment movements
        movements++;
        setScore();
        //Check if selected cards match
        checkMatch();
    }
}

function setScore() {
    // Display movements
    document.querySelector('.score-content__movements').textContent = `Movements: ${movements}`;

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
    const stars = document.querySelector('.score-content__crop')
    stars.style.width = `${score * 138 / 5}px`;
    stars.setAttribute('title', `Your score is ${score.toFixed(2)}`);
}

function checkMatch() {
    if (cards[firtsSelectedCardIndex].icon === cards[secondSelectedCardIndex].icon) {
        document.querySelector('.board-content').querySelectorAll('.back')[firtsSelectedCardIndex].classList.add('matched');
        cards[firtsSelectedCardIndex].matched = true;
        document.querySelector('.board-content').querySelectorAll('.back')[secondSelectedCardIndex].classList.add('matched')
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
        setGameFinished();
    }
}

function setGameFinished() {
    gameFinished = true;
    clearInterval(timeControl);

    const popup = document.createDocumentFragment();

    const congrats = document.createElement('div');
    congrats.className = 'congrats';

    const congratsContent = document.createElement('div');
    congratsContent.className = 'congrats__content';
    congratsContent.innerHTML = `<h2>Congratulations!!</h2>
    <span>This is your time</span>
    <span class="score-content__clock">${timer()}</span>
    <button class="score-content__restart" onclick="restart()">
    <div class="score-content__restart-icon"><i class="material-icons">autorenew</i></div>
    <div class="score-content__restart-text"><span>Restart</span></div>
    </button>`;

    congrats.appendChild(congratsContent);

    popup.appendChild(congrats);

    document.body.appendChild(popup);
}

function getSelectedCardIndex(targetCard) {
    return Array.from(document.querySelector('.board-content').querySelectorAll(`.${targetCard.classList[0]}`)).indexOf(targetCard);
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

    return `${fillWithZero(hours)}:${fillWithZero(minutes)}:${fillWithZero(seconds)}`;

    function fillWithZero(num) {
        if(num < 10) {
            num = `0${num}`;
        }
        return num;
    }
}

function clearTimer() {
    clearInterval(timeControl);
    document.querySelector('.score-content__clock').textContent = '00:00:00';
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

    const popup = document.querySelector('.congrats');
    if(popup !== null)
    {
        popup.remove();
    }
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