window.onload = function() {
	// Library Containers
		const _libButtons = ["/src/buttons/button.html", "/src/buttons/mgm.html"];
	// Fetch components
		fetchData(_libButtons[0]);
	// Search Bar
		const searchBar = document.querySelector('#search-bar');
		searchBar.addEventListener('input', (e) => {searchComponent(e.target.value);});
		function searchComponent(_str) {
			const _val = searchBar.value.toLowerCase();
			const container = document.querySelector('#assets-container');
			for (var i = 0; i < container.children.length; i++) {
				let _strContentCurrentChild = container.children[i].querySelector(':first-child').innerHTML.toLowerCase();
				const isVisible = _strContentCurrentChild.includes(_val);
				container.children[i].classList.toggle('hide', !isVisible);
			}
		}
	// Category Buttons
		const tagsButtons = document.querySelector('.category-tabs');
		for (var i = 0; i < tagsButtons.children.length; i++) {
			tagsButtons.children[i].addEventListener('click', (e) => {
				for (var k = 0; k < tagsButtons.children.length; k++) {tagsButtons.children[k].classList.remove('active');}
				if ((e.target.innerHTML.toLowerCase() === "all") || (e.target.id === "search-bar")) {
					searchBar.value = '';
					tagsButtons.children[0].classList.add('active');
				} else {
					searchBar.value = e.target.innerText;
					e.target.classList.add('active');
				}
				searchComponent(searchBar.value);

				const allHidden = (document.querySelectorAll('#assets-container > :not(.hide)').length === 0);
				document.querySelector('#banner-no-component').classList.toggle('hide', !allHidden);
			});
		}
}

async function fetchData(_url) {
	try {
		const response = await fetch(_url);
		let data = await response.text();

		// Parse Fetched Data to HTML DOM
			const parser = new DOMParser();
			const HTMLData = parser.parseFromString(data, 'text/html');

		// Get Last Modified Date
			let _date = new Date(response.headers.get('last-modified'));
			const f = new Intl.DateTimeFormat("en-my", {dateStyle: "full", timeStyle: "short"});
			_date = f.format(_date);
			// _date = `${_date.getHours()}:${_date.getMinutes()}, ${_date.getDate()} ${get_month_name(_date.getMonth())} ${_date.getFullYear()}`;

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

				const splitStr = _url.split('/');
				const fileName = splitStr[splitStr.length - 2] + " / " + _url.substring(_url.lastIndexOf('/') + 1).replace('.html', '');

				compContainer.innerHTML = `
					<div class='component-header'><h3>${fileName}</h3><span>${_date}</span></div>
					<div class='component-preview'>Loading...</div>
					<div class='component-nav'>
						<a href='' id='btn-html' class='active'>HTML</a>
						<a href='' id='btn-css' class=''>CSS</a>
					</div>
					<div class='component-code-container'>
						<div class='component-code-block'></div>
						<a id='btn-copy' href=''><img src='/assets/icons/icon-button-copy.svg'></a>
					</div>
				`;

				// Shadow DOM
					const _component = HTMLData.querySelector('body');
					const compPreview = compContainer.querySelector('.component-preview');
					const shadow = compPreview.attachShadow({mode: 'open'});
					shadow.appendChild(_component);
				// Preview Code
					const codeContainer = compContainer.querySelector('.component-code-block');
					codeContainer.innerText = `${codeHTML}`;
					const tabs = compContainer.querySelector('.component-nav'), btnCopy = compContainer.querySelector('#btn-copy');
					tabs.addEventListener('click', (e) => {
						e.preventDefault();
						for (var i = 0; i < tabs.children.length; i++) {tabs.children[i].classList.remove('active');}
						if (e.target.id === "btn-html") {e.target.classList.add('active'); codeContainer.innerText = `${codeHTML}`}
						else if (e.target.id === "btn-css") {e.target.classList.add('active'); codeContainer.innerText = `${codeCSS}`}
					});
					btnCopy.addEventListener('click', (e) => {
						e.preventDefault();
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