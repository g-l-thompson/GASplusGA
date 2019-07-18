// Fnuctions to work with Google drive spreadsheets.

function makeNewSheet(sheetName) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
    results = Analytics.Data.Ga.get
}

function outputToSpreadsheet(results) {
  
    // Print the headers.
    sheet = SpreadsheetApp.getActiveSpreadsheet();
    sheet.getRange(1, 1, 1, headerNames.length)
        .setValues([headerNames]);
  
    // Print the rows of data.
    sheet.getRange(2, 1, results.getRows().length, headerNames.length)
        .setValues(results.getRows());
  }