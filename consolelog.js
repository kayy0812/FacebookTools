const fs = require('fs');

var __functions = {
    write: function(log) {
        fs.readFile('./templates/logs/filelog.ejs', function(err, data) {
            fs.writeFile('./templates/logs/filelog.ejs', data.toString() + log + "\n", function(err) {
                if (err) {
                    return console.error(err);
                }
                fs.readFile('./templates/logs/filelog.ejs', function(err, data) {
                    console.log("Noi dung file: " + data.toString());
                });
            });
        });
    },
    clear: function() {
        fs.writeFile('./templates/logs/filelog.ejs', '', function(err) {
            if (err) {
                return console.error(err);
            }
        });
    }
}
module.exports = __functions;