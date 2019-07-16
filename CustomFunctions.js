/**
* Averages a column of data
* @param {String | Number} column The letter or number value of the column you wish to parse
* @param {Range | Range[]} [depends="Reformatted!A1:Z"] The ranges this function depends on
* @param {Boolean} useCur If true, use the current sheet as the data sheet
* @param {Boolean | String | Range | String[]} custTeams Use either the current sheet, an Array of Strings or Numbers, or a Range as the source for custom teams.
* @return {Column} The output column of single values
* @customfunction
*/
function custAVG(column, depends, useCur, custTeams) {
  if (typeof column != "number") column = letterToNum(column);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = useCur != true ? ss.getSheetByName("Reformatted") : ss.getActiveSheet();
  var teamSheet = custTeams == true ? ss.getActiveSheet() : ss.getSheetByName("Reformatted")
  var dataMax;
  var i = useCur ? ss.getActiveCell().getRow() - 2: 0;
  var range = [].concat.apply([], teamSheet.getRange(1, 1, 200, 1).getValues())
  while (range[i] != "") {
    i++;
  }
  dataMax = i;
  var teams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax - 1, 1).getValues())
  if (Array.isArray(custTeams)) {
    if (Array.isArray(custTeams[0])) {
      custTeams = [].concat.apply([], custTeams)
    }
  } else if (typeof custTeams == "string" || typeof custTeams == "number") {
    custTeams = ["" + custTeams]
  } else {
    custTeams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax - 1, 1).getValues())
  }
  if (typeof custTeams[0] == "number") {
    custTeams = custTeams.map(function (e) { return "" + e })
  }
  var items = [].concat.apply([], dataSheet.getRange(2, column, dataMax - 1, 1).getValues())
  var out = []

  for (i = 0; i < custTeams.length; i++) {
    var ind = teams.indexOf(custTeams[i])
    var arr = JSON.parse(items[ind])
    out.push(arr.average())
  }
  return out;
}
/**
* Finds the standard deviations throughout a column of data
* @param {String | Number} column The letter or number value of the column you wish to parse
* @param {Range | Range[]} depends The ranges this function depends on
* @param {Boolean} useCur If true, use the current sheet as the data sheet
* @return {Column} The output column of single values
* @customfunction
*/
function custSTDEV(column, depends, useCur, custTeams) {
  if (typeof column != "number") column = letterToNum(column);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = useCur != true ? ss.getSheetByName("Reformatted") : ss.getActiveSheet();
  var teamSheet = custTeams == true ? ss.getActiveSheet() : ss.getSheetByName("Reformatted")
  var dataMax;
  var i = useCur ? ss.getActiveCell().getRow() - 2 : 0;
  var range = [].concat.apply([], teamSheet.getRange(1, 1, 200, 1).getValues())
  while (range[i] != "") {
    i++;
  }
  dataMax = i;
  var teams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  if (Array.isArray(custTeams)) {
    if (Array.isArray(custTeams[0])) {
      custTeams = [].concat.apply([], custTeams)
    }
  } else if (typeof custTeams == "string" || typeof custTeams == "number") {
    custTeams = ["" + custTeams]
  } else {
    custTeams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  }
  if (typeof custTeams[0] == "number") {
    for (i = 0; i < custTeams.length; i++) {
      custTeams[i] = "" + custTeams[i]
    }
  }
  var items = [].concat.apply([], dataSheet.getRange(2, column, dataMax -1, 1).getValues())
  var out = []

  for (i = 0; i < custTeams.length; i++) {
    var ind = teams.indexOf(custTeams[i])
    var arr = JSON.parse(items[ind])
    out.push(arr.stdev())
  }
  return out;
}
/**
* Sums a column of data
* @param {String | Number} column The letter or number value of the column you wish to parse
* @param {Range | Range[]} depends The ranges this function depends on
* @param {Boolean} useCur If true, use the current sheet as the data sheet
* @param {Boolean | String | Range | String[]} custTeams Use either the current sheet, an Array of Strings or Numbers, or a Range as the source for custom teams.
* @return {Column} The output column of single values
* @customfunction
*/
function custSUM(column, depends, useCur, custTeams) {
  if (typeof column != "number") column = letterToNum(column);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = useCur != true ? ss.getSheetByName("Reformatted") : ss.getActiveSheet();
  var teamSheet = custTeams == true ? ss.getActiveSheet() : ss.getSheetByName("Reformatted")
  var dataMax;
  var i = useCur ? ss.getActiveCell().getRow() - 2 : 0;
  var range = [].concat.apply([], teamSheet.getRange(1, 1, 200, 1).getValues())
  while (range[i] != "") {
    i++;
  }
  dataMax = i;
  var teams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  if (Array.isArray(custTeams)) {
    if (Array.isArray(custTeams[0])) {
      custTeams = [].concat.apply([], custTeams)
    }
  } else if (typeof custTeams == "string" || typeof custTeams == "number") {
    custTeams = ["" + custTeams]
  } else {
    custTeams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  }
  if (typeof custTeams[0] == "number") {
    for (i = 0; i < custTeams.length; i++) {
      custTeams[i] = "" + custTeams[i]
    }
  }
  var items = [].concat.apply([], dataSheet.getRange(2, column, dataMax -1, 1).getValues())
  var out = []

  for (i = 0; i < custTeams.length; i++) {
    var ind = teams.indexOf(custTeams[i])
    var arr = JSON.parse(items[ind])
    out.push(arr.sum())
  }
  return out;
}
/**
* Finds the max values throughout a column of data
* @param {String | Number} column The letter or number value of the column you wish to parse
* @param {Range | Range[]} depends The ranges this function depends on
* @param {Boolean} useCur If true, use the current sheet as the data sheet
* @param {Boolean | String | Range | String[]} custTeams Use either the current sheet, an Array of Strings or Numbers, or a Range as the source for custom teams.
* @return {Column} The output column of single values
* @customfunction
*/
function custMAX(column, depends, useCur, custTeams) {
  if (typeof column != "number") column = letterToNum(column);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = useCur != true ? ss.getSheetByName("Reformatted") : ss.getActiveSheet();
  var teamSheet = custTeams == true ? ss.getActiveSheet() : ss.getSheetByName("Reformatted")
  var dataMax;
  var i = useCur ? ss.getActiveCell().getRow() - 2 : 0;
  var range = [].concat.apply([], teamSheet.getRange(1, 1, 200, 1).getValues())
  while (range[i] != "") {
    i++;
  }
  dataMax = i;
  var teams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  if (Array.isArray(custTeams)) {
    if (Array.isArray(custTeams[0])) {
      custTeams = [].concat.apply([], custTeams)
    }
  } else if (typeof custTeams == "string" || typeof custTeams == "number") {
    custTeams = ["" + custTeams]
  } else {
    custTeams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  }
  if (typeof custTeams[0] == "number") {
    for (i = 0; i < custTeams.length; i++) {
      custTeams[i] = "" + custTeams[i]
    }
  }
  var items = [].concat.apply([], dataSheet.getRange(2, column, dataMax -1, 1).getValues())
  var out = []

  for (i = 0; i < custTeams.length; i++) {
    var ind = teams.indexOf(custTeams[i])
    var arr = JSON.parse(items[ind])
    out.push(arr.max())
  }
  return out;
}
/**
* Finds the min values throughout a column of data
* @param {String | Number} column The letter or number value of the column you wish to parse
* @param {Range | Range[]} depends The ranges this function depends on
* @param {Boolean} useCur If true, use the current sheet as the data sheet
* @param {Boolean | String | Range | String[]} custTeams Use either the current sheet, an Array of Strings or Numbers, or a Range as the source for custom teams.
* @return {Column} The output column of single values
* @customfunction
*/
function custMIN(column, depends, useCur, custTeams) {
  if (typeof column != "number") column = letterToNum(column);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = useCur != true ? ss.getSheetByName("Reformatted") : ss.getActiveSheet();
  var teamSheet = custTeams == true ? ss.getActiveSheet() : ss.getSheetByName("Reformatted")
  var dataMax;
  var i = useCur ? ss.getActiveCell().getRow() - 2 : 0;
  var range = [].concat.apply([], teamSheet.getRange(1, 1, 200, 1).getValues())
  while (range[i] != "") {
    i++;
  }
  dataMax = i;
  var teams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  if (Array.isArray(custTeams)) {
    if (Array.isArray(custTeams[0])) {
      custTeams = [].concat.apply([], custTeams)
    }
  } else if (typeof custTeams == "string" || typeof custTeams == "number") {
    custTeams = ["" + custTeams]
  } else {
    custTeams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  }
  if (typeof custTeams[0] == "number") {
    for (i = 0; i < custTeams.length; i++) {
      custTeams[i] = "" + custTeams[i]
    }
  }
  var items = [].concat.apply([], dataSheet.getRange(2, column, dataMax -1, 1).getValues())
  var out = []

  for (i = 0; i < custTeams.length; i++) {
    var ind = teams.indexOf(custTeams[i])
    var arr = JSON.parse(items[ind])
    out.push(arr.min())
  }
  return out;
}
/**
* Finds the percentage an item occurs throughout a column of data
* @param {String | Number} column The letter or number value of the column you wish to parse
* @param {String} item The item to search for
* @param {Range | Range[]} depends The ranges this function depends on
* @param {Boolean} useCur If true, use the current sheet as the data sheet
* @param {Boolean | String | Range | String[]} custTeams Use either the current sheet, an Array of Strings or Numbers, or a Range as the source for custom teams.
* @return {Column} The output column of single values
* @customfunction
*/
function custPERCENTITEM(column, item, depends, useCur, custTeams) {
  if (typeof column != "number") column = letterToNum(column);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = useCur != true ? ss.getSheetByName("Reformatted") : ss.getActiveSheet();
  var teamSheet = custTeams == true ? ss.getActiveSheet() : ss.getSheetByName("Reformatted")
  var dataMax;
  var i = useCur ? ss.getActiveCell().getRow() - 2 : 0;
  var range = [].concat.apply([], teamSheet.getRange(1, 1, 200, 1).getValues())
  while (range[i] != "") {
    i++;
  }
  dataMax = i;
  var teams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  if (Array.isArray(custTeams)) {
    if (Array.isArray(custTeams[0])) {
      custTeams = [].concat.apply([], custTeams)
    }
  } else if (typeof custTeams == "string" || typeof custTeams == "number") {
    custTeams = ["" + custTeams]
  } else {
    custTeams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  }
  if (typeof custTeams[0] == "number") {
    for (i = 0; i < custTeams.length; i++) {
      custTeams[i] = "" + custTeams[i]
    }
  }
  var items = [].concat.apply([], dataSheet.getRange(2, column, dataMax -1, 1).getValues())
  var out = []

  for (i = 0; i < custTeams.length; i++) {
    var ind = teams.indexOf(custTeams[i])
    var arr = JSON.parse(items[ind])
    out.push(arr.occur(item) / arr.length)
  }
  return out;
}
/**
* Finds the most occuring item(s) throughout a column of data
* @param {String | Number} column The letter or number value of the column you wish to parse
* @param {Range | Range[]} depends The ranges this function depends on
* @param {Boolean} useCur If true, use the current sheet as the data sheet
* @param {Boolean | String | Range | String[]} custTeams Use either the current sheet, an Array of Strings or Numbers, or a Range as the source for custom teams.
* @return {Column} The output column of single values
* @customfunction
*/
function custMAXITEM(column, depends, useCur, custTeams) {
  if (typeof column != "number") column = letterToNum(column);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = useCur != true ? ss.getSheetByName("Reformatted") : ss.getActiveSheet();
  var teamSheet = custTeams == true ? ss.getActiveSheet() : ss.getSheetByName("Reformatted")
  var dataMax;
  var i = useCur ? ss.getActiveCell().getRow() - 2 : 0;
  var range = [].concat.apply([], teamSheet.getRange(1, 1, 200, 1).getValues())
  while (range[i] != "") {
    i++;
  }
  dataMax = i;
  var teams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  if (Array.isArray(custTeams)) {
    if (Array.isArray(custTeams[0])) {
      custTeams = [].concat.apply([], custTeams)
    }
  } else if (typeof custTeams == "string" || typeof custTeams == "number") {
    custTeams = ["" + custTeams]
  } else {
    custTeams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  }
  if (typeof custTeams[0] == "number") {
    for (i = 0; i < custTeams.length; i++) {
      custTeams[i] = "" + custTeams[i]
    }
  }
  var items = [].concat.apply([], dataSheet.getRange(2, column, dataMax -1, 1).getValues())
  var out = []

  for (i = 0; i < custTeams.length; i++) {
    var ind = teams.indexOf(custTeams[i])
    var arr = JSON.parse(items[ind])
    var occurs = arr.map(function (e) {
      return arr.occur(e)
    })
    var maxes = []
    for (a = 0; a < arr.length; a++) {
      if (occurs[a] == occurs.max() && maxes.indexOf(arr[a]) == -1) {
        maxes.push(arr[a])
      }
    }
    out.push(maxes.join("/"))
  }
  return out;
}
/**
* Concatenates the values throughout a column of data
* @param {String | Number} column The letter or number value of the column you wish to parse
* @param {String} separater The separater to concatenate the items with
* @param {Range | Range[]} depends The ranges this function depends on
* @param {Boolean} useCur If true, use the current sheet as the data sheet
* @param {Boolean | String | Range | String[]} custTeams Use either the current sheet, an Array of Strings or Numbers, or a Range as the source for custom teams.
* @return {Column} The output column of single values
* @customfunction
*/
function custCONCAT(column, separater, depends, useCur, custTeams) {
  if (separater == undefined) separater = ",";
  if (typeof column != "number") column = letterToNum(column);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = useCur != true ? ss.getSheetByName("Reformatted") : ss.getActiveSheet();
  var teamSheet = custTeams == true ? ss.getActiveSheet() : ss.getSheetByName("Reformatted")
  var dataMax;
  var i = useCur ? ss.getActiveCell().getRow() - 2 : 0;
  var range = [].concat.apply([], teamSheet.getRange(1, 1, 200, 1).getValues())
  while (range[i] != "") {
    i++;
  }
  dataMax = i;
  var teams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  if (Array.isArray(custTeams)) {
    if (Array.isArray(custTeams[0])) {
      custTeams = [].concat.apply([], custTeams)
    }
  } else if (typeof custTeams == "string" || typeof custTeams == "number") {
    custTeams = ["" + custTeams]
  } else {
    custTeams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax -1, 1).getValues())
  }
  if (typeof custTeams[0] == "number") {
    for (i = 0; i < custTeams.length; i++) {
      custTeams[i] = "" + custTeams[i]
    }
  }
  var items = [].concat.apply([], dataSheet.getRange(2, column, dataMax -1, 1).getValues())
  var out = []

  for (i = 0; i < custTeams.length; i++) {
    var ind = teams.indexOf(custTeams[i])
    var arr = JSON.parse(items[ind])
    arr = arr.filter(function (e) {
      return e != ""
    })
    out.push(arr.join(separater))
  }
  return out;
}