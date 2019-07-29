# An overview of the GASplusGA javascript files
There are four javascript source files:
* main.js: the main routines called fom the spreadhseet
* sheetTools.js: functions that manipulate and interact with the spreadsheet
* gaTools.js: functions to interact with the Google Analytics APIs
* accumulator.js: functions that combine metrics across mulitple properties

Because the namespace of Apps Script is global (that is, across the full set of source files), functions in the three contributing (i.e., not in main.js) source files have a prefix to indicate their source:
* function names in sheetTools.js begin with "sh"
* function names in gaTools.js begin with "ga"
* function names in accumulator.js begin with "ac"
These prefixes make it easier to find the source for a function (although working with these files in an IDE can make this convenience unnecessary.)

In addition, these three sources files include "_Tester" functions (i.e, acTester, gaTester, and shTester) to enable unit testing with hardcoded sample data.

