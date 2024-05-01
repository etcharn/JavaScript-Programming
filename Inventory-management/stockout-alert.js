function stockoutAlert(e) {
  // get sheet
  const sheet = e.source.getActiveSheet();
  // get values 
  const product_name = sheet.getRange("B1").getValue();
  const product_sku = sheet.getRange("B3").getValue();
  const product_count = sheet.getRange("B6").getValue();
  // list of email to send to 
  var email_list = ["ethan@defibshop.com.au"]
  // remove row = item is removed from system 
  if (e.changeType == "REMOVE_ROW") {
    if (product_count == 0) {
      // create subject and message to email
      const subject = "Out of stock: " + product_name + " (" + product_sku + ")";
      const message = product_name + " (" + product_sku + ") " + "is out of stock!";
      // send email to all emails on the email list
      for (i = 0; i < email_list.length; i++) {
        MailApp.sendEmail(email_list[i], subject, message)
      }
    }
  }
}
