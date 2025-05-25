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

/*document.querySelector('.playAudio').addEventListener('click', () => {
	
 	const audio = document.getElementById('bgMusic');
	const button = document.querySelector('.playAudio');
	
	if (audio.paused) {
		audio.play()
		.then(() => {
			button.textContent = '⏸️';
		})		
		.catch(err => {
			console.error('Ошибка при воспроизведении:', err);
		});
	} else {
		audio.pause();
		button.textContent = '▶️';
	}
}); */

const audio = document.getElementById('bgMusic');
const toggleAudio = document.getElementById('toggleAudio');

toggleAudio.addEventListener('change', () => {
	if (toggleAudio.checked) {
		console.log("Попытка воспроизведения...");
		audio.play()
			.then(() => console.log("Воспроизведение началось"))
			.catch(err => console.error("Ошибка при воспроизведении:", err));
	} else {
		audio.pause();
		console.log("Музыка поставлена на паузу");
	}
});
