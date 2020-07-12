(function () {
    'use strict';

    const elementsHtml = {
        protection: document.getElementById('protection'),
        splash: document.getElementById('splash'),
        msgs: document.getElementById('msgs'),
        message: document.querySelector('#msgs h1'),
        game: document.getElementById('game'),
        header: document.getElementById('header'),
        panels: document.getElementById('panels'),
        options: document.getElementById('options'),
        levelEasy: document.getElementById('levelEasy'),
        levelNormal: document.getElementById('levelNormal'),
        levelHard: document.getElementById('levelHard'),
        theEnd: document.getElementById('theEnd'),
        start: document.getElementById('start'),
        restart: document.getElementById('restart'),
        main: document.getElementById('main'),
        board: document.getElementById('board'),
        easy: document.querySelector('#board #easy'),
        easyCards: document.querySelectorAll('#board #easy .card'),
        normal: document.querySelector('#board #normal'),
        normalCards: document.querySelectorAll('#board #normal .card'),
        hard: document.querySelector('#board #hard'),
        hardCards: document.querySelectorAll('#board #hard .card'),
        leave: document.querySelector('#main h3')
    };
    let splashVisible = false;
    let points = 0;
    let playingLevel = '';
    let pointsLevel = {
        easy: 0,
        normal: 0,
        hard: 0
    };
    let cardsSelected = [undefined, undefined];
    let imagesCards = [];

    elementsHtml.splash.addEventListener('click', hideSplash);

    elementsHtml.levelEasy.addEventListener('click', playEasy);

    elementsHtml.levelNormal.addEventListener('click', playNormal);
    
    elementsHtml.levelHard.addEventListener('click', playHard);
    
    elementsHtml.leave.addEventListener('click', resetGame);

    // 	elementsHtml.facil.addEventListener('click', easy);

    // 	elementsHtml.reiniciar.addEventListener('click', reiniciarJogo);

    // 	elementsHtml.iniciar.addEventListener('click', reiniciarJogo);

    // 	elementsHtml.msgs.addEventListener('click', hideMsgs);

    async function fetchImages(level) {
        let path = `url(./images/${level}/`;
        switch (level) {
            case 'easy':
                for (let i = 0; i < 6; i++) {
                    imagesCards[i] = `${path}${level}${i}.jpg)`;
                };
                break;
            case 'normal':
                for (let i = 0; i < 12; i++) {
                    imagesCards[i] = `${path}${level}${i}.svg)`;
                };
                break;
            case 'hard':
                for (let i = 0; i < 18; i++) {
                    imagesCards[i] = `${path}${level}${i}.jpg)`;
                };
                break;
            default:
                alert('Nível não encontrado');
                break;
        }
    }

    function returnDifferentsRandomNumbers(minNumber, maxNumber) {
        var temp = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
        var numbers = [temp];
        while (numbers.length < maxNumber) {
            if (numbers.find(function (element) { return element === temp; }) === undefined) {
                numbers.push(temp);
            } else {
                temp = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
            };
        }
        return numbers;
    };

    async function populatingCards(levelCards) {
        let levelLength = levelCards.length;
        // console.log(levelLength);
        let temp = returnDifferentsRandomNumbers(0, levelLength);
        for (let i = 0; i < levelLength; i += 2) {
            levelCards[temp[i]].style.backgroundImage = imagesCards[0];
            levelCards[temp[i]].style.backgroundSize = '80%';
            levelCards[temp[i]].style.backgroundRepeat = 'no-repeat';
            levelCards[temp[i]].style.backgroundPosition = 'center';
            levelCards[temp[i + 1]].style.backgroundImage = imagesCards[0];
            levelCards[temp[i + 1]].style.backgroundSize = '80%';
            levelCards[temp[i + 1]].style.backgroundRepeat = 'no-repeat';
            levelCards[temp[i + 1]].style.backgroundPosition = 'center';
            imagesCards.shift();
            // levelCards[i].addEventListener('click', yourChance);
            // levelCards[i + 1].addEventListener('click', yourChance);
        };
    };

    // 	function hideModal() {
    // 		elementsHtml.protection.style.width = '0%';
    // 		elementsHtml.protection.style.height = '0%';
    // 	}
    // 	function showModal() {
    // 		elementsHtml.protection.style.width = '100%';
    // 		elementsHtml.protection.style.height = '100%';
    // 	}

    // 	function getCardSelected(elementId) {
    // 		if (cardsSelected[0] === undefined) {
    // 			cardsSelected[0] = document.getElementById(elementId);
    // 			cardsSelected[0].style.backgroundSize = '80%';
    // 		}
    // 		else {
    // 			showModal();
    // 			cardsSelected[1] = document.getElementById(elementId);
    // 			sameClick()
    // 		}
    // 	};

    // 	function cardsHide() {
    // 		cardsSelected[0].style.backgroundSize = '0%';
    // 		cardsSelected[1].style.backgroundSize = '0%';
    // 	}

    // 	function cardsSelectedReset() {
    // 		cardsSelected[0] = undefined;
    // 		cardsSelected[1] = undefined;
    // 		console.log('cardSelected reseted');
    // 	}

    // 	function removeClickCard() {
    // 		cardsSelected[0].removeEventListener('click', yourChance);
    // 		cardsSelected[1].removeEventListener('click', yourChance);
    // 	}

    // 	function yourChance() {
    // 		getCardSelected(event.currentTarget.id);
    // 	}

    // 	function imagesEquals() {
    // 		if (cardsSelected[0].style.backgroundImage === cardsSelected[1].style.backgroundImage) {
    // 			console.log('Cards Iguais');
    // 			pontos++;
    // 			if (pontos >= 6) {
    // 				theEnd();
    // 			}
    // 			removeClickCard();
    // 			cardsSelectedReset();
    // 			hideModal();
    // 		}
    // 		else {
    // 			console.log('Cards diferentes');
    // 			cardsHide();
    // 			cardsSelectedReset();
    // 			hideModal();
    // 		}
    // 	}

    // 	function theEnd() {
    // 		showModal();
    // 		elementsHtml.opcoes.style.display = 'flex';
    // 		elementsHtml.fim.style.display = 'flex';
    // 	};

    // 	function easy() {
    // 		populatingCards();
    // 		elementsHtml.dificuldade.style.display = 'none';
    // 		elementsHtml.opcoes.style.display = 'none';
    // 	};

    // 	function reiniciarJogo() {
    // 		document.location.reload();
    // 	};

    // 	function sameClick() {
    // 		if (cardsSelected[0] === cardsSelected[1]) {
    // 			elementsHtml.protection.style.zIndex = 99;
    // 			showModal();
    // 			elementsHtml.msgs.style.display = 'flex';
    // 			elementsHtml.sameCard.style.display = 'flex';
    // 		}
    // 		else{
    // 			cardsSelected[1].style.backgroundSize = '80%';
    // 			setTimeout(imagesEquals, 1000);
    // 		}
    // 	}

    // 	function hideMsgs(){
    // 		elementsHtml.protection.style.zIndex = 97;
    // 		hideModal();
    // 		elementsHtml.msgs.style.display = 'none';
    // 		elementsHtml.sameCard.style.display = 'none';
    // 	}

    function showPanels(panel){
        elementsHtml.panels.style.display = 'flex';
        panel.style.display = 'block';

    }

    function hidePanels(panel){
        elementsHtml.panels.style.display = 'none';
        panel.style.display = 'none';
    }
    
    function showBoard(level){
        elementsHtml.leave.style.display = 'block';
        elementsHtml.board.style.display = 'block';
        level.style.display = 'grid';

    }

    function hideBoard(level){
        elementsHtml.leave.style.display = 'none';
        elementsHtml.board.style.display = 'none';
        hideBoardMinimal(level);
    }

    function hideBoardMinimal(level){
        level.style.display = 'none';
    }

    function resetGame(){
        playingLevel = '';
        points = 0;
        pointsLevel.easy = 0;
        pointsLevel.normal = 0;
        pointsLevel.hard = 0;
        elementsHtml.leave.style.display = 'none';
        elementsHtml.board.style.display = 'none';
        hideBoardMinimal(elementsHtml.easy);
        hideBoardMinimal(elementsHtml.normal);
        hideBoardMinimal(elementsHtml.hard);
        cardsSelected = [undefined, undefined];
        imagesCards = [];
        showPanels(elementsHtml.options);
    }

    function playEasy(){
        playingLevel = 'easy';
        // console.log(playingLevel);
        fetchImages(playingLevel);
        // console.log(imagesCards);
        populatingCards(elementsHtml.easyCards);
        hidePanels(elementsHtml.options);
        showBoard(elementsHtml.easy);
    };
    
    function playNormal(){
        playingLevel = 'normal';
        // console.log(playingLevel);
        fetchImages(playingLevel);
        // console.log(imagesCards);
        // console.log(elementsHtml.normalCards.length);
        populatingCards(elementsHtml.normalCards);
        hidePanels(elementsHtml.options);
        showBoard(elementsHtml.normal);
    };

    function playHard() {
        playingLevel = 'hard';
        // console.log(playingLevel);
        fetchImages(playingLevel);
        // console.log(imagesCards);
        // console.log(elementsHtml.hardCards.length);
        elementsHtml.board.style.width = 'var(--widthBoardHard)';
        elementsHtml.board.style.height = 'var(--heighBoardHard';
        populatingCards(elementsHtml.hardCards);
        hidePanels(elementsHtml.options);
        showBoard(elementsHtml.hard);
    };

    function hideProtection() {
        elementsHtml.protection.style.display = 'none';
    }
    function showProtection() {
        elementsHtml.protection.style.display = 'block';
    }

    function showSplash(){
        elementsHtml.splash.style.display = 'block';
        splashVisible = setInterval(whileSplashVisible, 5000);
    };

    function hideSplash() {
        elementsHtml.splash.style.display = 'none';
        splashVisible = false;
        showPanels(elementsHtml.options);
        elementsHtml.header.style.display = 'block';
        elementsHtml.main.style.display = 'flex';
    };

    function showMessage(msg){
        showProtection();
        elementsHtml.message.textContent = msg;
        elementsHtml.msgs.style.display = 'block';
        setTimeout(hideMessage, 1000);
    }

    function hideMessage() {
        elementsHtml.message.textContent = '';
        elementsHtml.msgs.style.display = 'none';
        hideProtection();
    }

    function whileSplashVisible(){
        if (elementsHtml.splash.style.display === 'block'){
            showMessage('Clique no dragão!');
        }else{
            splashVisible = false;
        }
    }
    
showSplash();


   

})();