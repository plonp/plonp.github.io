## Frontend Tips
```js
// For truncate, add min-width: 0; to override default behavior of FLEX (default min-witdth: auto;) or GRID item 
	.truncate-text {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 200px; /* Or any other specific width constraint */
	}
```