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
    let pointsLevel = 0;
    let cardsSelected = [undefined, undefined];
    let imagesCards = [];

    elementsHtml.splash.addEventListener('click', hideSplash);

    elementsHtml.levelEasy.addEventListener('click', playEasy);

    elementsHtml.levelNormal.addEventListener('click', playNormal);
    
    elementsHtml.levelHard.addEventListener('click', playHard);
    
    elementsHtml.leave.addEventListener('click', resetGame);

    elementsHtml.start.addEventListener('click', resetGame);
    
    //elementsHtml.restart.addEventListener('click', resetGame);

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
                showMessage('Error in path images', 3000);
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
            levelCards[temp[i + 1]].style.backgroundImage = imagesCards[0];
            imagesCards.shift();
            levelCards[i].addEventListener('click', yourChance);
            levelCards[i + 1].addEventListener('click', yourChance);
        };
    };

    async function cleaningCards(){
        console.log(imagesCards);
        for(let i = 0;i<(imagesCards.length * 2);i++){
            imagesCards[i].style.backgroundImage = 'none';
            imagesCards[i].removeEventListener('click', yourChance);
        }
    }

    function settingImageSize(){
        switch (playingLevel) {
            case 'easy':
                return 'var(--sizeImagesEasy)';
            break;
            case 'normal':
                return 'var(--sizeImagesNormal)';
            break;
            case 'hard':
                return 'var(--sizeImagesHard)';
            break;        
            default:
                showMessage('Error in settingImageSize',1000);
            break;
        }
    }

    function getCardSelected(elementId) {
        if (cardsSelected[0] === undefined) {
            cardsSelected[0] = document.getElementById(elementId);
            cardsSelected[0].style.backgroundSize = settingImageSize();
        }
        else {
            // showProtection(); /// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            cardsSelected[1] = document.getElementById(elementId);
            sameClick()
        }
    };

    function cardsHide() {
        cardsSelected[0].style.backgroundSize = '0%';
        cardsSelected[1].style.backgroundSize = '0%';
    }

    function cardsSelectedReset() {
        cardsSelected[0] = undefined;
        cardsSelected[1] = undefined;
        console.log('cardSelected reseted');
    }

    function removeClickCard() {
        cardsSelected[0].removeEventListener('click', yourChance);
        cardsSelected[1].removeEventListener('click', yourChance);
    }

    function yourChance() {
        getCardSelected(event.currentTarget.id);
    }

    function imagesEquals() {
        if (cardsSelected[0].style.backgroundImage === cardsSelected[1].style.backgroundImage) {
            console.log('Cards Iguais');
            points++;
            if (points >= pointsLevel) {
                showTheEnd();
            }
            removeClickCard();
            cardsSelected[0].style.cursor = 'none';
            cardsSelected[1].style.cursor = 'none';
            cardsSelectedReset();
            hideProtection();
        }
        else {
            console.log('Cards diferentes');
            cardsHide();
            cardsSelectedReset();
            hideProtection();
        }
    }


    // 	function reiniciarJogo() {
    // 		document.location.reload();
    // 	};

    function sameClick() {
        if (cardsSelected[0] === cardsSelected[1]) {
            showMessage('Clique em outro card', 1000);
        }
        else{
            cardsSelected[1].style.backgroundSize = settingImageSize();
            showProtection();
            setTimeout(imagesEquals, 1000);
        }
    }

    function showOptions(){
        elementsHtml.panels.style.display = 'flex';
        elementsHtml.options.style.display = 'block';
    }
    
    function showTheEnd(){
        elementsHtml.panels.style.display = 'flex';
        elementsHtml.theEnd.style.display = 'flex';
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

    function hideBoards(){
        elementsHtml.leave.style.display = 'none';
        elementsHtml.board.style.display = 'none';
        elementsHtml.easy.style.display = 'none';
        elementsHtml.normal.style.display = 'none';
        elementsHtml.hard.style.display = 'none'; 
    }

    async function resetGame(){
        console.log(imagesCards);
        await cleaningCards();
        playingLevel = '';
        points = 0;
        pointsLevel = 0;
        cardsSelected = [undefined, undefined];
        imagesCards = [];
        hidePanels(elementsHtml.theEnd);
        hideBoards();
        showOptions();
    }

    function playEasy(){
        playingLevel = 'easy';
        pointsLevel = elementsHtml.easyCards.length / 2;
        fetchImages(playingLevel);
        elementsHtml.board.setAttribute('class', 'boardEasy')
        populatingCards(elementsHtml.easyCards);
        hidePanels(elementsHtml.options);
        showBoard(elementsHtml.easy);
    };
    
    function playNormal(){
        playingLevel = 'normal';
        pointsLevel = elementsHtml.normalCards.length / 2;
        fetchImages(playingLevel);
        elementsHtml.board.setAttribute('class', 'boardNormal')
        populatingCards(elementsHtml.normalCards);
        hidePanels(elementsHtml.options);
        showBoard(elementsHtml.normal);
    };

    function playHard() {
        playingLevel = 'hard';
        pointsLevel = elementsHtml.hardCards.length / 2;
        fetchImages(playingLevel);
        elementsHtml.board.setAttribute('class', 'boardHard')
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
        showOptions();
        elementsHtml.header.style.display = 'block';
        elementsHtml.main.style.display = 'flex';
    };

    function showMessage(msg, time){
        showProtection();
        elementsHtml.message.textContent = msg;
        elementsHtml.msgs.style.display = 'block';
        setTimeout(hideMessage, time);
    }

    function hideMessage() {
        elementsHtml.message.textContent = '';
        elementsHtml.msgs.style.display = 'none';
        hideProtection();
    }

    function whileSplashVisible(){
        if (elementsHtml.splash.style.display === 'block'){
            showMessage('Clique no dragão!', 1000);
        }else{
            splashVisible = false;
        }
    }
    
showSplash();


   

})();