Objects = [];
video = "";
Status = "";

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(600, 360);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 600, 360);
    if (Status != "") {
        objectdetector.detect(video, gotResults);
        for (i = 0; i < Objects.length; i++) {
            document.getElementById("DTC").innerHTML = "Status: Objects Detected # " + Objects.length;
            fill("red");
            noFill();
            percent = floor(Objects[i].confidence * 100);
            stroke("red");
            text(Objects[i].label + " " + percent + "%", Objects[i].x , Objects[i].y);
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    Objects = results;
}

function start() {
    objectdetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("DTC").innerHTML =  "Status: Detecting";
}

function modelLoaded() {
    console.log("Model Loaded");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}