console.log('FT Online');
const video = document.getElementById('video')

function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = stream,
      err => console.error(err)
    )
}

startVideo();