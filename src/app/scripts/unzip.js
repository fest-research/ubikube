function extract7z (archive, outputdir, callback) {
  console.log("asd");
  if (process.platform == 'darwin') {
    var binary = '"' + path.normalize(__dirname + '/../7z') + '"'
  }
  else if (process.platform == 'win32') {
    var binary = '"' + path.normalize(__dirname + '/../7z.exe') + '"'
  }
  else if (process.platform == 'linux') {
    var binary = '7za'
  }
  console.log("asd");

  exec(binary + ' x -o"' + outputdir + '" "' + archive + '"', function (error, stdout, stderr) {
    callback(error)
  })
}
