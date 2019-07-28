// when spreadsheet is opened, create a menu of accounts
function onOpen() {
    var accounts = Analytics.Management.Accounts.list();
    if (accounts.getItems()) {
      
      //add each account to the menu
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var menuEntries = [];
      var items = accounts.getItems();
      for (var i=0; i<items.length; i++) {
        var item = items[i];
          menuEntries.push ({
              name: item.getName(), 
              functionName: "gaGetWebProperties(" + item.getId() + ")"});
        }
      ss.addMenu("Accounts", menuEntries);
    } else {
      return "";
    }
  }

  function getAnalyticsForProperties () {
    const clear = true;
    const noclear = false;
    var sheet = shGetOrInsertSheet("CONTROLLER", noclear);

    var propertyList = shGetDataFromSheet(sheet, 2, 3);

    var accumulator = [];
    var results;

    shClearAllSheets();
    for (var ii=0; ii<propertyList.length; ii++) {
      if (propertyList[ii][2] == "") {
        sheet = SpreadsheetApp.setActiveSheet(shGetOrInsertSheet(propertyList[ii][0]), clear);
        results = gaGetReportDataForProfile(propertyList[ii][1].toString(), sheet);
        gaAddResultsToAccumulator(results, accumulator);
      }
    }

    var grid = [];
    acPrepOutput (accumulator, acDimensionCount(results.columnHeaders), 0, grid);
    acOutputToSheet (grid, "TOTALS");
    SpreadsheetApp.getActiveSpreadsheet().moveActiveSheet(1);
  }