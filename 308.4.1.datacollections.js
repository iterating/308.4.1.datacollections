// Objectives
// Use arrays to store ordered lists of data.
// Use objects to store keyed lists of data.
// Use conditional logic to process data.
// Use loops to handle repetitive tasks.
// Transform data according to specifications
console.group(`Pt 1 Refactoring parseCSV()`)

function parseCSV(input) {
    function validateArgs(input){
        if (typeof input !== 'string') {
            throw new Error('Malformed data. Is it in CSV format?')}
        }
    // Each row will be an array of strings. The table will be an array of rows (2d array)
    validateArgs(input);
    let selectCell = [];
    let selectRow = [];
    let csvRows = [];
    // Loop through each character and put it into the row array, delimited by ","
    try {
        for (let i = 0; i < input.length; i++) {
            let selected = input[i];
            switch (selected){
                // "," delimits a cell, push cell into row and start a new one
                case ',':
                    // push character to row array
                    selectRow.push(selectCell);
                    // reset the cell select
                    selectCell = [];
                    // push last cell that isn't delimited
                    if (selectCell.length > 0 ) {
                        selectRow.push(selectCell);
                    }
                    break;
                case '\n':
                    // \n delimits a new row
                    if (input[i] == '\n') {
                    // push cell into row array
                    selectRow.push(selectCell);
                    // push rows into array of all rows
                    csvRows.push(selectRow);
                    // reset the cell and row select
                    selectCell = [];
                    selectRow = [];
                    // push last row that isn't delimited
                    if (selectRow.length > 0 ) {
                        csvRows.push(selectRow);
                    }
                }
                break;
            default: 
                // add each character to the selected cell 
                selectCell += selected;
                break;
            }
        }
    // Render the table
        console.log(csvRows)
    } catch (error) {
        console.error(error.message);
    }
}

csvData =
  "Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232";


parseCSV(csvData)

console.groupEnd()
console.group(`Pt 2`)


// Declare a variable that stores the number of columns in each row of data within the CSV.
function csvToArray(input) {
  //limit input to strings
  let inputString = String(input);
  let csvRow = inputString.split("\n");
  const csvArray = [];
  //console.log(rows)
  csvRow.forEach((row)=>{
    let csvColumn = row.split(",");
    csvArray.push(csvColumn)
  })
  // for (let i = 0; i < csvRow.length; i++) {
  //   csvColumn = csvRow[i].split(",");
  //   csvArray.push(csvColumn);
  // }
  return csvArray;
}
console.log(csvToArray(csvData));
csvArray = csvToArray(csvData);

console.groupEnd()
console.group(`Part 3`)
// Pt3 Array of Objects
// TODO: improved error handling for input, where it takes an array of arrays. migrate to Typescript?
function labelColumns(input) {
  try {
    // First array is header
    let headers = input[0].map((header) => header.toLowerCase());
    let labeledTable = [];
    //slice 1 to ignore heading row
    input.slice(1).forEach((row) => {
      if (row.length !== headers.length) {
        throw new Error(
          "Mismatch between number of columns in each row and number of columns in the header"
        );
      }
      let rowObj = {};
      headers.forEach((header, headerIndex) => { // Destructuring
        rowObj[header] = row[headerIndex]; 
      });
      labeledTable.push(rowObj);
    });

    return labeledTable;
  } catch (error) {
    console.error(error.message);
  }
}
// Output the result
csvLabeled = labelColumns([
  ["ID", "Name", "Occupation", "Age"],
  ["42", "Bruce", "Knight", "41"],
  ["57", "Bob", "Fry Cook", "19"],
  ["63", "Blaine", "Quiz Master", "58"],
  ["98", "Bill", "Doctor’s Assistant", "26"],
]);
console.log(csvLabeled);


console.groupEnd()
console.group(`Part4`)
//Pt 4 Sorting and Manipulating Data
// Remove the last element from the sorted array.
csvLabeled.pop();
// Insert the following object at index 1:
// { id: "48", name: "Barry", occupation: "Runner", age: "25" }
csvLabeled.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25"});
// Add the following object to the end of the array:
// { id: "7", name: "Bilbo", occupation: "None", age: "111" }
csvLabeled.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" });
// Finally, use the values of each object within the array and the array’s length property to calculate the average age of the group. This calculation should be accomplished using a loop.
function csvToAge(input) {
  let cumulativeAge = 0;
  let allNames = "";
  let _name = [];
  input.forEach((row)=> {
    cumulativeAge += Number(row.age);
    _name.push(row.name);
  })
  allNames = _name.join(", ");
  let averageAge = cumulativeAge / input.length;

  console.log(`Average age of ${allNames} is ${averageAge} years old`);
}
console.log(csvLabeled)
csvToAge(csvLabeled);

console.groupEnd()
//// Pt 5
console.group(`Part5`)

function arrayToCsv(arrayofObjects){
  // select keys to become header array
  let headers = Object.keys(arrayofObjects[0])
  //map keys as the headers and values as the rows of array
  let rows = arrayofObjects.map(obj => headers.map(header => obj[header]));
  // join each value in the arrays together, with newline between header and row
  let outputString = headers.join(',') + '\n' + rows.join('\n');
  return outputString
}

console.log(arrayToCsv(csvLabeled))

console.groupEnd()