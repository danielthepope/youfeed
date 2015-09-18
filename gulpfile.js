var gulp = require('gulp'),
  express = require('express'),
  serverport = 3000;

//We only configure the server here and start it only when running the watch task
var server = express();
server.use(express.static('.'));

gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  server.listen(serverport);
  console.log('Listening on ' + serverport);
});

gulp.task('default', ['serve']);
