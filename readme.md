## Frontend Tips
```css
/*For truncate, add min-width: 0; to override default behavior of FLEX (default min-witdth: auto;) or GRID item */
	.truncate-container {display:flex; flex-direction: column; min-width: 0;}
	.truncate-text {
		overflow: hidden;
		white-space: nowrap; /* stops text from wrapping of overflow */
		text-overflow: ellipsis; /* truncate text that overflows its container and display an ellipsis (...) */
		width: 100%;
	}
	Tailwind syntax : truncate, line-clamp-2, min-w-0

/*responsive body alternative*/
	html {height: 100dvh;} /*device view height*/
	body {width: min(800px, 98%);}

/*relative padding*/
	div {padding: min(5em, 8%);}

/*responsive font size*/
	h1 {font-size: clamp(1.8rem, 10vw, 5rem); /*(min, preferred, max)*/}

/*image manipulation*/
	img {
		max-width: 100%; height: auto;
		aspect-ratio: 1/1;
		object-fit: cover;
	}

/*show / hide element toggle with css*/
	<input id="checkbox" type="checkbox"></input>
	<label for="checkbox">My Label</label>
	.siblingElementToToggle {display: none;}
	#checkbox {display: none;}
	#checkbox:checked ~ .siblingElementToToggle {display: block;}

/* Put in innerHtml to act as blank text*/
	&nbsp; // non-breaking space

/* Remove default vertical spacing in text */
	REf : https://www.reddit.com/r/css/comments/1lylx9p/property_lineheight_how_to_remove_the_space_above/
```
