

window.onload = function(){
    window.canvas = document.getElementById("canvas")
    let ctx = window.canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 700;

    // function animate(){
    //     ctx.beginPath();
    //     ctx.fillStyle="rgb(0,0,0)";
    //     ctx.fillRect(0,0,canvas.width, canvas.height);
    //     ctx.fill();
    //     ctx.lineWidth = 3;
    //     ctx.font="80x Orbitron";
    //     ctx.font="80px Orbitron";
    //     ctx.strokeStyle="rgba(255,0,214,0.9)";
    //     // ctx.shadowColor = "rgba(255,0,0,0.7)";
    //     ctx.shadowBlur = 0;
    //     ctx.shadowOffsetX = 0;
    //     ctx.shadowOffsetY = 0;
    //     ctx.textAlign="center";
    //     ctx.strokeText("BLOCK BREAKER",515,355);
    //     ctx.fillStyle="red";
    //     ctx.fillText("BLOCK BREAKER", 510, 360);
        
    //     ctx.closePath();
    //     setTimeout(animate.bind(this), 17);
    // }
    
    // animate();

    let  dashLen = 300, dashOffset = dashLen, speed = 50,
        txt = "BLOCK BREAKER", x = 30, i = 0;

    ctx.font = "70px Orbitron"; 
    ctx.lineWidth = 5; ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(255,0,214,0.9)";
    ctx.lineWidth = 2;
    let y = 0;
    
    (function loop() {
        
        ctx.fillStyle="rgb(0,0,0)";
        for (let j = 0; j <=i; j++){
            ctx.fillRect(0,0,canvas.width, canvas.height);
            if (j != i){
                y += ctx.measureText(txt[j]).width;
                ctx.strokeText(txt[j], y, 90); 
            }
            else{
                ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
                dashOffset -= speed;                                         // reduce dash length
                ctx.save();
                ctx.shadowBlur = 12;
                ctx.shadowColor = "rgba(255,0,214,0.9)";
                ctx.shadowOffsetX = 5;
                ctx.shadowOffsetY = 5;
                ctx.strokeText(txt[i], x, 90);                               // stroke letter
                ctx.restore();
            }
        }
        
    if (dashOffset > 0) requestAnimationFrame(loop);             // animate
    else {
        // ctx.fillText(txt[i], x, 90 + 2);                               // fill final letter
        dashOffset = dashLen;                                      // prep next char
        x += ctx.measureText(txt[i++]).width;
        if (i < txt.length) requestAnimationFrame(loop);
        else animate();
    }
    })();

    let count = 0;
    function animate(){
        ctx.globalAlpha = count * 0.02
        ctx.fillStyle="rgba(255,0,0,0.2)";
        ctx.strokeStyle="rgba(255,0,214,0.9)";
        ctx.strokeText(txt,30,90);
        ctx.fillText(txt,30,94);
        if (count <= 50)
            count++;
        setTimeout(animate,17);
    };
}
