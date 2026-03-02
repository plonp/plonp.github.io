## Frontend Tips
```js
// For truncate, add min-width: 0; to override default behavior of FLEX (default min-witdth: auto;) or GRID item 
	.truncate-container {display:flex; flex-direction: column; min-width: 0;}
	.truncate-text {
		overflow: hidden;
		white-space: nowrap; /* stops text from wrapping of overflow */
		text-overflow: ellipsis; /* truncate text that overflows its container and display an ellipsis (...) */
		width: 100%;
	}
```