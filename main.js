status = "";
objects = [];


function setup() {
    canvas = createCanvas(350, 350);
    video = createCapture(VIDEO);
    video.size(350, 350);
    canvas.center();
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}


function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}


function draw() {
    image(video, 0, 0, 350, 350);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            noFill();
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);


            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + "has been Detected";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "has been Detected");
                synth.speak(utterThis);
            } else {
                document.getElementById("object_status").innerHTML = "Sorry!! " + object_name + "not Found ";
            }
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}