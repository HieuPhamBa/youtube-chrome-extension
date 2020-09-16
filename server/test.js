var ytdl = require('youtube-dl')

var path = require('path')
var fs = require('fs')
var url = 'https://www.youtube.com/watch?v=fmIGnd98DX4'

var video = ytdl(
    'https://www.youtube.com/watch?v=RK1K2bCg4J8',
    // Optional arguments passed to youtube-dl.
    ['-f', '22']
)

var size = 0
video.on('info', function (info) {
    'use strict'
    size = info.size

    console.log('Got video info')
    var file = path.join(__dirname, info._filename)
    video.pipe(fs.createWriteStream(file))
})

var pos = 0
video.on('data', function data(chunk) {
    'use strict'
    pos += chunk.length

    // `size` should not be 0 here.
    if (size) {
        var percent = ((pos / size) * 100).toFixed(2)
        process.stdout.cursorTo(0)
        process.stdout.clearLine(1)
        process.stdout.write(percent + '%')
    }
})

video.on('end', function end() {
    'use strict'
    console.log('\nDone')
})