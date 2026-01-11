window.onload = function() {
	// Library Containers
		const _libButtons = [
			"/src/cards/texture-overlay-card.html",
			"/src/buttons/buttonSwipe.html",
			"/src/buttons/navigation-tabs.html",
			"/src/others/Tooltips-Guide.html",
			"/src/layouts/responsive-grid-container.html",
			"/src/layouts/responsive-flex-container.html",
			"/src/buttons/button3D.html",
			"/src/buttons/button.html",
			"/src/buttons/buttonRounded.html",
		];
	// Fetch components
		async function loadComponents(_components) {for (var i = 0; i < _components.length; i++) {await fetchData(_libButtons[i]);}}
		loadComponents(_libButtons);
	// Category Buttons
		const searchBar = document.querySelector('#search-bar');
		const tagsButtons = document.querySelector('.category-tabs');
		const bannerElement = document.querySelector('#banner-no-component');
		// Search Bar
			searchBar.addEventListener('input', (e) => {
				searchComponent(e.target.value);
				setActiveNav(tagsButtons, "all");
				hideElement(bannerElement, (document.querySelectorAll('#assets-container > :not(.hide)').length === 0));
			});
			function searchComponent(_str) {
				const _val = searchBar.value.toLowerCase();
				const container = document.querySelector('#assets-container');
				for (var i = 0; i < container.children.length; i++) {
					let _strContentCurrentChild = container.children[i].querySelector(':first-child').innerHTML.toLowerCase();
					const isVisible = _strContentCurrentChild.includes(_val);
					container.children[i].classList.toggle('hide', !isVisible);
				}
			}
			function hideElement(_elementToToggle, _condition) {_elementToToggle.classList.toggle('hide', !_condition);}
		// Tabs
			for (var i = 0; i < tagsButtons.children.length - 1; i++) {
				tagsButtons.children[i].addEventListener('click', (e) => {
					let _strActive = "all";
					if ((e.target.innerHTML.toLowerCase() === "all") || (e.target.id === "search-bar")) {
						searchBar.value = '';
					} else {
						searchBar.value = e.target.innerText;
						_strActive = searchBar.value;
					}
					setActiveNav(tagsButtons, _strActive);
					searchComponent(searchBar.value);
					hideElement(bannerElement, (document.querySelectorAll('#assets-container > :not(.hide)').length === 0));
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
						<a id='btn-copy' href=''></a>
					</div>
				`;

				// Shadow DOM
					const _component = HTMLData.querySelector('body');
					const compPreview = compContainer.querySelector('.component-preview');
					compPreview.innerHTML = '';
					const shadowRoot = compPreview.attachShadow({mode: 'open'});
					shadowRoot.appendChild(_component);
				// Preview Code
					const codeContainer = compContainer.querySelector('.component-code-block');
					codeContainer.textContent = `${codeHTML}`;
					hljs.highlightElement(codeContainer);

					const tabs = compContainer.querySelector('.component-nav'), btnCopy = compContainer.querySelector('#btn-copy');
					tabs.addEventListener('click', (e) => {
						e.preventDefault();
						if (e.target.id === "btn-html") {
							setActiveNav(tabs, "html");
							e.target.classList.add('active'); codeContainer.textContent = `${codeHTML}`;
							codeContainer.className = 'component-code-block language-xml'; delete codeContainer.dataset.highlighted; hljs.highlightElement(codeContainer);
						} else if (e.target.id === "btn-css") {
							setActiveNav(tabs, "css");
							e.target.classList.add('active'); codeContainer.textContent = `${codeCSS}`;
							codeContainer.className = 'component-code-block language-css'; delete codeContainer.dataset.highlighted; hljs.highlightElement(codeContainer);
						}
					});
					btnCopy.addEventListener('click', (e) => {
						e.preventDefault();
						btnCopy.classList.add('active');
						setTimeout(() => {btnCopy.classList.remove('active')}, 500);
						navigator.clipboard.writeText(codeContainer.innerText);
					});
			}
		return;
	} catch (error) {console.error(error); return;}
}

function get_month_name(monthNum) {
	const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	const monthNames = ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	return monthNames[monthNum];
}

function setActiveNav(_parElement, _str = "") {
	for (var i = 0; i < _parElement.children.length; i++) {
		_parElement.children[i].classList.remove('active');
		if (_parElement.children[i].innerHTML.toLowerCase() === _str.toLowerCase()) {_parElement.children[i].classList.add('active');}
	}
}
