/**
* HTTP setup
*/
var SCRIPT_PROP = PropertiesService.getScriptProperties();

function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty("key", doc.getId());
}

/**
* Add data function
*/
function doGet(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);
  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));

    var nextRow = sheet.getLastRow() + 1;
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
* HTML check function
*/
function doPost(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);
  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName(SHEET_NAME);
    var config = doc.getSheetByName("Config");
    var event = config.getRange("B2").getValue();
    var useTBA = config.getRange("B3").getValue();
    var i = 2;
    while (sheet.getRange(i, 1).getValue() != "") {
      i++
    }
    var range = sheet.getRange(2, 1, i - 2, 2).getValues()
    var date = new Date()
    var obj = {
      "title": date.toDateString() + " " + date.getHours() + ":" + ("0" + date.getMinutes()).substr(-2),
      "errors": [],
      "footer": ""
    }
    var thing = getMatches(event)
    var a = 1;
    var go = true;
    var matches = {}
    var i = undefined;
    for (var i in range) {
      if (matches[range[i][0]] == undefined) {
        var temp = {
          "scouted": [],
          "act_teams": [],
          "indices": []
        }
        for (var e in thing) {
          if (thing[e].key == event + "_qm" + range[i][0]) {
            for (var r in thing[e].alliances.red.team_keys) {
              temp.act_teams.push(thing[e].alliances.red.team_keys[r])
            }
            for (var b in thing[e].alliances.blue.team_keys) {
              temp.act_teams.push(thing[e].alliances.blue.team_keys[b])
            }
          }
        }
        if (temp.act_teams.length == 0) {
          obj.errors.push("[" + (parseInt(i) + 2) + "] Match " + range[i][0] + " does not exist")
        } else {
          matches[range[i][0]] = temp
        }
      }
      if (matches[range[i][0]] != undefined) {
        matches[range[i][0]].scouted.push("" + range[i][1])
        matches[range[i][0]].indices.push(i)
      }
    }
    var errors = 0;
    for (var i in matches) {
      var match = matches[i]
      var act_length = match.scouted.length
      for (var e in match.scouted) {
        if (match.act_teams.indexOf("frc" + match.scouted[e]) == -1) {
          obj.errors.push("[" + (parseInt(match.indices[e]) + 2) + "] Team " + match.scouted[e] + " was not in Match " + i)
          errors++;
          act_length--
        }
      }
      for (var e in match.act_teams) {
        if (match.scouted.indexOf(match.act_teams[e].slice(3)) == -1) {
          var color = e < 3 ? "Red" : "Blue"
          obj.errors.push("[" + (parseInt(match.indices[0]) + 2) + "] Team " + match.act_teams[e].slice(3) + " (" + color + " " + ((e % 3) + 1) + ") was not scouted in Match " + i)
          act_length++;
          errors++
        }
      }
      if (act_length > 6) {
        var arr = []
        for (var e = 0; e < match.scouted.length; e++) {
          if (e != match.scouted.lastIndexOf(match.scouted[e]) && arr.indexOf(match.scouted[e]) == -1) {
            var color = e < 3 ? "Red" : "Blue"
            var count = 1;
            var indices = [(parseInt(match.indices[e]) + 2)]
            for (var f = e + 1; f < match.scouted.length; f++) {
              if (match.scouted[e] == match.scouted[f]) {
                count++;
                indices.push((parseInt(match.indices[f]) + 2))
              }
            }
            obj.errors.push("[" + indices.join(", ") + "] Team " + match.scouted[e] + " (" + color + " " + ((e % 3) + 1) + ") was scouted " + count + " times in Match " + i)
            arr.push(match.scouted[e])
            errors++;
          }
        }
      }
    }
    obj.footer = "Data check completed with " + errors + " error(s)"
    return ContentService
      .createTextOutput(JSON.stringify({
        "result": "success",
        "data": JSON.stringify(obj)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}