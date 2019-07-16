function parse(arr) {
  try {
    return JSON.parse(arr)
  } catch(error) {
    return ""
  }
}
function stringify(arr) {
  try {
    return JSON.stringify(arr)
  } catch(error) {
    return ""
  }
}
function get(a1) {
  return a1
}
/**
 * Returns the undefined Javascript object
 * @returns {undefined}
 * @customfunction
 */
function undef() {
  return undefined
}
Array.prototype.stdev = function () {
  var avg = this.average();
  return Math.sqrt(this.reduce(function (sq, n) {
    return sq + Math.pow(n - avg, 2);
  }, 0) / (this.length - 1));
};
Array.prototype.average = function () {
  var avg = this.sum() / this.length;
  return avg;
}
Array.prototype.sum = function () {
  return this.reduce(function (sum, value) {
    return sum + value;
  }, 0);
}
Array.prototype.max = function () {
  return Math.max.apply(null, this)
}
Array.prototype.min = function () {
  return Math.min.apply(null, this)
}
Array.prototype.occur = function (item) {
  var num = 0;
  for (i = 0; i < this.length; i++) {
    if (this[i] == item) {
      num++;
    }
  }
  return num;
}
Array.prototype.unique = function () {
  var i = -1, arr = this;
  return this.filter(function (e) {
    i++;
    return arr.indexOf(e) == i
  })
}
function hex() {
  return SpreadsheetApp.getActiveRange().getBackground();
}
function setConds() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var rankSheet = ss.getSheetByName("Rankings");
  var rules = rankSheet.getConditionalFormatRules()
  for (i = 5; i < 30; i++) {
    var col = rankSheet.getRange(2, i, 90, 1)
    var letter = numToLetter(i)
    var colors = ["#93c47d", "#e06666", "#ffd966", "#6d9eeb", "#f6b26b", "#8e7cc3"]
    for (c = 0; c < colors.length; c++) {
      var formula = "=IF(AND(EQ(TYPE(" + letter + "2),2),EQ(" + letter + "2,INDEX(UNIQUE(INDIRECT(\"" + letter + "2:" + letter + "\"))," + (c + 1) + ")),COUNT(UNIQUE(" + letter + "2:" + letter + ")) < 7),TRUE,FALSE)"
      var rule = SpreadsheetApp.newConditionalFormatRule()
      .setBackground(colors[c])
      .whenFormulaSatisfied(formula)
      .setRanges([col])
      .build()
      rules.push(rule)
    }
  }
  rankSheet.setConditionalFormatRules(rules)
}
function numToLetter(num) {
  var arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  return arr[num - 1]
}
function letterToNum(str) {
  var out = 0, len = str.length, pos = len;
  while (--pos > -1) {
    out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - 1 - pos);
  }
  return out;
}
function arr(depData) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("Data")
  var titles = dataSheet.getRange(1, 1, 1, dataSheet.getMaxColumns()).getValues()[0]
  var out = [titles]
  var obj = {}
  var data = dataSheet.getRange(1, 1, dataSheet.getMaxRows(), dataSheet.getMaxColumns()).getValues()
  var rows, cols
  var i = 1;
  while (data[i][0] != "")
    i++;
  rows = i - 1; i = 0;
  while (data[0][i] != "")
    i++;
  cols = i;
  for (r = 1; r <= rows; r++) {
    var team = obj[data[r][0]]
    if (team == undefined) {
      obj[data[r][0]] = []
      team = obj[data[r][0]]
      for (c = 0; c < cols; c++) {
        team.push([])
      }
    }
    for (c = 0; c < cols; c++) {
      team[c].push(data[r][c])
    }
  }
  var teams = Object.keys(obj)
  for (t = 0; t < teams.length; t++) {
    var arr = [teams[t]]
    for (c = 1; c < cols; c++) {
      arr.push(JSON.stringify(obj[teams[t]][c]))
    }
    out.push(arr)
  }
  return out;
}
