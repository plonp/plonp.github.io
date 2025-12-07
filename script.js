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
			const f = new Intl.DateTimeFormat("en-my", {dateStyle: "full", timeStyle: "short"});
			_date = f.format(_date);
			// _date = `${_date.getHours()}:${_date.getMinutes()}, ${_date.getDate()} ${get_month_name(_date.getMonth())} ${_date.getFullYear()}`;
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
					<div class='component-header'><h3>${fileName}</h3><span>${_date}</span></div>
					<div class='component-preview'>Loading...</div>
					<div class='component-nav'>
						<a href='' id='btn-html' class=''>HTML</a>
						<a href='' id='btn-css' class='active'>CSS</a>
					</div>
					<div class='component-code-container'>
						<div class='component-code-block'></div>
						<a id='btn-copy' href=''><img src='/assets/icons/icon-button-copy.svg'></a>
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
					const tabs = compContainer.querySelector('.component-nav'), btnCopy = compContainer.querySelector('#btn-copy');
					tabs.addEventListener('click', (e) => {
						e.preventDefault();
						for (var i = 0; i < tabs.children.length; i++) {tabs.children[i].classList.remove('active');}
						if (e.target.id === "btn-html") {e.target.classList.add('active'); codeContainer.innerText = `${codeHTML}`}
						else if (e.target.id === "btn-css") {e.target.classList.add('active'); codeContainer.innerText = `${codeCSS}`}
					});
					btnCopy.addEventListener('click', (e) => {
						e.preventDefault(); console.log(e.target.id);
						navigator.clipboard.writeText(codeContainer.innerText);
					});

			}


	} catch (error) {console.error(error);}
}


function get_month_name(monthNum) {
	const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	const monthNames = ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	return monthNames[monthNum];
}