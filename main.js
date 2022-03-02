function setup(){
    canvas=createCanvas(300,300)
    canvas.center();
    background("white");
    canvas.mouseReleased(classifycanvas);
    synth=window.speechSynthesis;
    classifier=ml5.imageClassifier('DoodleNet');
}
function clear_canvas(){
    background("white")
}
function draw(){
strokeWeight(13);
stroke('black');
if(mouseIsPressed){
line(pmouseX,pmouseY,mouseX,mouseY);
}
}
function classifycanvas(){
classifier.classify(canvas,gotResult);
}
function gotResult(error,results){
if(error){
console.error(error);
}
else{
    console.log(results);
    document.getElementById("drawings").innerHTML="drawing"+results[0].label;
    document.getElementById("confidence").innerHTML="confidence"+(results[0].confidence*100).toFixed(2);
    utterthis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterthis);
}
}