let express = require('express');
var ytdl = require('youtube-dl')

let app = express();

app.listen(process.env.PORT || 4000, function () {
	console.log("listening on " + process.env.PORT);
});


app.get('/api/download', function (req, res) {
	const { url, format } = req.query;
	const video = ytdl(url,
		['-f', 'best'])
	ytdl.getInfo(url, function (err, info) {
		'use strict'
		console.log({ info })
		let formats = info.formats
		console.log({ formats })

	})
	// Will be called when the download starts.
	video.on('info', function (info) {
		console.log('Download started')
		console.log('filename: ' + info._filename)
		console.log('size: ' + info.size)
	})

	video.pipe(res)
})
