function getTBA(url) {
  var key = {
    'X-TBA-Auth-Key': 'wFLfqneHnQeMApDRSJnAvtS1egVMBQzXxn2E6vGW0DuGy3HhRYztR8tGJvbdBX0G'
  }
  var arr = {
    'url':'https://www.thebluealliance.com/api/v3/' + url,
    'headers': key,
    muteHttpExceptions: true
  }
  var data = UrlFetchApp.fetchAll([arr])[0]
  if (data.getResponseCode() == 200.0) {
    return JSON.parse(data.getContentText())
  } else {
    return undefined
  }
}
function getEvent(eventkey) {
  return getTBA('event/' + eventkey);
}

function getTeam(num) {
  return getTBA('team/frc' + num);
}

function teamEventKeys(num, year) {
  return getTBA('team/frc' + num + '/events' + (year === undefined ? '' : '/' + year) + '/keys');
}

function teamYears(teamNum) {
  return getTBA('team/frc' + teamNum + '/years_participated');
}

function eventRankings(eventkey) {
  return getTBA('event/' + eventkey + '/rankings');
}

function eventOPRS(eventkey) {
  return getTBA('event/' + eventkey + '/oprs');
}

function eventPredict(eventkey) {
  return getTBA('event/' + eventkey + '/predictions');
}

function eventTeamsKeys(eventkey) {
  return getTBA('event/' + eventkey + '/teams/keys');
}

function eventMatches(eventkey) {
  return getTBA('event/' + eventkey + '/matches');
}