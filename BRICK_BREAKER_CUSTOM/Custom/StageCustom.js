import BallSettings from "./BallSettings.js";
import BrickSettings from "./BrickSettings.js";

window.onload = function(){
    const ballSettings = new BallSettings();
    const brickSettings = new BrickSettings(); 
    let stageFileName = "stage.txt";
    document.getElementById("save-stage").onclick = () => {
        let stageInfo = {
            creator:brickSettings.creator,
            stageName:brickSettings.stageName,
            difficulty:brickSettings.difficulty,
        }
        let brickInfo = {
            numRow:brickSettings.table.row,
            map:brickSettings.table.arr,
        }
        let ballInfo = {
            ballNumber:brickSettings.ballNumber, 
            ballStrokeImg: ballSettings.strokeImg, 
            ballFullImg: ballSettings.fullImg, 
            ballRadius: ballSettings.radius,
        }
        let stageHitEffectStrokeStyle;
        if (ballSettings.isStroked){
            if(ballSettings.isGradientStroked){
                stageHitEffectStrokeStyle = ballSettings.ball.getGradientStroke();
            }
            else{
                stageHitEffectStrokeStyle = ballSettings.strokeStyle;
            }
        }
        else{
            if (ballSettings.isGradientFilled){
                stageHitEffectStrokeStyle = ballSettings.ball.getGradientFill();
            }
            else{
                stageHitEffectStrokeStyle = ballSettings.fillStyle;
            }
        }


        let stageHitEffectInfo = {
            stageHitEffectStrokeStyle : stageHitEffectStrokeStyle,
            stageHitEffectShadowColor : (ballSettings.isShadowing)? ballSettings.shadowColor : null,
        }
        let result = {stageInfo:stageInfo, brickInfo:brickInfo, 
                    ballInfo:ballInfo, stageHitEffectInfo: stageHitEffectInfo};
        let data = JSON.stringify(result);
        const textToBLOB = new Blob([data], {type: 'text/plain;charset=utf-8'});
        let newLink = document.createElement("a");
        newLink.download = stageFileName;
    
        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
    
        else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }
    
        newLink.click(); 
    }

    // document.getElementById("load-file").onclick = () => {
    //     let input = document.createElement("input");
    //     input.type = "file";
    //     input.accept = "text/plain"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    //     input.onchange = function (event) {
    //         processFile(event.target.files[0]);
    //     };
    //     input.click();
    // }


    // function processFile(file){
    //     let reader = new FileReader();
    //     reader.onload = function () {
    //         output.innerText = reader.result;
    //     };
    //     reader.readAsText(file, /* optional */ "euc-kr");
    // }

    // function jsonToHTML(mapObj){
    //     let map = mapObj.brickInfo.map;
    //     for (let i = 0; i < map.length; i++){
    //         for (let j = 0; j < map[i].length; j++){
    //             if (map[i][j] != null || map[i][j] != undefined){
    //                 let rowId = "row" + i;
    //                 let colId = "col" + j;
    //                 let target =  document.querySelector("table").querySelector("#rowId").querySelector("#colId");
    //                 target.innerHTML = " ";
    //                 let image = document.createElement("image");
    //                 image.src = map[i][j].
    //             }
    //         }
    //     }
    //     ballSettings.
    // }
}