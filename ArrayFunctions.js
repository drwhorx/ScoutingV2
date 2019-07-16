/**
* Sums multiple columns of data
* @param {String[] | Number[]} columns The letter or number values of the columns you wish to combine
* @param {Range | Range[]} depends The ranges this function depends on
* @param {Boolean} useCur If true, use the current sheet as the data sheet
* @param {Boolean | String | Range | String[]} custTeams Use either the current sheet, an Array of Strings or Numbers, or a Range as the source for custom teams.
* @return {Column} The output column of stringified Arrays
* @customfunction
*/
function arraySUM(columns, depends, useCur, custTeams) {
  columns = columns[0]
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = useCur == undefined ? ss.getSheetByName("Reformatted") : ss.getActiveSheet();
  var teamSheet = custTeams == true ? ss.getActiveSheet() : ss.getSheetByName("Reformatted")
  var dataMax;
  var i = 1;
  while (dataSheet.getRange(i, 1).getValue().trim() != "") {
    i++;
  }
  dataMax = i;
  var teams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax - 2, 1).getValues())
  if (Array.isArray(custTeams)) {
    if (Array.isArray(custTeams[0])) {
      custTeams = [].concat.apply([], custTeams)
    }
  } else if (typeof custTeams == "string" || typeof custTeams == "number") {
    custTeams = ["" + custTeams]
  } else {
    custTeams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax - 2, 1).getValues())
  }
  if (typeof custTeams[0] == "number") {
    custTeams = custTeams.map(function (e) { return "" + e })
  }
  var values = []
  for (i = 0; i < columns.length; i++) {
    if (typeof columns[i] != "number") columns[i] = letterToNum(columns[i]);
    var temp = [].concat.apply([], dataSheet.getRange(2, columns[i], dataMax - 2, 1).getValues())
    var arr = []
    for (a = 0; a < custTeams.length; a++) {
      arr.push(temp[teams.indexOf(custTeams[a])])
    }
    values.push(arr)
  }
  var out = []

  for (i = 0; i < custTeams.length; i++) {
    var temp = []
    for (a = 0; a < columns.length; a++) {
      temp.push(JSON.parse(values[a][i]))
    }
    temp = temp.reduce(function (sum, b) {
      var tempOut = []
      for (c = 0; c < b.length; c++) {
        tempOut.push(sum[c] + b[c])
      }
      return tempOut;
    })
    out.push(JSON.stringify(temp))
  }
  return out;
}
/**
* Multiplies multiple columns of data
* @param {String[] | Number[]} columns The letter or number values of the columns you wish to combine
* @param {Range | Range[]} depends The ranges this function depends on
* @param {Boolean} useCur If true, use the current sheet as the data sheet
* @param {Boolean | String | Range | String[]} custTeams Use either the current sheet, an Array of Strings or Numbers, or a Range as the source for custom teams.
* @return {Column} The output column of stringified Arrays
* @customfunction
*/
function arrayPROD(columns, depends, useCur, custTeams) {
  columns = columns[0]
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = useCur == undefined ? ss.getSheetByName("Reformatted") : ss.getActiveSheet();
  var dataMax;
  var i = 1;
  while (dataSheet.getRange(i, 1).getValue().trim() != "") {
    i++;
  }
  dataMax = i;
  var teams = [].concat.apply([], dataSheet.getRange(2, 1, dataMax - 2, 1).getValues())
  if (Array.isArray(custTeams)) {
    if (Array.isArray(custTeams[0])) {
      custTeams = [].concat.apply([], custTeams)
    }
  } else if (typeof custTeams == "string" || typeof custTeams == "number") {
    custTeams = ["" + custTeams]
  } else {
    custTeams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax - 2, 1).getValues())
  }
  if (typeof custTeams[0] == "number") {
    custTeams = custTeams.map(function (e) { return "" + e })
  }
  var values = []
  for (i = 0; i < columns.length; i++) {
    if (typeof columns[i] != "number") columns[i] = letterToNum(columns[i]);
    var temp = [].concat.apply([], dataSheet.getRange(2, columns[i], dataMax - 2, 1).getValues())
    var arr = []
    for (a = 0; a < custTeams.length; a++) {
      arr.push(temp[teams.indexOf(custTeams[a])])
    }
    values.push(arr)
  }
  var out = []

  for (i = 0; i < custTeams.length; i++) {
    var temp = []
    for (a = 0; a < columns.length; a++) {
      temp.push(JSON.parse(values[a][i]))
    }
    temp = temp.reduce(function (sum, b) {
      var tempOut = []
      for (c = 0; c < b.length; c++) {
        tempOut.push(sum[c] * b[c])
      }
      return tempOut;
    })
    out.push(JSON.stringify(temp))
  }
  return out;
}