console.log('FT Online!');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const debugCb = document.getElementById('debugCb');
const context = canvas.getContext("2d");
let initOnce = false;
let debugMode = false;
let faceTracker; // Face Tracking
const spiderman_image = new Image();
spiderman_image.src = 'img/spiderman-mask.png';

function startVideo() {
    hideElement("startVideo");
    showElement("stopVideo");
    showElement("debug");
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
    hideElement("debug");
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

video.addEventListener('play', () => {
    console.log(new Date(), "Now playing webcam...");
    if(!initOnce){
        initSetup();
    }
    faceTracker.start(video);
    drawFaceDots();
});

debugCb.addEventListener("change", () => {
    console.log(new Date(), "Debug Clicked");
    debugMode = !debugMode;
});

function initSetup(){
    initOnce = true;
    faceTracker = new clm.tracker();
    faceTracker.init();
}

function drawFaceDots(){
    clearCanvas();
    const positions = faceTracker.getCurrentPosition();
    if(positions.length>0){
        for(var i=0;i<positions.length;i++){
            context.fillStyle = "red";
            context.fillRect(positions[i][0], positions[i][1], 2, 2);
            if(debugMode){
                context.fillStyle = "white";
                context.font = "12px Arial";
                context.fillText(i, positions[i][0], positions[i][1]);
            }
        }
        // TODO: get spiderman mask to scale on the face
        // context.drawImage(spiderman_image, 0, 0, 100,100, positions[27][0], positions[27][1],100,100);
    }

    if(video.srcObject){
        setTimeout(drawFaceDots, 100);
    }
}

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function clearCanvasDelay200(){
    setTimeout(clearCanvas, 200);
}

function showElement(elementId){
    var element = document.getElementById(elementId);
    element.style.display = "block";
}

function hideElement(elementId){
    var element = document.getElementById(elementId);
    element.style.display = "none";
}