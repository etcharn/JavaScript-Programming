function stockReminder_weekly() {
    var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    var str_buff = []
    for (var i = 0; i < sheets.length; i++) {
        var sheet_name = sheets[i].getName()
        var sheet = sheets[i]
        var product_type = sheet_name.substring(0, 3)
        if (product_type == 'BAT' || product_type == 'PAD') {
            var product_name = sheet.getRange('B1').getValues()
            var product_sku = sheet.getRange('B3').getValues()
            var product_count = sheet.getRange('B6').getValues()
            if (product_count <= 10) {
                str_buff.push(product_count + " " + product_name + " (" + product_sku + ")")
            }
        }
    }
    var message = "There're" + "\n";
    for (i = 0; i < str_buff.length; i++) {
        if (i != 0) {
            message += "\n"
        }
        message += str_buff[i]
    }
    message += "\n" + "in stock."
    var email_list = ["ethan@defibshop.com.au"]
    // Send Alert Email
    var subject = 'Weekly stock reminder for AED & consumables';
    for (i = 0; i < email_list.length; i++) {
        MailApp.sendEmail(email_list[i], subject, message)
    }
}