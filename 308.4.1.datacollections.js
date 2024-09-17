// Objectives
// Use arrays to store ordered lists of data.
// Use objects to store keyed lists of data.
// Use conditional logic to process data.
// Use loops to handle repetitive tasks.
// Transform data according to specifications
csvData =
  "Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232";
// Declare a variable that stores the number of columns in each row of data within the CSV.
function csvToArray(input) {
  let csvString = input;
  let csvRow = csvString.split("\n");
  let csvColumn = [];
  const csvArray = [];
  //console.log(rows)
  for (let i = 0; i < csvRow.length; i++) {
    csvColumn = csvRow[i].split(",");
    csvArray.push(csvColumn);
  }
  return csvArray;
}
console.log(csvToArray(csvData));
csvArray = csvToArray(csvData);

// Pt3
function labelColumns(input) {
  try {
    let headers = input[0].map((header) => header.toLowerCase());
    let labeledTable = [];
    // console.log(csvArray)
    //slice 1 to ignore heading row
    input.slice(1).forEach((_row) => {
      if (_row.length !== headers.length) {
        throw new Error(
          "Mismatch between number of columns in each row and number of columns in the header"
        );
      }
      let rowObj = {};
      headers.forEach((header, headerIndex) => {
        rowObj[header] = _row[headerIndex];
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

//Pt 4
// Remove the last element from the sorted array.
csvLabeled.pop();
// Insert the following object at index 1:
// { id: "48", name: "Barry", occupation: "Runner", age: "25" }
csvLabeled.splice(1, 0, {
  id: "48",
  name: "Barry",
  occupation: "Runner",
  age: "25",
});
// Add the following object to the end of the array:
// { id: "7", name: "Bilbo", occupation: "None", age: "111" }
csvLabeled.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" });
// Finally, use the values of each object within the array and the array’s length property to calculate the average age of the group. This calculation should be accomplished using a loop.
function csvToAge(input) {
  let cumulativeAge = 0;
  let allNames = "";
  let _name = [];
  for (let i = 0; i < input.length; i++) {
    cumulativeAge += Number(input[i].age);
    _name.push(input[i].name);
  }
  allNames = _name.join(", ");
  let averageAge = cumulativeAge / input.length;

  console.log(`Average age of ${allNames} is ${averageAge} years old`);
}

csvToAge(csvLabeled);
