console.log('FT Online');
const video = document.getElementById('video');

function startVideo() {
    hideElement("startVideo");
    showElement("stopVideo");
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}
// startVideo();

function stopVideo() {
    showElement("startVideo");
    hideElement("stopVideo");
    if(video.srcObject){
        const tracks = video.srcObject.getTracks();
        if(tracks){
            tracks.forEach(track => track.stop());
        }
        video.srcObject = null;
    }
}
stopVideo();


function showElement(elementId){
    var element = document.getElementById(elementId);
    element.style.display = "block";
}

function hideElement(elementId){
    var element = document.getElementById(elementId);
    element.style.display = "none";
}
