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
  sheet = shGetOrInsertSheet("Insiders");
  gaGetReportDataForProfile("198056905");
 
}

function gaGetReportDataForProfile(profileId) {
  // The initial version has hardcodeds dates, metrics, and deminsions.

  var tableId = 'ga:' + profileId;
  var startDate = '2019-06-01';
  var endDate = '2019-06-30';

  var optArgs = {
    'dimensions': 'ga:browser',              // Comma separated list of dimensions.
    'metrics': 'ga:users,ga:sessions',
    'sort': '-ga:users,-ga:sessions',       // Sort by users descending, then sessions descending
    'start-index': '1',
    'max-results': '250'                     // Display the first 250 results.
  };

  // Make a request to the API.
  // *** NEED A TRY-CATCH block here!
  var results = Analytics.Data.Ga.get(
      tableId,                    // Table id (format ga:xxxxxx).
      startDate,                  // Start-date (format yyyy-MM-dd).
      endDate,                    // End-date (format yyyy-MM-dd).
      'ga:sessions,ga:pageviews', // Comma seperated list of metrics.
      optArgs);

  if (results.getRows()) {
    var anything = 1;
    anything++;
    shOutputToSpreadsheet(results);
    return results;

  } else {
    throw new Error('No data returned from GA query.');
  }
}
