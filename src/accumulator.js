// functions to collect statistics across properties and format for output

function acTester () {
    // define some test data
    const columnHeaders = [
        {columnType:"DIMENSION", dataType:"STRING", name:"ga:browser"},
        {columnType:"DIMENSION", dataType:"STRING", name:"ga:browserVersion"},
        {columnType:"METRIC", dataType:"INTEGER", name:"ga:users"},
        {columnType:"METRIC", dataType:"INTEGER", name:"ga:users"}];
    const results = [
        ["Chrome", "67.0.3396.99", "1", "1"],
        ["Chrome", "74.0.3729.131", "10", "10"], 
        ["Chrome", "75.0.3770.100", "19", "35"], 
        ["Chrome", "75.0.3770.142", "11", "20"], 
        ["Edge", "17.17134", "6", "11"],
        ["Edge", "17.17134", "6", "11"],
        ["Firefox", "66", "1", "1"],
        ["Firefox", "67", "5", "9"],
        ["Firefox", "68", "15", "33"],
        ["Internet Explorer", "11", "11", "41"],
        ["Safari", "12.1.1", "5", "10"]];

    var accumulator = [];
    var dimensionCount = acDimensionCount(columnHeaders);

    // initialize a metrics count array for the appropriate number of metrics
    var initMetrics = [];
    for (var jj=0; jj<results[0].length-dimensionCount; jj++){
        initMetrics.push(0);
    }

    // this loop adds each row of results into the accumulator
    for (var ii=0; ii<results.length; ii++) {

        // set the dimensions and metrics from this row of results
        var dims = results[ii].slice(0, dimensionCount);
        var metrics = results[ii].slice(dimensionCount);

        // Process the first dimension (level 0), adding to the accumulator
        // NOTE: Sublevels will be processed recursively.
        const firstLevel = 0;
        acProcessLevel (accumulator, firstLevel, dims, metrics, initMetrics);
    
    }
    var grid = [];
    acPrepOutput(accumulator, dimensionCount, 0, grid);
    acOutputToSheet(grid);
}

function acProcessLevel (ac, level, dims, metrics, initMetrics) {
    // NOTE: this function is called rescursively

    // process this row of results
    var dimRow = acFindOrInsertDim (ac, dims[level], metrics.length, initMetrics);
    acAddMetrics(ac, dimRow, metrics.length, metrics);
  
    // if there is a deeper level, call this function recursively for next level
    if (level < dims.length-1) {
      var acSubLevel = ac[dimRow].sub;
      var subLevel = level + 1;
      acProcessLevel (acSubLevel, subLevel, dims, metrics, initMetrics);
    }
  }

function acAddMetrics (acc, dimIndex, metsCount, metrics) {
    for (var ii=0; ii<metsCount; ii++) {
      acc[dimIndex].mets[ii] += parseInt(metrics[ii]);
    }
}
  
function acFindOrInsertDim (acc, dim, metsCount, initMetrics) {
    var index = acc
      .map(function (element) {return element.name;})
      .indexOf(dim);
    if (index<0) {
      var newRow = {
        name: dim,
        mets: initMetrics.slice(),
        sub: []};
      index = acc.push(newRow) - 1;
    }
    
    return index;
  }
  
function acDimensionCount (headers) {
    dimensionCount = 0;
    for (var i=0; i<headers.length; i++) {
        if (headers[i].columnType == "DIMENSION") dimensionCount++;
    }
    return dimensionCount;
}

function acPrepOutput (ac, dimCount, level, grid) {
  
    for (var ii=0; ii<ac.length; ii++) {
      var row = ac[ii];
      var length = grid.push([]);
      for (var jj=0; jj<dimCount; jj++) {
        if (jj==level) {
          grid[length-1][jj] = row.name;
        } else {
          grid[length-1][jj] = '';
        }
      }
      grid[length-1] = grid[length-1].concat(row.mets);
      if (row.sub.length > 0) {acPrepOutput(row.sub, dimCount, level+1, grid);}
    }
  }

  function acOutputToSheet (grid) {

    var sheet=SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange(2, 1,  grid.length, grid[0].length)
          .setValues(grid);
  
  }