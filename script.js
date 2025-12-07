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
		const data = await response.text();
		let _date = new Date(response.headers.get('last-modified')); console.log(_date);
		
		const parser = new DOMParser();
		const HTMLData = parser.parseFromString(data, 'text/html');
		console.log('HTMLData : ' , HTMLData)

		const codeBlock = HTMLData.querySelector('style');
		const codeBlockFix = codeBlock.textContent.replace('\n', '');
		// codeBlock.textContent.replaceAll('\n', '').replaceAll('\t', '');

		const _component = HTMLData.querySelector('body');
		const _script = HTMLData.querySelector('script');
		// const _previewComp = document.querySelector('.component-preview');
		document.querySelector('.component-code-block').innerHTML = `${codeBlockFix}`;

		// Shadow DOM
			const _compPreview = document.querySelector('.component-preview');
			const shadow = _compPreview.attachShadow({mode: 'open'}); console.log(shadow)
			shadow.appendChild(_component);
			shadow.appendChild(_script);

			// shadow.innerHTML = `${_component.innerHTML}`;

	} catch (error) {console.log('error : ', error);}
}