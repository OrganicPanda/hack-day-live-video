var fs = require('fs')
  , child_process = require('child_process')
  , busy = false;

fs.watch('input', function(event, filename) {
  // Async is for chumps ...
  if (busy) return;
  busy = true;
  
  console.log('Snapshot!');

  // Delete everything older than a minute
  child_process.execSync('find ./input/* -type f -mmin +1 -exec rm {} \\;');

  // Create a minute-long gif from the remaining frames
  child_process.execSync('convert -delay 10 -colors 128 -loop 0 input/in*.gif last-min.gif');

  busy = false;
});
