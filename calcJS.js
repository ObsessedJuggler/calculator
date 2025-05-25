const display = document.querySelector('.table');
let expression = '';
let resetOnNextInput = false;

function handleInput(value) {
	if (resetOnNextInput) {
		expression = '';
		display.value = '';
		resetOnNextInput = false;
	}

	if (value === '=') {
		try {
			const result = eval(expression);
			display.value = result;
			expression = result.toString();
			resetOnNextInput = true;
		} catch {
			display.value = 'Error';
			expression = '';
			resetOnNextInput = true;
		}
	} else if (value === 'C') {
		expression = '';
		display.value = '';
	} else {
		expression += value;
		display.value = expression;
	}
}

document.querySelectorAll('.item').forEach(button => {
	button.addEventListener('click', () => {
		let value = button.textContent.trim();
		handleInput(value);
	});
});

document.addEventListener('keydown', (event) => {
	const key = event.key;
	const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.'];

	if (allowedKeys.includes(key)) {
		handleInput(key);
	} else if (key === 'Enter') {
		handleInput('=');
		event.preventDefault();
	} else if (key === 'Backspace') {
		expression = expression.slice(0, -1);
		display.value = expression;
	} else if (key.toLowerCase() === 'c') {
		handleInput('C');
	} else if (key === '=') {
		handleInput('=');
	}
});

const audio = document.getElementById('audioElement');
const timeDisplay = document.getElementById('trackTime');
let isPlaying = false;

function toggleAudio() {
	if (audio.paused) {
		audio.play();
		isPlaying = true;
		document.querySelector('.playAudio').textContent = '⏸';
	} else {
		audio.pause();
		isPlaying = false;
		document.querySelector('.playAudio').textContent = '▶';
	}
}

audio.addEventListener('timeupdate', () => {
	const minutes = Math.floor(audio.currentTime / 60);
	const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
	timeDisplay.textContent = `${minutes}:${seconds}`;
});
