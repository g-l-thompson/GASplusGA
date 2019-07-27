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
          menuEntries.push ({name: item.getName(), functionName: "getProperties(" + item.getId() + ")"});
        }
      ss.addMenu("Accounts", menuEntries);
    } else {
      return "";
    }
  }