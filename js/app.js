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
    const selectedCard = event.target;

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
        firtsSelectedCardIndex = getSelectedCardIndex(selectedCard);
    } else {
        secondSelectedCardIndex = getSelectedCardIndex(selectedCard);
        // Increment movements
        movements++;
        setScore();
        //Check if selected cards match
        checkMatch();
    }
}

function setScore() {
    document.querySelector('.move-counter').textContent = movements;
}

function checkMatch() {
    if (cards[firtsSelectedCardIndex].icon === cards[secondSelectedCardIndex].icon) {
        document.querySelector('.board').querySelectorAll('.card')[firtsSelectedCardIndex].classList.add('matched');
        cards[firtsSelectedCardIndex].matched = true;
        document.querySelector('.board').querySelectorAll('.card')[secondSelectedCardIndex].classList.add('matched')
        cards[secondSelectedCardIndex].matched = true;
    } 

    firtsSelectedCardIndex = -1;
    secondSelectedCardIndex = -1;
}

function getSelectedCardIndex(targetCard) {
    let currentIndex = -1;
    if (targetCard.tagName === 'LI') {
        currentIndex = Array.from(document.querySelector('.board').querySelectorAll('li')).indexOf(targetCard);
    } else {
        currentIndex = Array.from(document.querySelector('.board').querySelectorAll('.material-icons')).indexOf(targetCard);
    }

    console.log(currentIndex);
    return currentIndex;
}

cards = shuffle(cards);
loadCards();
console.log(cards);
