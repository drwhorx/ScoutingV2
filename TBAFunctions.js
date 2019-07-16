/**
* Finds a rankings item for teams at an FRC event
* @param {String} item The `sort_order` you wish to find.
* @param {Range | Range[]} [depends="Reformatted!A1:Z"] The ranges this function depends on
* @param {Boolean | String | Range | String[]} custTeams Use either the current sheet, an Array of Strings or Numbers, or a Range as the source for custom teams.
* @return {Column} The output column of single values
* @customfunction
*/
function TBARankings(item, depends, custTeams) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var teamSheet = custTeams == true ? ss.getActiveSheet() : ss.getSheetByName("Reformatted")
  var start = ss.getActiveCell().getRow() - 2;
  var range = [].concat.apply([], teamSheet.getRange(1, 1, 200, 1).getValues())
  dataMax = range.indexOf("", start)
  if (dataMax == 0) return;

  var teams;
  if (Array.isArray(custTeams)) {
    if (Array.isArray(custTeams[0])) {
      teams = [].concat.apply([], custTeams)
    } else {
      teams = custTeams
    }
  } else if (typeof custTeams == "string" || typeof custTeams == "number") {
    teams = ["" + custTeams]
  } else {
    teams = [].concat.apply([], teamSheet.getRange(2, 1, dataMax - 1, 1).getValues())
  }

  var key = ss.getSheetByName("Control Panel").getRange(enums.EVENT_KEY).getValue()
  var ranks = eventRankings(key)
  if (ranks == undefined) return "EVENT DOES NOT EXIST";
  var ind = ranks.sort_order_info.map(function (e) {
    return e.name
  }).indexOf(item)
  if (ind == -1) return "RANKING ITEM DOES NOT EXIST";
  var out = teams.map(function (e) {
    return ranks.rankings.filter(function (r) {
      return r.team_key == "frc" + e
    })[0].sort_orders[ind];
  })
  return out
}