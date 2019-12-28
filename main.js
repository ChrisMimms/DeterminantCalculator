let userSize = 0;

// function takes user input to set the size of the matrix they wish to calculate determinate on
function setMatrixSize() {
	userSize = document.getElementById("rows").value;
	if (userSize <= 1) {
		alert("Matrix size must be atleast 2x2, please try again.");
		refresh();
	} else if (isNaN(userSize)) {
		alert(
			"The number of rows and columns must be a positive decimal number, please try again."
		);
		refresh();
	} else {
		let destroy = document.getElementById("set_size");
		destroy.remove(); // wipes off the button to set matrix size, no longer needed.
		drawMatrixInputField();
	}
}

// based on user input for dimensions, this creates the correct size input area for the user to input the matrix data
function drawMatrixInputField() {
	let table = document.getElementById("myTable");
	for (let i = 0; i < userSize; i++) {
		let newRow = table.insertRow(i);
		for (let j = 0; j < userSize; j++) {
			let newCell = document.createElement("td");
			newCell.innerHTML = '<input type="text" class="cell"/>';
			newRow.appendChild(newCell);
		}
	}

	let br = document.createElement("br");
	document.body.appendChild(br);

	let btn = document.createElement("input");
	btn.type = "button";
	btn.className = "input_button";
	btn.value = "Calculate Determinant";
	btn.id = "calc_determinant";
	btn.onclick = createDisplayResult;
	document.body.appendChild(btn);
}

// takes user input from above function and creates 2D array
function createDisplayResult() {
	let index = 0;
	let userDefinedMatrix = new Array(userSize);
	for (let i = 0; i < userSize; i++) {
		userDefinedMatrix[i] = new Array(userSize);
		for (let j = 0; j < userSize; j++) {
			userDefinedMatrix[i][j] = document.getElementsByClassName("cell")[
				index
			].value;
			index++;
		}
	}

	let result = calculateDeterminant(userDefinedMatrix);
	let destroy = document.getElementById("calc_determinant");
	destroy.remove();

	let displayResult = document.createElement("p");
	displayResult.className = "final_result";
	displayResult.innerHTML = "The determinant of your matrix: |A| = " + result;
	document.body.appendChild(displayResult);

	let refreshButton = document.createElement("button");
	refreshButton.innerHTML = "Start Over";
	refreshButton.className = "input_button";
	refreshButton.onclick = refresh;
	document.body.appendChild(refreshButton);
}

// recursively calculate the determinant - the fun part
function calculateDeterminant(theMatrix) {
	if (theMatrix.length !== theMatrix[0].length) {
		return "Not a valid Matrix";
	} else if (theMatrix.length === 2) {
		return (
			theMatrix[0][0] * theMatrix[1][1] - theMatrix[0][1] * theMatrix[1][0]
		);
	} else {
		let result = new Array();
		let determinant = 0;

		for (let i = 0; i < theMatrix.length; i++) {
			let subMatrix = createSubMatrix(theMatrix, i);
			result.push(theMatrix[0][i] * calculateDeterminant(subMatrix));
		}

		for (let i = 0; i < result.length; i++) {
			if (i % 2 === 0) {
				determinant += result[i];
			} else {
				determinant -= result[i];
			}
		}
		return determinant;
	}
}

// helper function for calculateDeterminate function.
function createSubMatrix(theMatrix, startPosition) {
	subMatrix = new Array(theMatrix.length - 1);
	for (let i = 0; i < subMatrix.length; i++) {
		subMatrix[i] = new Array(theMatrix.length - 1);
		let k = 0;
		for (let j = 0; j <= subMatrix[i].length; j++) {
			if (startPosition != j) {
				subMatrix[i][k] = theMatrix[i + 1][j];
				k++;
			}
		}
	}
	return subMatrix;
}

function refresh() {
	location.reload();
}