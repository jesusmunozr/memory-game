let cards = [
    'android',
    'face',
    'account_circle',
    'watch_later',
    'fingerprint',
    'favorite',
    'loyalty',
    'thumb_up',
    'face',
    'fingerprint',
    'android',
    'loyalty',
    'favorite',
    'thumb_up',
    'account_circle',
    'watch_later'];
let firtsSelectedCardIndex = -1;
let secondSelectedCardIndex = -1;

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

function loadCards(array) {
    const icons = document.querySelector('.board').querySelectorAll('.material-icons');
    for(let i = 0; i < icons.length; i++) {
        icons[i].textContent = array[i];
    }
}

function selectCard(event) {
    const selectedCard = event.target;

    if (firtsSelectedCardIndex === -1) {
        firtsSelectedCardIndex = getSelectedCardIndex(selectedCard);
    } else {
        secondSelectedCardIndex = getSelectedCardIndex(selectedCard);
        checkMatch();
    }
}

function checkMatch() {
    if (cards[firtsSelectedCardIndex] === cards[secondSelectedCardIndex]) {
        document.querySelector('.board').querySelectorAll('.card')[firtsSelectedCardIndex].classList.add('matched')
        document.querySelector('.board').querySelectorAll('.card')[secondSelectedCardIndex].classList.add('matched')
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
loadCards(cards);
console.log(cards);
