function myFunction() {
	const _array = ["testing some stuff", "glorious purpose", "good shit"];
	let _text = _array[Math.floor(Math.random() * _array.length)];
	const _addText = document.getElementById('add');
	_addText.innerHTML += _text + ", ";
}

let _textCount = 32;
function counter() {
	if (_textCount > 0) {
		const _array = ["testing some stuff", "glorious purpose", "good shit"];
		let _text = _array[Math.floor(Math.random() * _array.length)];
		const _addText = document.getElementById('add');
		_addText.innerHTML += _text + ", ";		
		
		_textCount--;
	}
}
setInterval(counter, 1000);