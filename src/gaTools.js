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
  // Insiders test
  SpreadsheetApp.setActiveSheet(shGetOrInsertSheet("Insiders"));
  gaGetReportDataForProfile("198056905");

  // IT web site test; 78159247
  SpreadsheetApp.setActiveSheet(shGetOrInsertSheet("IT"));
  gaGetReportDataForProfile("78159247");
}

function gaGetReportDataForProfile(profileId) {
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
    shOutputToSpreadsheet(results);
    return results;
  } else {
    throw new Error('No data returned from GA query.');
  }
}
