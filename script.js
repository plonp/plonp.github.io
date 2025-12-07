window.onload = function() {
	// Library Containers
		const _libButtons = ["/src/buttons/button.html"];
	// Fetch components
		fetchData(_libButtons[0]);
	// Buttons
		document.addEventListener('click', (e) => {
			e.preventDefault();
			switch (e.target.id) {
				case "btn-html": case "btn-css":
					console.log(e.target.parentElement.parentElement);
					break;
				default:
					console.log(e.target);
					break;
			}
		});
}

async function fetchData(_url) {
	try {
		const response = await fetch(_url);
		let data = await response.text(); //console.log('data : ', data);
		data = data.replace('\r\n', '');

		// Parse Fetched Data to HTML DOM
			const parser = new DOMParser();
			const HTMLData = parser.parseFromString(data, 'text/html'); //console.log('HTMLData : ' , HTMLData);

		// Get Last Modified Date
			let _date = new Date(response.headers.get('last-modified'));
			_date = `${_date.getDate()}.${_date.getMonth()}.${_date.getFullYear()}`;
			console.log(_date);

		// Load HTML code block
			const startIndex = data.indexOf('<body>'), endIndex = data.indexOf('</body>');
			let codeHTML = data.substring(startIndex, endIndex).replace('<body>','');
			console.log('codeHTML : ', JSON.stringify(codeHTML));

		// Load CSS code block
			const codeCSS = HTMLData.querySelector('style').textContent.replace('\n', '');

		const _component = HTMLData.querySelector('body');
		const _codeBlock = document.querySelector('.component-code-block');
		_codeBlock.textContent = `${codeHTML}`;

		// Shadow DOM
			const _compPreview = document.querySelector('.component-preview');
			const shadow = _compPreview.attachShadow({mode: 'open'}); //console.log(shadow)
			shadow.appendChild(_component);

			// shadow.innerHTML = `${_component.innerHTML}`;

	} catch (error) {console.log('error : ', error);}
}