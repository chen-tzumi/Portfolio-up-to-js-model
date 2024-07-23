document.addEventListener('DOMContentLoaded', () => {
    const beginersButton = document.getElementById("beginers");
    const advancedButton = document.getElementById("advanced");
    const begginersBoardCard = document.getElementById("begginersBoardCard");
    const advancedBoardCard = document.getElementById("advancedBoardCard");
    const buttonsContainer = document.getElementById("buttonsContainer");
    const startOver = document.getElementById("startOver");
    const changeLevel = document.getElementById("changeLevel");
    const levelsContainer = document.getElementById("levels-container");

    let exposedCards = 0;
    begginersBoardCard.style.display = 'none';
    advancedBoardCard.style.display = 'none';
    buttonsContainer.style.display = 'none';

    let firstSelectedCard;
    let cards;
    let cardsArray = [];
    let correntLevel;

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const attachCardClickHandlers = () => {
        cardsArray.forEach(card => {
            card.addEventListener('click', handleCardClick);
        })
    }

    const handleCardClick = (event) => {
        const card = event.currentTarget;
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        card.classList.add('flipped');
        if (!firstSelectedCard) {
            firstSelectedCard = card;
        } else {
            exposedCards++;
            if (firstSelectedCard.dataset.cardValue === card.dataset.cardValue) {
                setTimeout(() => {
                    firstSelectedCard.classList.add('matched');
                    card.classList.add('matched');
                    firstSelectedCard = null;
                    exposedCards = 0;
                }, 500)
            } else {
                setTimeout(() => {
                    firstSelectedCard.classList.remove('flipped');
                    card.classList.remove('flipped');
                    firstSelectedCard = null;
                    exposedCards = 0;
                }, 1000)
            }
        }
    }

    const initGame = () => {
        firstSelectedCard = null;
        exposedCards = 0;
        cardsArray.forEach(card => {
            card.classList.remove('flipped', 'matched');
        })
        cardsArray = shuffleArray(cardsArray);
        cardsArray.forEach(card => {
            card.parentNode.appendChild(card);
        })
        attachCardClickHandlers();
    }

    beginersButton.addEventListener('click', () => {
        correntLevel = "begginers";
        begginersBoardCard.style.display = 'grid';
        begginersBoardCard.style.gridTemplateColumns = 'repeat(6, 1fr)';
        advancedBoardCard.style.display = 'none';
        levelsContainer.style.display = 'none';
        buttonsContainer.style.display = 'flex';
        cards = begginersBoardCard.getElementsByClassName("card");
        cardsArray = Array.from(cards);
        initGame();
    })

    advancedButton.addEventListener('click', () => {
        correntLevel = "advanced";
        begginersBoardCard.style.display = 'none';
        advancedBoardCard.style.display = 'grid';
        advancedBoardCard.style.gridTemplateColumns = 'repeat(6, 1fr)';
        levelsContainer.style.display = 'none';
        buttonsContainer.style.display = 'flex';
        cards = advancedBoardCard.getElementsByClassName("card");
        cardsArray = Array.from(cards);
        initGame();
    })

    startOver.addEventListener('click', () => {
        initGame();
    })

    changeLevel.addEventListener('click', () => {
        begginersBoardCard.style.display = 'none';
        advancedBoardCard.style.display = 'none';
        levelsContainer.style.display = 'flex';
        buttonsContainer.style.display = 'none';
    });
})
