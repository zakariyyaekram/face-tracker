const scoreEl = document.getElementById('score');

let debugMode = false;
let mockMode = false;

console.log('FT Online!');

// Called to reset all the variables and set up the page
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
    mockMode = false;
}

registerVideoPlay(playMyVideo);

function playMyVideo(){
    console.log("Now playing webcam...");
    startFT();
    drawMyFace();
}

function debugMyApp(){
  debugMode = !debugMode;
  if(!isVideoStarted()){
      console.log("no signal :(");
      mockMode = true;
      console.log("Starting mock mode...");
      drawMyFace();
  }
  if(!debugMode){
    mockMode = false;
  }
}

function drawMyFace(){
    clearCanvas();
    let positions = [];
    if(mockMode){
      positions = mockFacePositions;
    }else{
      positions = getFTPositions();
    }
    setMyFaceScore();
    
    if(positions.length>0){
      drawMyFaceLine(positions);
      drawMyFaceDots(positions);

    }

    if(isVideoStarted() || mockMode){
        setTimeout(drawMyFace, 100);
    }
}

function setMyFaceScore(){
  const score = getFTScore();
  scoreEl.innerText = Math.round(score);
}

/**
 * Draws the face dots
 * @param positions - array of face positions
 */
function drawMyFaceDots(positions){
  for(let i=0;i<positions.length;i++){
    const posX = positions[i][0];
    const posY = positions[i][1];
    drawCircle(posX, posY);
    if(debugMode){
          if(mockMode){
            drawText(i,posX, posY);                  
          }else{
            drawText(i,posX, posY,'white');
          }
      }
  }
}

/**
 * Draws the face line
 * @param positions - array of face positions
 */
function drawMyFaceLine(positions){
  const dots = getFTModelDotConnections()
  while(dots.length>0){
    const dotPosition = dots.pop();
    const dotStart = dotPosition[0];
    const dotEnd = dotPosition[1];
    const dotStartX = positions[dotStart][0];
    const dotStartY = positions[dotStart][1];
    const dotEndX = positions[dotEnd][0];
    const dotEndY = positions[dotEnd][1];
    drawLine(dotStartX, dotStartY, dotEndX, dotEndY);
  }
}