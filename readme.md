## Frontend Tips
```js
// For truncate, add min-width: 0; to override default behavior of FLEX (default min-witdth: auto;) or GRID item 
	.truncate-text {
		overflow: hidden;
		white-space: nowrap; /* stops text from wrapping of overflow */
		text-overflow: ellipsis; /* truncate text that overflows its container and display an ellipsis (...) */
		width: 200px; /* Or any other specific width constraint */
	}
```