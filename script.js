var modes = ["yoshi1.png","yoshi2.png","yoshi3.png"];
var setVolume = 1;
var opacity = 1;
var slimecoin = 0;
var currentProgress = -1;
var power = 1;
var activeButtons = ["B1"];
class viewImage {
    constructor(src, width, height){
      this.img = document.createElement("IMG");
      this.img.setAttribute("src", src);
      this.img.setAttribute("width", String(width));
      this.img.setAttribute("height", String(height));
    }
  }
var mode3 = new viewImage(modes[2], 1546, 1130);

//var sound = new Audio("boom.mp3");
function setupCanvas(){
    setInterval(drawBig, 20);
    setInterval(shadeOutButtons, 200);
    console.log("A");
    canvas = document.getElementById("canvas");
    canvas.width = 1546;
    canvas.height = 1130;
    canvas.addEventListener("mousedown", function(event){
        var canvas = document.getElementById("canvas");
        var rect = canvas.getBoundingClientRect();
        var x = (event.pageX - rect.left -window.scrollX);
        var y = (event.pageY - rect.top -window.scrollY);
        console.log(x,y);

        if(352 < x && x < 1245 && 184 < y && y < 1079){
            opacity = 0.9;
            canvas.style.backgroundImage = "url("+modes[1]+")";
            let sound = new Audio("boom.mp3")
            sound.volume = setVolume;
            sound.play();
            slimecoin += power;
            document.getElementById("big").innerHTML = "Thrash the bank! SC: " + slimecoin.toString();
        }
        
    });
    canvas.addEventListener("mouseup", function(event){
        var canvas = document.getElementById("canvas");
        canvas.style.backgroundImage = "url("+modes[0]+")";
    });
}

function senseClick(){
    console.log("B");
    canvas = document.getElementById("canvas");
}
function shadeOutButtons(){
    for(var i = 0; i < activeButtons.length; i++){
        console.log(i);
        if(slimecoin < 10**(i+1)){
            document.getElementById(activeButtons[i]).style.backgroundColor = "#EEEEEE";
        }
        else{
            document.getElementById(activeButtons[i]).style.backgroundColor = "#22EE44";
        }
    }
}
function drawBig(){
    //console.log("A");
    if(opacity < 1 && opacity > 0){
        
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.globalAlpha = opacity;
        ctx.drawImage(mode3.img, 0, 0);
        opacity -=0.05;
    }
    else if(opacity < 0){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        opacity = 1;
        ctx.globalAlpha = opacity;
        ctx.clearRect(0,0,canvas.width, canvas.height);
    }
}

function buy(ver){
    let value = 9999999999999;
    if(ver == "fuck"){
        value = 1;
    }
    else if(ver == "killer"){
        value = 10;
    }
    else if(ver == "alt"){
        value = 100;
    }
    else if(ver == "consort"){
        value = 1000;
    }
    else if(ver == "topkiller"){
        value = 10000;
    }
    var A = false;
    if(slimecoin > (value*10)-1){
        progressButtons();
        power += value;
        slimecoin -= value*10;
        if(ver == "topkiller"){
            A = true;
        }
    }
    document.getElementById("big").innerHTML = "Thrash the bank! SC: " + slimecoin.toString();
    if(A == true){
        document.getElementById("big").innerHTML = "You won. No more SC left in the bank :( any further and you're driving them into obscene debt.";
        modes[0] = "yoshi4.png";
        document.getElementById("canvas").style.backgroundImage = "url("+modes[0]+")";
    }
}

function progressButtons(){
    if(slimecoin > 9 && currentProgress < 9){
        document.getElementById("button2").innerHTML = `<button id="B2" onClick="buy('killer');"><img id="killer" src="killer.png"></img><br>!kill</button>`;
        document.getElementById("killerDiv").innerHTML = "Killers ganked.<br>Pitch into the war effort and perhaps Yoshi will consider giving you <i>some</i> of your slimecoin back.";
        currentProgress = 9
        activeButtons.push("B2");
        return
    }
    if(slimecoin > 99 && currentProgress < 99){
        document.getElementById("button3").innerHTML = `<button id="B3" onClick="buy('alt');"><img id="alt" src="alt.png"></img><br>!progress</button>`;
        document.getElementById("altDiv").innerHTML = "Alts capping.<br>You've hit the limit of what 1 account can accomplish. With several accounts itll be easier to withdraw as much slimecoin as you need.";
        currentProgress = 99
        activeButtons.push("B3");
        return
    }
    if(slimecoin > 999 && currentProgress < 999){
        document.getElementById("button4").innerHTML = `<button id="B4" onClick="buy('consort');"><img id="consort" src="consort.png"></img><br>!THRASH!THRASH!THRASH!THRASH</button>`;
        document.getElementById("consortDiv").innerHTML = "Consort titles.<br>The clout makes them more amicable.";
        currentProgress = 999
        activeButtons.push("B4");
        return
    }
    if(slimecoin > 9999 && currentProgress < 9999){
        document.getElementById("button5").innerHTML = `<button id="B5" onClick="buy('topkiller');"><img id="topkiller" src="topkiller.png"></img><br>!dab</button>`;
        document.getElementById("topkillerDiv").innerHTML = "Top Killer spots taken.<br>";
        currentProgress = 9999
        activeButtons.push("B5");
        return
    }
}