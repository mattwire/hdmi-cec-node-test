var express = require('express');
var router = express.Router();
var exec = require('child_process').exec, child;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Remote JS' });
});

router.get('/tv/1', function(req, res) {
    child = exec('echo "on 0" | cec-client -s',
		 function (error, stdout, stderr) {
		     console.log("Turned on TV successfully");
		     if (error !== null) {
			 console.log('exec error: ' + error);
		     }
		 });

    res.render('on', { title: 'Turned TV On' })
});

router.get('/tv/0', function(req, res) {
    child = exec('echo "standby 0" | cec-client -s',
                 function (error, stdout, stderr) {
		     console.log("stdout: " + stdout);
                     console.log("Turned off TV successfully");
                     if (error !== null) {
                         console.log('exec error: ' + error);
                     }
                 });

    res.render('off', { title: 'Turned TV Off' })
});

router.get('/status/tv', function(req, res) {
    var status;
    child = exec('echo "pow 0" | cec-client -s',
                 function (error, stdout, stderr) {
                     var n = stdout.indexOf("power status:");
		     status_temp = stdout.substring(n+13, n+28);
		     console.log(status_temp.indexOf(" "));
		     status = status_temp.substring(0, status_temp.indexOf("D")-1);
                     console.log("Status: " + status);
                     if (error !== null) {
                         console.log('exec error: ' + error);
                     }
		     res.render('status', {theStatus: status})
                 });
});

router.get('/status/amp', function(req, res) {
    var status;
    child = exec('echo "pow 4" | cec-client -s',
                 function (error, stdout, stderr) {
                     var n = stdout.indexOf("power status:");
		     status_temp = stdout.substring(n+13, n+28);
		     console.log(status_temp.indexOf(" "));
		     status = status_temp.substring(0, status_temp.indexOf("D")-1);
                     console.log("Status: " + status);
                     if (error !== null) {
                         console.log('exec error: ' + error);
                     }
		     res.render('status', {theStatus: status})
                 });
});

router.get('/amp/1', function(req, res) {
    child = exec('echo "on 4" | cec-client -s',
		 function (error, stdout, stderr) {
		     console.log("Turned on AMP successfully");
		     if (error !== null) {
			 console.log('exec error: ' + error);
		     }
		 });

    res.render('on', { title: 'Turned AMP On' })
});

router.get('/amp/0', function(req, res) {
    child = exec('echo "standby 4" | cec-client -s',
                 function (error, stdout, stderr) {
		     console.log("stdout: " + stdout);
                     console.log("Turned off Amp successfully");
                     if (error !== null) {
                         console.log('exec error: ' + error);
                     }
                 });

    res.render('off', { title: 'Turned Amp Off' })
});

router.get('/src/audio', function(req, res) {
    child = exec('echo "as" | cec-client -s && echo "on 0" | cec-client -s && echo "on 4" | cec-client -s',
		 function (error, stdout, stderr) {
		     console.log("Selected Audio Source");
		     if (error !== null) {
			 console.log('exec error: ' + error);
		     }
		 });

    res.render('on', { title: 'Selected Audio Src' })
});

router.get('/volup', function(req, res) {
    child = exec('echo "volup" | cec-client -s',
		 function (error, stdout, stderr) {
		     console.log("Turned up Volume");
		     if (error !== null) {
			 console.log('exec error: ' + error);
		     }
		 });

    res.render('on', { title: 'Turned Volume Up' })
});

router.get('/voldown', function(req, res) {
    child = exec('echo "voldown" | cec-client -s',
		 function (error, stdout, stderr) {
		     console.log("Turned down Volume");
		     if (error !== null) {
			 console.log('exec error: ' + error);
		     }
		 });

    res.render('on', { title: 'Turned Volume Down' })
});

router.get('/mute', function(req, res) {
    child = exec('echo "mute" | cec-client -s',
		 function (error, stdout, stderr) {
		     console.log("Muted Volume");
		     if (error !== null) {
			 console.log('exec error: ' + error);
		     }
		 });

    res.render('on', { title: 'Muted Volume' })
});

module.exports = router;
