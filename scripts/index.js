(function () {
	'use strict';
	let cards = document.getElementsByClassName('card');
	let modal = document.getElementById('modal');
	let opcoes = document.getElementById('opcoes');
	let dificuldade = document.getElementById('dificuldade');
	let facil = document.getElementById('facil');
	let medio = document.getElementById('medio');
	let dificil = document.getElementById('dificil');
	let fim = document.getElementById('fim');
	let iniciar = document.getElementById('iniciar');
	let reiniciar = document.getElementById('reiniciar');

	let pontos = 0;
	let cardsSelected = [undefined, undefined];
	let images = [
		'a.svg',
		'b.svg',
		'c.svg',
		'd.svg',
		'e.svg',
		'f.svg'
	];

	facil.addEventListener('click', easy);

	reiniciar.addEventListener('click', reiniciarJogo);

	iniciar.addEventListener('click', reiniciarJogo);

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

	async function populatingCards() {
		var temp = returnDifferentsRandomNumbers(0, cards.length);
		for (var i = 0; i < cards.length; i += 2) {
			cards[temp[i]].style.backgroundImage = "url(\"./images/" + images[0] + "\")";
			cards[temp[i]].style.backgroundSize = '0%';
			cards[temp[i]].style.backgroundRepeat = 'no-repeat';
			cards[temp[i]].style.backgroundPosition = 'center';
			cards[temp[i + 1]].style.backgroundImage = "url(\"./images/" + images[0] + "\")";
			cards[temp[i + 1]].style.backgroundSize = '0%';
			cards[temp[i + 1]].style.backgroundRepeat = 'no-repeat';
			cards[temp[i + 1]].style.backgroundPosition = 'center';
			images.shift();
			cards[i].addEventListener('click', yourChance);
			cards[i].setAttribute('id', "card-" + i);
			cards[i + 1].addEventListener('click', yourChance);
			cards[i + 1].setAttribute('id', "card-" + (i + 1));
		};
	};

	function hideModal() {
		modal.style.width = '0%';
		modal.style.height = '0%';
	}
	function showModal() {
		modal.style.width = '100%';
		modal.style.height = '100%';
	}

	function getCardSelected(elementId) {
		if (cardsSelected[0] === undefined) {
			cardsSelected[0] = document.getElementById(elementId);
			cardsSelected[0].style.backgroundSize = '80%';
		}
		else {
			showModal();
			cardsSelected[1] = document.getElementById(elementId);
			if (cardsSelected[0] === cardsSelected[1]) {
				cardsSelected[1] = undefined;
				hideModal();
				alert('Selecione outro card');
			}
			else{
				cardsSelected[1].style.backgroundSize = '80%';
				setTimeout(imagesEquals, 1000);
			}
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
			pontos++;
			if (pontos >= 6) {
				theEnd();
			}
			removeClickCard();
			cardsSelectedReset();
			hideModal();
		}
		else {
			console.log('Cards diferentes');
			cardsHide();
			cardsSelectedReset();
			hideModal();
		}
	}

	function theEnd() {
		showModal();
		opcoes.style.display = 'flex';
		fim.style.display = 'flex';
	};

	function easy() {
		populatingCards();
		dificuldade.style.display = 'none';
		opcoes.style.display = 'none';
	};

	function reiniciarJogo() {
		document.location.reload();
	};

	function sameClick() {
		if (cardsSelected[0] === cardsSelected[1]) {
			alert('Selecione outro card')
		}
	}

})();