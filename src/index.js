function tester() {
  Logger.log('Hello world.');
  makeNewSheet("parameters");
}

// details on GA APIs for Apps Script found here: 
//   https://developers.google.com/apps-script/advanced/analytics
//
// test account: 45095774
// test profile: 198056905
// table id: "ga:198056905"
// tracking id: UA-45095774-27

function getReportDataForProfile() {

  var profileId = 198056905;
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
  var results = Analytics.Data.Ga.get(
      tableId,                    // Table id (format ga:xxxxxx).
      startDate,                  // Start-date (format yyyy-MM-dd).
      endDate,                    // End-date (format yyyy-MM-dd).
      'ga:sessions,ga:pageviews', // Comma seperated list of metrics.
      optArgs);

  if (results.getRows()) {
    var anything = 1;
    anything++;
    outputToSpreadsheet(results);
    return results;

  } else {
    throw new Error('No views (profiles) found');
  }
}
