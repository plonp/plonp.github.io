window.onload = function() {
	// Library Containers
		const _libButtons = ["/src/buttons/button.html"];
	// Loader
		const _body = document.querySelector('body');
	// Fetch components
		fetchData("/src/buttons/button.html");
}

async function fetchData(_url) {
	try {
		const response = await fetch(_url);
		let data = await response.text(); //console.log('data : ', data);
		data = data.replace('\r\n', '');
		// Get HTML Code Block
			const startIndex = data.indexOf('<body>'), endIndex = data.indexOf('</body>');
			let codeHTML = data.substring(startIndex, endIndex).replace('<body>','');
			console.log('codeHTML : ', JSON.stringify(codeHTML));

		// Get Last Modified Date
			let _date = new Date(response.headers.get('last-modified'));
			_date = `${_date.getDate()}.${_date.getMonth()}.${_date.getFullYear()}`;
			console.log(_date);
		
		const parser = new DOMParser();
		const HTMLData = parser.parseFromString(data, 'text/html'); //console.log('HTMLData : ' , HTMLData);

		// Load Code Preview
			const codeCSS = HTMLData.querySelector('style').textContent.replace('\n', '');

			const htmlBlock = HTMLData.body; //console.log(htmlBlock.textContent);

		const _component = HTMLData.querySelector('body');
		const _codeBlock = document.querySelector('.component-code-block');
		_codeBlock.textContent = `${codeCSS}`;

		// Shadow DOM
			const _compPreview = document.querySelector('.component-preview');
			const shadow = _compPreview.attachShadow({mode: 'open'}); //console.log(shadow)
			shadow.appendChild(_component);

			// shadow.innerHTML = `${_component.innerHTML}`;

	} catch (error) {console.log('error : ', error);}
}