# Hack Day Live Video
A simple *hack* to try to get live video in to an HTML email.

<p align="center">
  <img src="https://raw.github.com/OrganicPanda/hack-day-live-video/hack-day.jpg" alt="Hack Day Logo" />
  <img src="https://raw.github.com/OrganicPanda/hack-day-live-video/last-min.gif" alt="Sample of produced GIF" />
</p>

We initially tried the never-ending-gif idea from https://github.com/jbochi/gifstreaming but even with the correct version of ffmpeg it never actually displayed anything in the browser. Although everything in the terminal/devtools/filesystem looked exactly as expected we only saw a blank page.

The solution was to buffer the input stream and create a new gif evety so often that represents the last minute from the stream. This works but provides a less than ideal experience. Also because of the *terrible* code it is very clunky and slow.

## Install
```
git clone git@github.com:OrganicPanda/hack-day-live-video.git
cd hack-day-live-video
mkdir input
```

## Run
You need 3 terminals:

### ffmpeg
Obtain an RTMP stream from somewhere (Software such as https://www.wowza.com can produce RTMP). Size and frame rate can be changed but make sure to sync these changes in to `watch.js`.
```
ffmpeg -re -i rtmp://example.com/some-stream -s 640x480 -r 10 -c:v gif -f image2 input/in%09d.gif
```

### Watcher
This process will watch for output from the above command, keep the directory clean and produce the `last-min.gif`.
```
node watch.js
```

### Server
A simple node webserver that serves `last-min.gif` on `http://0.0.0.0:8080/live`.
```
node server.js
```
