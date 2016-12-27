var http = require('http');
var fs = require('fs');

export function downloadRaspbianImage() {
  var file = fs.createWriteStream("images/raspbian-pibakery.jpg");
  var request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
    response.pipe(file);
  });
}

// https://github.com/davidferguson/pibakery-raspbian/releases/download/v0.2.0/raspbian-lite-pibakery.7z
