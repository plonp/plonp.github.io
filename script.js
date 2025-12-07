window.onload = function() {
	// Library Containers
		const _libButtons = ["/src/buttons/button.html", "/src/buttons/mgm.html"];
	// Fetch components
		fetchData(_libButtons[0]);
}

async function fetchData(_url) {
	try {
		const response = await fetch(_url);
		let data = await response.text(); //console.log('data : ', JSON.stringify(data));

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
			codeHTML = codeHTML.replace('\r','').replace('\n', '');

		// Load CSS code block
			const codeCSS = HTMLData.querySelector('style').textContent.replace('\n', '');

		// Create Code Templates
			const container = document.querySelector('#assets-container');
			if (container) {
				const compContainer = document.createElement('div');
				compContainer.classList.add('component-container');
				container.appendChild(compContainer);

				const fileName = _url.substring(_url.lastIndexOf('/') + 1).replace('.html','');

				compContainer.innerHTML = `
					<h3>${fileName}</h3>
					<div class='component-preview'>Loading...</div>
					<div class="component-nav">
						<a href="" id="btn-html" class="">HTML</a>
						<a href="" id="btn-css" class="active">CSS</a>
					</div>
					<div class="component-code-container">
						<div class="component-code-block"></div>
						<a class="btn-copy" href=""><img src="/assets/icons/icon-button-copy.svg"></a>
					</div>
				`;

				// Shadow DOM
					const _component = HTMLData.querySelector('body');
					const compPreview = compContainer.querySelector('.component-preview');
					const shadow = compPreview.attachShadow({mode: 'open'}); //console.log(shadow)
					shadow.appendChild(_component);
				// Preview Code
					const codeContainer = compContainer.querySelector('.component-code-block');
					codeContainer.innerText = `${codeCSS}`;
					const tabs = compContainer.querySelector('.component-nav');
					tabs.addEventListener('click', (e) => {
						e.preventDefault();
						for (var i = 0; i < tabs.children.length; i++) {tabs.children[i].classList.remove('active');}
						if (e.target.id === "btn-html") {e.target.classList.add('active'); codeContainer.innerText = `${codeHTML}`}
						else if (e.target.id === "btn-css") {e.target.classList.add('active'); codeContainer.innerText = `${codeCSS}`}
					});

			}


	} catch (error) {console.error(error);}
}