/*
Code for Hamburger Top Naviation
Copyright 2019 Coding Commanders
https://www.codingcommanders.com/website-builder/javascript-hamberger-menu.html
Accessed on September 2nd, 2020.

Original code updated to include the JQuery toggle function
*/

const hamburger = document.getElementById("icon");  // make the hamburger icon an constant
// Add an event listener that when the hamburger icon is clicked, the function toggle is called
hamburger.addEventListener('click', function Toggle() {  //function toggle
    $("#menu-links").toggle()
  } // function toggle
); //addEventListener

/*When menulinks are hidden from above function, the inner CSS of #menu-links has display set to "none"
 *When the screen is resized to be > 784px, the menu-links remain hidden
 *The following function displays or hides the menu links when the screen is being resized
 */
var resizeToggle = function() {
  if ($(window).width() > 784) {
     $("#menu-links").show()
  }
  else {
    $("#menu-links").hide()
  }
};
window.addEventListener("resize", resizeToggle);


/*
   Willmaster Table Sort
   Version 1.1
   August 17, 2016
   Updated GetDateSortingKey() to correctly sort two-digit months and days numbers with leading 0.
   Version 1.0, July 3, 2011
   https://www.willmaster.com/library/features/sorting-a-table-with-javascript.php

   Will Bontrager
   https://www.willmaster.com/
   Copyright 2011,2016 Will Bontrager Software, LLC

   This software is provided "AS IS," without
   any warranty of any kind, without even any
   implied warranty such as merchantability
   or fitness for a particular purpose.
   Will Bontrager Software, LLC grants
   you a royalty free license to use or
   modify this software provided this
   notice appears on all copies.
*/
//
// One placed to customize - The id value of the table tag.

//
//////////////////////////////////////
// Assign variable to
var TableLastSortedColumn = -1;
function SortTable() {
  // Define variables used in the table sorting
  // Argument element 0 is column to be sorted
  // If applicable, argument element 1 is the column type
  // If applicable, argument element 2 is the date format
  var sortColumn = parseInt(arguments[0]); // Column to be sorted
  var type = arguments.length > 1 ? arguments[1] : 'T';  // Column data type, set to 'T' or text if not defined
  var dateformat = arguments.length > 2 ? arguments[2] : ''; // Format of date in column, set to blank if not defined
  var table = document.getElementById("indextable");  // Assign table to be code for the whole table
  var tbody = table.getElementsByTagName("tbody")[0]; // Assign tbody to be code for the body of the table
  var rows = tbody.getElementsByTagName("tr"); // Assign rows to the rows of the table
  var arrayOfRows = new Array(); // Create an array of the rows
  type = type.toUpperCase();  // Change type to Uppercase
  dateformat = dateformat.toLowerCase(); // Change dateformat to lowercase
  // For loop to iterate through all the rows of the column
  for (var i=0, len=rows.length; i<len; i++) {
  	arrayOfRows[i] = new Object; // assign new Object to ith row
  	arrayOfRows[i].oldIndex = i; // define oldIndex as i
    // assign celltext to the text of the row, removing all non alphabet character for the purposes of comparison
  	var celltext = rows[i].getElementsByTagName("td")[sortColumn].innerHTML.replace(/<[^>]*>/g,"");
  	if (type=='D') { // If column type is a date, assign order of row to the output of the function GetDateSortingKey.
      arrayOfRows[i].value = GetDateSortingKey(dateformat,celltext);
    }
  	else { //Otherwise, if type is "N" ie numerical, set re to be the RegExp of removing all non numerical symbols, otherwise set re to the RegExp of removing letters and digits
  		var re = type=="N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
  		arrayOfRows[i].value = celltext.replace(re,"").substr(0,25).toLowerCase(); //remove characters depending on type, take first 25 characters and convert to lowercase
  	}
  } // for loop
  // If the column selected was previously sorted, initiate the function reverse().
  if (sortColumn == TableLastSortedColumn) {
    arrayOfRows.reverse();
  }//if
  // Otherwise, sort the column in ascending order
  else {
  	TableLastSortedColumn = sortColumn;
    // Depending on the column type, sort the row by calling the respective function
  	switch(type) {
  		case "N" : arrayOfRows.sort(CompareRowOfNumbers); break;  //If type is a number
  		case "D" : arrayOfRows.sort(CompareRowOfNumbers); break;  //If type is a date
  		default  : arrayOfRows.sort(CompareRowOfText);            //If type is text
    } //switch
  }//else
  //Create a new table to host the sorted table
  var newTableBody = document.createElement("tbody");
  //Iterate through the rows of the sorted rows into the new table newTableBody
  for(var i=0, len=arrayOfRows.length; i<len; i++) {
  	newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
  }//for
  table.replaceChild(newTableBody,tbody);
} // function SortTable()

//Compare two cells in column, swapping their position if they are not in order
function CompareRowOfText(a,b) {
  var aval = a.value;
  var bval = b.value;
  return( aval == bval ? 0 : (aval > bval ? 1 : -1) );
} // function CompareRowOfText()

//Compare two cells in column, swapping their position if they are not in order
function CompareRowOfNumbers(a,b) {
  var aval = /\d/.test(a.value) ? parseFloat(a.value) : 0;
  var bval = /\d/.test(b.value) ? parseFloat(b.value) : 0;
  return( aval == bval ? 0 : (aval > bval ? 1 : -1) );
} // function CompareRowOfNumbers()


/*
***
* Code for light/dark theme button
***
*/
function colourFlip() {  //function colourFlip
    $(document.body).toggleClass("darkMode");
}; // function colourFlip
