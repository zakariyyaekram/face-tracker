console.log('FT Online!');

function startMyVideo() {
    hideElement("startVideo");
    showElement("stopVideo");
    showElement("debug");
    startVideo();
}

function stopMyVideo() {
    showElement("startVideo");
    hideElement("stopVideo");
    hideElement("debug");
    stopVideo();
}

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
    if(!video.srcObject){
        console.log("no signal!");
        mockMode = true;
        drawFaceDots();
    }
});

function drawFaceDots(){
    clearCanvas();
    let positions = [];
    if(mockMode){
        positions = mockFacePositions;
    }else{
        positions = faceTracker.getCurrentPosition();
    }
    
    if(positions.length>0){
        for(var i=0;i<positions.length;i++){
            context.fillStyle = "red";
            context.fillRect(positions[i][0], positions[i][1], 2, 2);
            if(debugMode){
                context.fillStyle = "blue";
                context.font = "12px Arial";
                context.fillText(i, positions[i][0], positions[i][1]);
            }
        }
    }

    if(video.srcObject || mockMode){
        setTimeout(drawFaceDots, 100);
    }
}
