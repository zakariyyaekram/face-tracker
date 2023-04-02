const scoreEl = document.getElementById('score');

let debugMode = false;
let mockMode = false;

console.log('FT Online!');

stopMyVideo();

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

registerVideoPlay(playMyVideo);

function playMyVideo(){
    console.log("Now playing webcam...");
    startFT();
    drawMyFaceDots();
}

function debugMyApp(){
  debugMode = !debugMode;
  if(!isVideoStarted()){
      console.log("no signal :(");
      mockMode = true;
      drawMyFaceDots();
  }
}

function drawMyFaceDots(){
    clearCanvas();
    let positions = [];
    let score = 0;
    if(mockMode){
      positions = mockFacePositions;
    }else{
      positions = getFTPositions();
      score = getFTScore();
    }
    scoreEl.innerText = Math.round(score);
    if(positions.length>0){
        for(var i=0;i<positions.length;i++){
            drawCircle(positions[i][0], positions[i][1]);
            if(debugMode){
                if(mockMode){
                  drawText(i,positions[i][0], positions[i][1]);                  
                }else{
                  drawText(i,positions[i][0], positions[i][1],'white');
                }
            }
        }
    }

    if(isVideoStarted() || mockMode){
        setTimeout(drawMyFaceDots, 100);
    }
}
