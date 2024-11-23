import { useState } from "react"
import Button from "./Button.jsx"

export default function App() {
	const [count, setCount] = useState(0);
	return (
		<>
		<h1> Welcome to my App</h1>
		<MyButton />
		<Button label = "test" backgroundColor="#909090" size="lg"/>
		</>
	)
}




/* ------------------------------------------------ Variables & Objects ------------------------------------------------ */
const user = {
	name: "Homs Da Bombs",
	imgURL: "https://i.imgur.com/yXOvdOSs.jpg",
	imgSize: "90px",
	style: {
		width: "200px", height: "100px",
		margin: "auto",
		border: "10px",
		borderRadius: "999px",
		backgroundColor: "red"
	},
}

// const _randomName = get_random_name();
// user.name = _randomName;

/* ------------------------------------------------ REACT Components ------------------------------------------------ */
function MyButton() { //This is React Component because it starts with Uppercase Naming
	const [count, setCount] = useState(0);

	function handleClick() {
		//alert("You Clicked Me!");
		// user.name = get_random_name();
		// console.log(user.name);
		setCount(count + 1);
	}
	console.log(count);
	return (
		<>
			<img className="" src={user.imgURL} />
			<div className="button" style={user.style}></div>
			<br/><button onClick={handleClick}>Button B</button>
			<br/>{user.name} {/*this is how you access variable / object*/}
		</>
	);
}

const _getName = get_random_name();
// if (_getName == "John") {console.log(_getName)} else {console.log("NO NAME");}
// (_getName == "Tephan") ? console.log(_getName) : console.log("Not Tephan");

// Get Random Names
	function get_random_name() { //This is a normal function because it does not start with Uppercase Naming
		const _array = ["John","Tephan","Homs"];
		const _name = _array[Math.floor(Math.random() * _array.length)];
		return _name;
	}
	//console.log(get_random_name());