function addToAttempts() {
	var inputText = document.getElementById("phrase").value;
	if (inputText) {
		var newAttempt = document.createElement("li");
		if (pChecker(inputText)) {
			newAttempt.setAttribute("class", "is-palindrome");
		} else {
			newAttempt.setAttribute("class", "not-palindrome");
		}
		var textnode = document.createTextNode(inputText);
		newAttempt.appendChild(textnode);
		document.getElementById("attempts").appendChild(newAttempt);
		document.getElementById("phrase").innerHTML = "";
	} else {
		alert("Input Not Found!");
	}
}

function pChecker(text) {
	let symbol = /[~`!@#$%^&*()_+-=[]{}\|;:'"<>,.?]/g;
	if (text.length <= 0) {
		return false;
	}
	let rs_text = text
		.replace(symbol, "")
		.replace(/[^A-Za-z0-9]/gi, "")
		.replace(/(\s){2,}/g, "$1")
		.replace(/\s/g, "")
		.toLowerCase();
	let reverse_text = rs_text.split("").reverse().join("");
	return rs_text === reverse_text;
}
