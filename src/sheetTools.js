// Functions to work with Google drive spreadsheets.
// Documentation for APIS is here:
//      https://developers.google.com/apps-script/reference/spreadsheet/

function shTester() {
    const clear = true;
    var aSheet = shGetOrInsertSheet("Sheet 1", clear);
    aSheet.getRange(2,2,1,1).setValue("Hello");
    aSheet = shGetOrInsertSheet("Sheet 2", clear);
    aSheet.getRange(3,3,1,1).setValue("Hello");
    aSheet = shGetOrInsertSheet("Sheet 3", clear);
    shOutputToSpreadsheet(aSheet);
}

// Tf the named sheet does not exist, this function creates it.
// If the named sheet does exist, it clears it of all values.
// It returns the sheet object.
function shGetOrInsertSheet(sheetName, clear) {
    var targetSheet ='';
    try {
        targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
        if (!targetSheet) {
            targetSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
        }
        else {
            // sheet was found, so clear previous values
            if (clear) {targetSheet.clear();}
        }
        return targetSheet;
    }
    catch (err) {
        Logger.log ("could not find or insert sheet " + sheetName);
        Logger.log (err);
    }
}

function shOutputToSpreadsheet(sheet, results) {
  
    var metrics = [];
    var headerNames = [];
    var headers = [];

    // if results were not supplied, create some dummy data
    if (!results) {
        // assign some sample data
        metrics = [["Chrome", "66"], ["Edge", "13"], ["Firefox", "43"], ["Internet Explorer", "41"], ["Safari", "10"]];
        headers = [{columnType:"DIMENSION", dataType:"STRING", name:"ga:browser"}, {columnType:"METRIC", dataType:"INTEGER", name:"ga:sessions"}];
    }
    // otherwise get the GA metrics from the results
    else  {
        metrics = results.rows;
        headers = results.columnHeaders;
    }

    sheet.clear();

    // Print the headers
    for (i=0; i<headers.length; i++) {
        var xx = headers[i];
        headerNames.push(xx.name);
    }  
    sheet.getRange(1, 1, 1, headerNames.length)
        .setValues([headerNames]);
  
    // Print the rows of data.
    sheet.getRange(2, 1, metrics.length, headerNames.length)
        .setValues(metrics);
  }

  function shGetDataFromSheet(sheet, row, columns) {
  
    var dataRange = sheet.getRange(row, 1, sheet.getLastRow()+1-row, columns);
    var results = dataRange.getValues();
    return results;
  }

  function shClearAllSheets() {
      var activeSS = SpreadsheetApp.getActiveSpreadsheet();
      var sheets = activeSS.getSheets();
      const noclear = false;
      for (var ii=0; ii<sheets.length; ii++){
          if (sheets[ii].getName() == 'CONTROLLER') {
              shGetOrInsertSheet(sheets[ii].getName(), noclear);
          } else {
              activeSS.deleteSheet(sheets[ii]);
          }
      }
  }