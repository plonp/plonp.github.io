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
		let _date = new Date(response.headers.get('last-modified'));
		console.log(_date)
		
		const parser = new DOMParser();
		const HTMLData = parser.parseFromString(data, 'text/html');
		console.log('HTMLData : ' , HTMLData)

		const CSSData = HTMLData.querySelector('style');
		const CSSDataFix = CSSData.textContent.replace('\n', '');
		CSSData.textContent.replaceAll('\n', '').replaceAll('\t', '');

		const _component = HTMLData.querySelector('body');
			// _component.style = `${CSSDataFix}`;
		const _previewComp = document.querySelector('.component-preview');
			_previewComp.src = _url;
		const _codeBlock = document.querySelector('.component-code-block').innerHTML = `${CSSDataFix}`;
	} catch (error) {console.log('error : ', error);}
}


// Search button
// Add last modified date of the component