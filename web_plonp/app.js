function myFunction() {
	const _array = ["testing some stuff", "glorious purpose", "the good shit"];
	let _text = _array[Math.floor(Math.random() * _array.length)];
	const _addText = document.getElementById('add');
	_addText.innerHTML += _text + ", ";
}
setInterval(myFunction, 1000);