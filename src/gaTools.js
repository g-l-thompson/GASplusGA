// details on GA APIs for Apps Script found here: 
//   https://developers.google.com/apps-script/advanced/analytics
// details on Analytics.Data.Ga.get() found here:
//   https://developers.google.com/analytics/devguides/reporting/core/v3/reference
// details on Analytics.Data.Ga.get() HTTP response code handling here:
//   https://developers.google.com/analytics/devguides/reporting/core/v3/errors
//
// test account: 45095774
// test profile: 198056905
// table id: "ga:198056905"
// tracking id: UA-45095774-27

function gaTest () {
  var accumulator = [];

  // Insiders test
  var sheet = SpreadsheetApp.setActiveSheet(shGetOrInsertSheet("Insiders"));
  var results = gaGetReportDataForProfile("198056905", sheet);
  gaAddResultsToAccumulator(results, accumulator);

  // IT web site test; 78159247
  sheet = SpreadsheetApp.setActiveSheet(shGetOrInsertSheet("IT"));
  results = gaGetReportDataForProfile("78159247", sheet);
  gaAddResultsToAccumulator(results, accumulator);

  var grid = [];
  acPrepOutput (accumulator, acDimensionCount(results.columnHeaders), 0, grid);
  acOutputToSheet (grid, "TOTALS");
}

function gaGetReportDataForProfile(profileId, sheet) {
  // The initial version has hardcoded dates, metrics, and dimensions.

  var tableId = 'ga:' + profileId;
  var startDate = '2019-07-12';
  var endDate = '2019-07-19';

  var optArgs = {
    'dimensions': 'ga:browser,ga:browserVersion',              // Comma separated list of dimensions.
    'metrics': 'ga:users,ga:sessions',
    // DO NOT INCLUDE A SORT SPECIFICATION.
    // The accumulator assumes that resutls are sorted by dimensions.
    'start-index': '1',
    'max-results': '250'                     // Display the first 250 results.
  };

  // Make a request to the API.
  // *** NEED A TRY-CATCH block here
  var results = Analytics.Data.Ga.get(
      tableId,                    // Table id (format ga:xxxxxx).
      startDate,                  // Start-date (format yyyy-MM-dd).
      endDate,                    // End-date (format yyyy-MM-dd).
      'ga:sessions,ga:pageviews', // Comma seperated list of metrics.
      optArgs);

  if (results.getRows()) {
    shOutputToSpreadsheet(sheet, results);
    return results;
  } else {
    throw new Error('No data returned from GA query.');
  }

  gaAddResultsToAccumulator(results, accumulator);
}

function gaAddResultsToAccumulator (results, accumulator) {
  var dimensionCount = acDimensionCount(results.columnHeaders);

  // initialize a metrics count array for the appropriate number of metrics
  var initMetrics = [];
  for (var jj=0; jj<results.rows[0].length-dimensionCount; jj++){
      initMetrics.push(0);
  }

  // this loop adds each row of results into the accumulator
  for (var ii=0; ii<results.rows.length; ii++) {

      // set the dimensions and metrics from this row of results
      var dims = results.rows[ii].slice(0, dimensionCount);
      var metrics = results.rows[ii].slice(dimensionCount);

      // Process the first dimension (level 0), adding to the accumulator
      // NOTE: Sublevels will be processed recursively.
      const firstLevel = 0;
      acProcessLevel (accumulator, firstLevel, dims, metrics, initMetrics);
  
  }
}

function gaGetWebProperties(accountId) {
  var webProperties = Analytics.Management.Webproperties.list(accountId);
  if (webProperties.getItems()) {
    
    //create a menu of the accounts
    var sheet = SpreadsheetApp.setActiveSheet(shGetOrInsertSheet("CONTROLLER"));
    var webPropertyList = [];
    var items = webProperties.getItems();
    for (var i=0; i<items.length; i++) {
      var item = items[i];
      webPropertyList.push ({name: item.getName(), functionName: item.getId()});
    }    
    
    // display list of properties on the sheet
    shOutputToSpreadsheet(sheet, results);

  } else {
    return "";
  }
}
