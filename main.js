var userRows = 0;
var userColumns = 0;

// function takes user input to set the size of the matrix they wish to calculate determinate on
function setMatrixSize()
{
  userRows = document.getElementById("rows").value;
  userColumns = document.getElementById("columns").value;
  
  if (userRows !== userColumns)
  {
    alert(userRows + " x " + userColumns + " is not a valid matrix for performing determinant calculations.  Your matrix must be a square, please try again.");
    refresh();
  }
  else if (userRows <= 1) 
  {
    alert("Matrix size must be atleast 2x2, please try again.")
    refresh();
  }
  else if (isNaN(userRows)) 
  {
    alert("The number of rows and columns must be a positive decimal number, please try again.")
    refresh();
  }
  else 
  {
    var destroy = document.getElementById("set_size");
    destroy.remove(); // wipes off the button to set matrix size, no longer needed.
    drawMatrixInputField();
  }  
}

// based on user input for dimensions, this creates the correct size input area for the user to input the matrix data
function drawMatrixInputField()
{
    var table = document.getElementById("myTable");
    for (var i = 0; i < userRows; i++)
    {
        var newRow = table.insertRow(i);
        for (var j = 0; j < userColumns; j++)
        {
            var newCell = document.createElement("td");
            newCell.innerHTML = "<input type=\"text\" class=\"cell\"/>";
            newRow.appendChild(newCell);
        }
    }

    var br = document.createElement("br");
    document.body.appendChild(br);

    var btn = document.createElement("input");
    btn.type = "button";
    btn.className = "input_button";
    btn.value = "Calculate Determinant";
    btn.id = "calc_determinant"
    btn.onclick = createDisplayResult;
    document.body.appendChild(btn);
}

// takes user input from above function and creates 2D array 
function createDisplayResult()
{
    var index = 0
    var userDefinedMatrix = new Array(userRows)
    for (var i = 0; i < userRows; i++)
    {
        userDefinedMatrix[i] = new Array(userColumns);
        for (var j = 0; j < userColumns; j++)
        {
            userDefinedMatrix[i][j] = document.getElementsByClassName("cell")[index].value;
            index++;
        }
    }

    var result = calculateDeterminant(userDefinedMatrix);
    var destroy = document.getElementById("calc_determinant");
    destroy.remove();

    var displayResult = document.createElement("p");
    displayResult.className = "final_result";
    displayResult.innerHTML = "The determinant of your matrix: |A| = " + result;
    document.body.appendChild(displayResult);

    var refreshButton = document.createElement("button");
    refreshButton.innerHTML = "Start Over";
    refreshButton.className = "input_button";
    refreshButton.onclick = refresh;
    document.body.appendChild(refreshButton);
}

// recursively calculate the determinant - the fun part
function calculateDeterminant(theMatrix)
{
    if (theMatrix.length != theMatrix[0].length)
        return "Not a valid Matrix";
    else if (theMatrix.length == 2)
        return ((theMatrix[0][0] * theMatrix[1][1]) - (theMatrix[0][1] * theMatrix[1][0]));
    else
    {
        var result = new Array();
        var determinant = 0;

        for (let i = 0; i < theMatrix.length; i++)
        {
            var subMatrix = createSubMatrix(theMatrix, i);
            result.push(theMatrix[0][i] * calculateDeterminant(subMatrix)); 
        }

        for (let i = 0; i < result.length; i++)
        {
            if (i % 2 == 0) determinant += result[i];
            else determinant -= result[i];
        }

       return determinant;
    }
}

// helper function for calculateDeterminate function.
/*
About:  To calculate a determinant in linear algebra, the matrix must be 
continually broken down to a simple 2x2 matrix.  So for any matrix larger 
than 2x2, we must create a smaller "submatrix".  The determinant of the smaller 2x2
sub matrix is eventually multiplied against it's parent value on the row directly 
above it (this occurs in the first for loop in the calculateDeterminant function, along
with the recursive call).  For better visualization of the mathematical process, please search
the internet.  

The below function takes a startPosition (index) from the main array (theMatrix)
to use as the eventual multiplier for the 2x2 sub matrix. 

The final if statement is in place so that only data from columns other than that 
of the current startPosition are written into the submatrix 
(search the internet for better visualization of the process!)
*/
function createSubMatrix(theMatrix, startPosition)
{
    subMatrix = new Array(theMatrix.length - 1);
    for (let i = 0; i < subMatrix.length; i++)
    {
        subMatrix[i] = new Array(theMatrix.length - 1);
        var k = 0;
        for (let j = 0; j <= subMatrix[i].length; j++)
        {   
            if (startPosition != j)
            {
                subMatrix[i][k] = theMatrix[i + 1][j];
                k++;
            }
        }
    }
    return subMatrix;
}

function refresh()
{
    location.reload();
}
