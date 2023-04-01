/*
 * @author Mohammed Meah
 * Helper utility to show face tracking 
*/
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const debugCb = document.getElementById('debugCb');
const context = canvas.getContext("2d");
let initOnce = false;
let debugMode = false;
let mockMode = false;
let faceTracker; // Face Tracking

/*
 * Starts the video
*/
function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

/*
 * Stops the video
*/
function stopVideo() {
    if(video.srcObject){
        const tracks = video.srcObject.getTracks();
        if(tracks){
            tracks.forEach(track => track.stop());
        }
        video.srcObject = null;
        faceTracker.stop();
    }
    clearCanvasDelay200();
}
stopVideo();

/*
 * initial setup
*/
function initSetup(){
    initOnce = true;
    faceTracker = new clm.tracker();
    faceTracker.init();
}


function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function clearCanvasDelay200(){
    setTimeout(clearCanvas, 200);
}


/*
 * Shows an element on the page
 * @param elementId - html id
*/
function showElement(elementId){
    var element = document.getElementById(elementId);
    element.style.display = "block";
}


/*
 * Hides an element on the page
 * @param elementId - html id
*/
function hideElement(elementId){
    var element = document.getElementById(elementId);
    element.style.display = "none";
}