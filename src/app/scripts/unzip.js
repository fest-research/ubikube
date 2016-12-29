export function extract7z (archive, outputdir, callback) {

var path = require('path')
var exec = require('child_process').exec
  if (process.platform == 'darwin') {
    var binary = '"' + path.normalize(__dirname + '/../7z') + '"'
  }
  else if (process.platform == 'win32') {
    var binary = '"' + path.normalize(__dirname + '/../7z.exe') + '"'
  }
  else if (process.platform == 'linux') {
    var binary = '7za'
  }
  exec(binary + ' x -o"' + outputdir + '" "' + archive + '"', function (error, stdout, stderr) {
    callback(error)
  })
}
