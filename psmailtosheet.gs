function SendtoSheet(){
  var threads = GmailApp.search("from:{sender} in:anywhere subject:{subject}")[0];
  var message = threads.getMessages().pop()
  var bodytext = message.getBody();
  
  bodytext = bodytext.split("<br>")
  bodytext = cleanValues(bodytext)
  
  var now = new Date()
  bodytext.unshift(Utilities.formatDate(now, 'EST', 'MM/dd/yyyy'))
  
  var sheet = SpreadsheetApp.openById({sheetId})
  sheet = sheet.setActiveSheet(sheet.getSheetByName({sheetName}))
  
  sheet.appendRow(bodytext)
}

function cleanValues(values) {
  return values.filter(function(value) {
    return !isNaN(value) && value.length;
  });
}
